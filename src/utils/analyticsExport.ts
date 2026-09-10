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
  /** Syllabus mastery % (0-100) — used in share text */
  syllabusProgress: number;
  /** Total study hours logged — used in share text */
  totalHoursLogged: string;
}

export interface ExportResult {
  success: boolean;
  message: string;
  filename?: string;
}

/**
 * TailwindCSS v4 generates all colors using modern CSS color functions:
 *   oklch(), oklab(), lch(), lab()
 *
 * html2canvas v1.4.x CANNOT parse these color functions. When it encounters
 * them in a <style> element it throws an error and stops processing that
 * stylesheet entirely — leaving the captured element completely unstyled
 * (no backgrounds, borders, layout colors — just plain black text).
 *
 * This function:
 *   1. Scans all <style> elements in the live document for these color values
 *   2. Resolves each one to plain rgb() using the browser's own color engine
 *      (via a hidden probe element + getComputedStyle)
 *   3. Patches the corresponding <style> elements in the CLONED document
 *      (the one html2canvas renders from) so all CSS rules parse correctly
 *
 * Must be called inside html2canvas's onclone() callback.
 */
function patchStylesheetsForHtmlCanvas(clonedDoc: Document): void {
  // Match oklch(...), oklab(...), lch(...), lab(...) — the unsupported ones
  const MODERN_COLOR_RE = /oklch\([^)]+\)|oklab\([^)]+\)|lch\([^)]+\)|lab\([^)]+\)/g;

  // ── Step 1: Collect all unique modern color values from live document ──
  const uniqueColors = new Set<string>();
  for (const styleEl of Array.from(document.querySelectorAll('style'))) {
    const text = styleEl.textContent || '';
    for (const match of text.matchAll(new RegExp(MODERN_COLOR_RE.source, 'g'))) {
      uniqueColors.add(match[0]);
    }
  }

  if (uniqueColors.size === 0) return;

  // ── Step 2: Resolve each color value to rgb() using a hidden probe ──
  // The browser resolves oklch → rgb natively; we read that back.
  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;top:-9999px;left:-9999px;';
  document.body.appendChild(probe);

  const colorMap = new Map<string, string>();
  for (const colorVal of uniqueColors) {
    try {
      probe.style.color = colorVal;
      const resolved = window.getComputedStyle(probe).color;
      // resolved is always "rgb(...)" or "rgba(...)" from the browser
      colorMap.set(colorVal, resolved && resolved !== '' ? resolved : 'rgb(0,0,0)');
    } catch {
      colorMap.set(colorVal, 'rgb(0,0,0)');
    }
  }
  document.body.removeChild(probe);

  // ── Step 3: Replace in cloned document's <style> elements ──
  for (const styleEl of Array.from(clonedDoc.querySelectorAll('style'))) {
    if (!styleEl.textContent) continue;
    styleEl.textContent = styleEl.textContent.replace(
      new RegExp(MODERN_COLOR_RE.source, 'g'),
      (match) => colorMap.get(match) ?? 'rgb(0,0,0)'
    );
  }
}

/**
 * Moves the target element from its current position (which may be inside
 * a modal with overflow:hidden or sr-only that clips html2canvas) to a
 * fixed off-screen position on document.body, captures it, then restores it.
 *
 * This is necessary because:
 *  - sr-only CSS makes the element 1px × 1px → html2canvas captures 1px
 *  - Modal overflow:auto clips the rendered canvas
 */
async function captureElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const originalParent = element.parentElement!;
  const originalNextSibling = element.nextSibling;
  const prevInlineStyle = element.getAttribute('style') || '';

  // Create off-screen wrapper and move element there
  const offScreenWrapper = document.createElement('div');
  offScreenWrapper.style.cssText =
    'position:fixed;top:-99999px;left:0;z-index:-9999;' +
    'width:1200px;overflow:visible;background:#ffffff;';
  offScreenWrapper.appendChild(element);
  document.body.appendChild(offScreenWrapper);

  // Force element to be fully visible and sized correctly
  element.style.cssText =
    'display:block!important;visibility:visible!important;opacity:1!important;' +
    'clip:auto!important;width:1000px;background:#ffffff;';

  // Allow browser to calculate layout before capture
  await new Promise((r) => setTimeout(r, 200));

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        // Fix oklch/oklab/lch/lab → rgb in all stylesheets of the cloned doc
        // This is what makes all TailwindCSS v4 styles render correctly
        patchStylesheetsForHtmlCanvas(clonedDoc);
      },
    });
  } finally {
    // Always restore element to its original DOM position
    element.setAttribute('style', prevInlineStyle);
    if (originalNextSibling) {
      originalParent.insertBefore(element, originalNextSibling);
    } else {
      originalParent.appendChild(element);
    }
    document.body.removeChild(offScreenWrapper);
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
    const msg = 'Export failed: Report canvas not found. Try reopening the export dialog.';
    console.error(`[Analytics Export] #${elementId} not found in DOM.`);
    return { success: false, message: msg };
  }

  try {
    if (onProgress) onProgress('Rendering styled report canvas...');

    const canvas = await captureElementToCanvas(element);

    if (canvas.width < 100 || canvas.height < 100) {
      return {
        success: false,
        message:
          'Export failed: Blank canvas captured. Try enabling Preview first, then export.',
      };
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `UPSC_Analytics_${timestamp}`;

    // Build dynamic share text
    const shareDate = new Date().toLocaleDateString('en-IN', { dateStyle: 'long' });
    const shareText =
      `📊 ${options.targetExam} | Performance Blueprint\n\n` +
      `👤 Candidate: ${options.aspirantName}\n` +
      `📅 Date: ${shareDate}\n` +
      `📚 Syllabus Mastery: ${options.syllabusProgress}%\n` +
      `⏱️ Study Hours Logged: ${options.totalHoursLogged} hrs\n\n` +
      `Generated by UPSC CSE Master Hub 🎯`;

    // ────────────────── PNG ──────────────────
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
          /* non-fatal */
        }

        await Share.share({
          title: 'UPSC Analytics Report',
          text: shareText,
          url: savedFile.uri,
          dialogTitle: 'Save to Gallery or Share',
        });

        return {
          success: true,
          message: '✅ Report image ready! Save to Gallery using the share sheet.',
          filename: `${filename}.png`,
        };
      }

      // Web browser direct download
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = imageUri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return {
        success: true,
        message: `✅ PNG downloaded: ${filename}.png`,
        filename: `${filename}.png`,
      };
    }

    // ────────────────── PDF ──────────────────
    if (options.format === 'pdf') {
      if (onProgress) onProgress('Compiling multi-page PDF...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const imgWidth = 210; // A4 width in mm
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
          /* non-fatal */
        }

        await Share.share({
          title: 'UPSC Analytics Report PDF',
          text: shareText,
          url: savedFile.uri,
          dialogTitle: 'Save PDF or Share',
        });

        return {
          success: true,
          message: '✅ PDF ready! Save or share using the sheet below.',
          filename: `${filename}.pdf`,
        };
      }

      pdf.save(`${filename}.pdf`);
      return {
        success: true,
        message: `✅ PDF downloaded: ${filename}.pdf`,
        filename: `${filename}.pdf`,
      };
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
