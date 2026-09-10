import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export interface AnalyticsExportOptions {
  format: "pdf" | "png";
  aspirantName: string;
  targetExam: string;
  includeHeatmap: boolean;
  includeProgress: boolean;
  includeMocks: boolean;
  includeGapAnalysis: boolean;
  includeRankBenchmarks: boolean;
}

export interface ExportResult {
  success: boolean;
  message: string;
  filename?: string;
}

/**
 * TailwindCSS v4 uses oklch() for all colors, but html2canvas v1.4.x
 * cannot parse oklch(), oklab(), lch(), or lab() color functions.
 *
 * This function reads the browser-resolved computed color values (which are
 * always plain rgb/rgba) and applies them as inline styles on every element
 * before html2canvas runs. Returns a cleanup function to restore original styles.
 */
function inlineResolvedColors(root: HTMLElement): () => void {
  const COLOR_PROPS = [
    'color',
    'background-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline-color',
    'text-decoration-color',
    'fill',
    'stroke',
  ] as const;

  // Collect all elements including root
  const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];
  const restorers: Array<() => void> = [];

  elements.forEach((el) => {
    if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
    const computed = window.getComputedStyle(el as HTMLElement);
    const saved: Array<{ prop: string; prev: string }> = [];

    COLOR_PROPS.forEach((prop) => {
      // getComputedStyle always resolves oklch → rgb(...)
      const resolved = computed.getPropertyValue(prop);
      if (!resolved || resolved === 'none' || resolved === 'transparent') return;

      // Only inline if it's a valid resolved rgb/rgba value
      // (to avoid inlining "inherit" or empty strings)
      if (resolved.startsWith('rgb') || resolved.startsWith('#')) {
        saved.push({ prop, prev: (el as HTMLElement).style.getPropertyValue(prop) });
        (el as HTMLElement).style.setProperty(prop, resolved, 'important');
      }
    });

    if (saved.length > 0) {
      restorers.push(() => {
        saved.forEach(({ prop, prev }) => {
          if (prev) {
            (el as HTMLElement).style.setProperty(prop, prev);
          } else {
            (el as HTMLElement).style.removeProperty(prop);
          }
        });
      });
    }
  });

  return () => restorers.forEach((r) => r());
}

/**
 * Detaches element from its current DOM position (which may be inside a
 * modal with overflow:hidden that clips html2canvas rendering), appends it
 * to document.body off-screen, captures it, then moves it back.
 */
async function captureElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const originalParent = element.parentElement!;
  const originalNextSibling = element.nextSibling;
  const prevStyle = element.getAttribute('style') || '';

  // Move element to document.body to bypass modal overflow clipping
  const wrapper = document.createElement('div');
  wrapper.style.cssText =
    'position:fixed;top:-99999px;left:0;z-index:-9999;' +
    'width:1200px;overflow:visible;background:#ffffff;';
  wrapper.appendChild(element);
  document.body.appendChild(wrapper);

  element.style.cssText =
    'display:block!important;visibility:visible!important;' +
    'opacity:1!important;clip:auto!important;width:1000px;background:#ffffff;';

  // Fix oklch → rgb for html2canvas compatibility
  const restoreColors = inlineResolvedColors(element);

  // Wait for layout recalc before capture
  await new Promise((r) => setTimeout(r, 180));

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      // Ignore elements that are absolutely off screen (prevents rare crashes)
      ignoreElements: (el) => {
        const s = window.getComputedStyle(el);
        return s.display === 'none' || s.visibility === 'hidden';
      },
    });
  } finally {
    // Always restore, even on error
    restoreColors();
    element.setAttribute('style', prevStyle);
    if (originalNextSibling) {
      originalParent.insertBefore(element, originalNextSibling);
    } else {
      originalParent.appendChild(element);
    }
    document.body.removeChild(wrapper);
  }

  return canvas;
}

export async function exportAnalyticsDocument(
  elementId: string,
  options: AnalyticsExportOptions,
  onProgress?: (msg: string) => void
): Promise<ExportResult> {
  const element = document.getElementById(elementId);
  if (!element) {
    const msg = 'Export failed: Report canvas not found. Please try reopening the dialog.';
    console.error(`[Analytics Export] #${elementId} not found in DOM.`);
    return { success: false, message: msg };
  }

  try {
    if (onProgress) onProgress('Resolving colors & rendering report canvas...');

    const canvas = await captureElementToCanvas(element);

    // Sanity check for blank capture
    if (canvas.width < 100 || canvas.height < 100) {
      return {
        success: false,
        message:
          'Export failed: Blank canvas captured (width < 100px). Try enabling Preview first, then export.',
      };
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `UPSC_Analytics_${timestamp}`;

    // ─────────────────── PNG ───────────────────
    if (options.format === 'png') {
      if (onProgress) onProgress('Generating high-resolution PNG...');
      const imageUri = canvas.toDataURL('image/png');

      if (Capacitor.isNativePlatform()) {
        if (onProgress) onProgress('Saving image to device...');
        const base64Data = imageUri.split(',')[1];

        const savedFile = await Filesystem.writeFile({
          path: `${filename}.png`,
          data: base64Data,
          directory: Directory.Cache,
          recursive: true,
        });

        try {
          await Filesystem.writeFile({
            path: `UPSC Hub/Reports/${filename}.png`,
            data: base64Data,
            directory: Directory.Documents,
            recursive: true,
          });
        } catch {
          // Non-fatal
        }

        await Share.share({
          title: 'UPSC Analytics Report',
          text: 'My UPSC CSE Analytics Performance Report',
          url: savedFile.uri,
          dialogTitle: 'Save Image to Gallery or Share',
        });

        return {
          success: true,
          message: '✅ Report image ready! Use the share sheet to save to Gallery.',
          filename: `${filename}.png`,
        };
      } else {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageUri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return {
          success: true,
          message: `✅ PNG image downloaded: ${filename}.png`,
          filename: `${filename}.png`,
        };
      }
    }

    // ─────────────────── PDF ───────────────────
    if (options.format === 'pdf') {
      if (onProgress) onProgress('Compiling multi-page PDF...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      if (Capacitor.isNativePlatform()) {
        if (onProgress) onProgress('Saving PDF to device...');
        const pdfBase64 = pdf.output('datauristring').split(',')[1];

        const savedFile = await Filesystem.writeFile({
          path: `${filename}.pdf`,
          data: pdfBase64,
          directory: Directory.Cache,
          recursive: true,
        });

        try {
          await Filesystem.writeFile({
            path: `UPSC Hub/Reports/${filename}.pdf`,
            data: pdfBase64,
            directory: Directory.Documents,
            recursive: true,
          });
        } catch {
          // Non-fatal
        }

        await Share.share({
          title: 'UPSC Analytics Report PDF',
          text: 'My UPSC CSE Analytics Performance Report',
          url: savedFile.uri,
          dialogTitle: 'Save PDF or Share',
        });

        return {
          success: true,
          message: '✅ PDF ready! Use the share sheet to save or send.',
          filename: `${filename}.pdf`,
        };
      } else {
        pdf.save(`${filename}.pdf`);
        return {
          success: true,
          message: `✅ PDF downloaded: ${filename}.pdf`,
          filename: `${filename}.pdf`,
        };
      }
    }

    return { success: false, message: 'Unknown export format selected.' };
  } catch (error: any) {
    console.error('[Analytics Export] Failed:', error);
    const reason: string =
      typeof error?.message === 'string' ? error.message : String(error);
    return {
      success: false,
      message: `Export failed: ${reason}`,
    };
  }
}
