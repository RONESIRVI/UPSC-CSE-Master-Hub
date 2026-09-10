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

/**
 * Temporarily makes a DOM element visible (off-screen) so html2canvas
 * can capture it correctly, then restores original styles.
 */
function makeElementCapturable(element: HTMLElement): () => void {
  const parent = element.parentElement;
  const originalParentClass = parent ? parent.className : null;
  const originalParentStyle = parent ? parent.getAttribute('style') : null;
  const originalStyle = element.getAttribute('style');

  // Force the parent wrapper to be visible off-screen
  if (parent) {
    parent.className = 'block overflow-visible';
    parent.style.cssText = 'position: fixed; top: -99999px; left: 0; z-index: -9999;';
  }
  // Remove any inline style hiding the element itself
  element.style.cssText = 'display: block; visibility: visible; opacity: 1;';

  // Return a restore function
  return () => {
    if (parent) {
      if (originalParentClass !== null) parent.className = originalParentClass;
      else parent.removeAttribute('class');
      if (originalParentStyle !== null) parent.setAttribute('style', originalParentStyle);
      else parent.removeAttribute('style');
    }
    if (originalStyle !== null) element.setAttribute('style', originalStyle);
    else element.removeAttribute('style');
  };
}

export async function exportAnalyticsDocument(
  elementId: string,
  options: AnalyticsExportOptions,
  onProgress?: (msg: string) => void
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[Analytics Export] Element #${elementId} not found in DOM.`);
    if (onProgress) onProgress('Export failed: report element not found.');
    return false;
  }

  // Temporarily make the hidden element capturable by html2canvas
  const restoreStyles = makeElementCapturable(element);

  try {
    if (onProgress)
      onProgress('Rendering visual heatmap & analytics telemetry...');

    // Small delay so browser can apply the style changes before capture
    await new Promise((resolve) => setTimeout(resolve, 120));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
    });

    // Restore element visibility immediately after capture
    restoreStyles();

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `UPSC_Performance_Gap_Analytics_${timestamp}`;

    // ---------- PNG ----------
    if (options.format === 'png') {
      if (onProgress) onProgress('Generating high-resolution PNG image...');
      const imageUri = canvas.toDataURL('image/png');

      if (Capacitor.isNativePlatform()) {
        if (onProgress) onProgress('Saving image to device...');
        const base64Data = imageUri.split(',')[1];

        // Save to Cache first (required for Share)
        const savedFile = await Filesystem.writeFile({
          path: `${filename}.png`,
          data: base64Data,
          directory: Directory.Cache,
          recursive: true,
        });

        // Also save a copy to Documents (persistent, user-accessible)
        try {
          await Filesystem.writeFile({
            path: `UPSC Hub/Reports/${filename}.png`,
            data: base64Data,
            directory: Directory.Documents,
            recursive: true,
          });
        } catch {
          // Non-fatal: Documents save failed, share will still work
        }

        // Open native share sheet (user can save to gallery / WhatsApp / etc.)
        await Share.share({
          title: 'UPSC Analytics Report',
          text: 'My UPSC CSE Analytics Performance Report',
          url: savedFile.uri,
          dialogTitle: 'Save or Share Report',
        });
      } else {
        // Web browser download
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageUri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      return true;
    }

    // ---------- PDF ----------
    if (options.format === 'pdf') {
      if (onProgress) onProgress('Compiling PDF report pages...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
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

        // Save to Cache for immediate sharing
        const savedFile = await Filesystem.writeFile({
          path: `${filename}.pdf`,
          data: pdfBase64,
          directory: Directory.Cache,
          recursive: true,
        });

        // Also save a persistent copy in Documents
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
          dialogTitle: 'Save or Share PDF Report',
        });
      } else {
        // Web browser direct download
        pdf.save(`${filename}.pdf`);
      }
      return true;
    }

    return false;
  } catch (error) {
    // Always restore styles even on error
    restoreStyles();
    console.error('[Analytics Export] Failed:', error);
    if (onProgress) onProgress('Export failed. Please try again.');
    return false;
  }
}
