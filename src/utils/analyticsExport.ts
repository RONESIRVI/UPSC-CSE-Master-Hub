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

/** Result returned by exportAnalyticsDocument */
export interface ExportResult {
  success: boolean;
  /** Human-readable message for toast (success OR error reason) */
  message: string;
  /** Filename that was saved (only on success) */
  filename?: string;
}

/**
 * Detaches the element from its current position in the DOM,
 * appends it directly to document.body (off-screen via fixed position),
 * captures it with html2canvas, then moves it back.
 *
 * This is the only reliable way to capture elements that are inside
 * overflow:hidden / overflow:auto scrollable containers (like modals).
 */
async function captureElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const originalParent = element.parentElement!;
  const originalNextSibling = element.nextSibling;

  // Create a temporary off-screen wrapper
  const wrapper = document.createElement('div');
  wrapper.style.cssText =
    'position:fixed;top:-99999px;left:0;z-index:-9999;width:1200px;background:#fff;overflow:visible;';

  // Move element into the wrapper on document.body
  wrapper.appendChild(element);
  document.body.appendChild(wrapper);

  // Force element styles to be fully visible
  const prevStyle = element.getAttribute('style') || '';
  element.style.cssText =
    'display:block!important;visibility:visible!important;opacity:1!important;' +
    'clip:auto!important;width:1000px;background:#fff;';

  // Wait for layout/paint
  await new Promise((r) => setTimeout(r, 150));

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
    });
  } finally {
    // Always restore element to its original position
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
    console.error(`[Analytics Export] Element #${elementId} not found in DOM.`);
    return { success: false, message: msg };
  }

  try {
    if (onProgress) onProgress('Rendering report canvas...');

    const canvas = await captureElementToCanvas(element);

    // Sanity check: blank canvas guard (width < 100 means capture failed)
    if (canvas.width < 100 || canvas.height < 100) {
      return {
        success: false,
        message: 'Export failed: Report rendered as blank. Please try enabling Preview first, then export.',
      };
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `UPSC_Analytics_${timestamp}`;

    // ─────────────── PNG ───────────────
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

        // Also save persistent copy in Documents
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
      } else {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageUri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      return {
        success: true,
        message: Capacitor.isNativePlatform()
          ? `✅ Report image ready! Use the share sheet to save to Gallery.`
          : `✅ PNG image downloaded: ${filename}.png`,
        filename: `${filename}.png`,
      };
    }

    // ─────────────── PDF ───────────────
    if (options.format === 'pdf') {
      if (onProgress) onProgress('Compiling multi-page PDF...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const imgWidth = 210; // A4 mm
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
      } else {
        pdf.save(`${filename}.pdf`);
      }

      return {
        success: true,
        message: Capacitor.isNativePlatform()
          ? `✅ PDF ready! Use the share sheet to save or send.`
          : `✅ PDF downloaded: ${filename}.pdf`,
        filename: `${filename}.pdf`,
      };
    }

    return { success: false, message: 'Unknown export format selected.' };
  } catch (error: any) {
    console.error('[Analytics Export] Failed:', error);
    const reason = error?.message || String(error) || 'Unknown error';
    return {
      success: false,
      message: `Export failed: ${reason}`,
    };
  }
}
