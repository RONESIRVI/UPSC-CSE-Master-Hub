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

// ─────────────────────────────────────────────────────────────────────────────
// oklch FIX
//
// TailwindCSS v4 emits all colors as oklch() in its CSS.
// html2canvas v1.4.x CANNOT parse oklch/oklab/lch/lab and throws:
//   "attempting to parse an unsupported color function oklch"
//
// The fix works at the CSSOM level — BEFORE html2canvas reads anything:
//   1. Iterate every CSSStyleRule in every stylesheet (handles both <style>
//      tags and <link> stylesheets, including Vite-bundled CSS files)
//   2. For each property value that contains oklch(), resolve it to rgb()
//      by setting it on a hidden probe element and reading getComputedStyle
//      (the browser converts oklch → rgb natively)
//   3. Overwrite the CSSOM rule's property with the resolved rgb value
//   4. Return a restore function that puts the original values back
//
// Because we patch the LIVE CSSOM (not textContent), the change is
// immediate and synchronous. When html2canvas clones the document it
// copies the already-patched CSSOM — no oklch reaches its parser.
// ─────────────────────────────────────────────────────────────────────────────

const MODERN_COLOR_RE = /oklch\([^)]*\)|oklab\([^)]*\)|lch\([^)]*\)|lab\([^)]*\)/;

/** Recursively collects all CSSStyleRules from a stylesheet (handles @media etc.) */
function collectStyleRules(rules: CSSRuleList, out: CSSStyleRule[]): void {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      out.push(rule);
    } else if ('cssRules' in rule && (rule as any).cssRules) {
      // @media, @layer, @supports, etc.
      collectStyleRules((rule as any).cssRules, out);
    }
  }
}

/** Resolve an oklch/oklab/etc. value to plain rgb() via the browser. */
let _probe: HTMLDivElement | null = null;
function resolveModernColor(val: string): string {
  if (!_probe) {
    _probe = document.createElement('div');
    _probe.style.cssText = 'position:absolute;top:-9999px;left:-9999px;pointer-events:none;';
    document.body.appendChild(_probe);
  }
  try {
    _probe.style.color = '';
    _probe.style.color = val;
    const resolved = window.getComputedStyle(_probe).color;
    return resolved && resolved !== '' ? resolved : 'rgb(0,0,0)';
  } catch {
    return 'rgb(0,0,0)';
  }
}

/**
 * Patches the live CSSOM to replace oklch/oklab/lch/lab with rgb().
 * Returns a restore function that reverts all changes.
 *
 * Must be called BEFORE html2canvas() so the cloned document inherits
 * the patched (rgb-only) CSSOM.
 */
function patchLiveCSSOM(): () => void {
  const backups: Array<{ rule: CSSStyleRule; prop: string; orig: string; priority: string }> = [];

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList | null = null;
    try {
      rules = sheet.cssRules; // throws for cross-origin sheets
    } catch {
      continue;
    }
    if (!rules) continue;

    const styleRules: CSSStyleRule[] = [];
    collectStyleRules(rules, styleRules);

    for (const rule of styleRules) {
      const style = rule.style;
      for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        const val = style.getPropertyValue(prop);
        if (!val || !MODERN_COLOR_RE.test(val)) continue;

        // Replace ALL modern color functions in this value
        const resolved = val.replace(
          new RegExp(MODERN_COLOR_RE.source, 'g'),
          (match) => resolveModernColor(match)
        );

        backups.push({ rule, prop, orig: val, priority: style.getPropertyPriority(prop) });
        rule.style.setProperty(prop, resolved, style.getPropertyPriority(prop));
      }
    }
  }

  return () => {
    for (const { rule, prop, orig, priority } of backups) {
      try { rule.style.setProperty(prop, orig, priority); } catch { /* ignore */ }
    }
    // Clean up probe
    if (_probe && _probe.parentNode) {
      _probe.parentNode.removeChild(_probe);
      _probe = null;
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CAPTURE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Captures an element to a canvas.
 *
 * Handles two issues:
 *  1. Element inside sr-only / overflow:hidden modal → move to body off-screen
 *  2. TailwindCSS v4 oklch colors → patch live CSSOM before html2canvas runs
 */
async function captureElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  // ── Step A: Move element off-screen to bypass modal overflow clipping ──
  const originalParent = element.parentElement!;
  const originalNextSibling = element.nextSibling;
  const prevInlineStyle = element.getAttribute('style') || '';

  const offScreenWrapper = document.createElement('div');
  offScreenWrapper.style.cssText =
    'position:fixed;top:-99999px;left:0;z-index:-9999;' +
    'width:1200px;overflow:visible;background:#ffffff;';
  offScreenWrapper.appendChild(element);
  document.body.appendChild(offScreenWrapper);

  element.style.cssText =
    'display:block!important;visibility:visible!important;opacity:1!important;' +
    'clip:auto!important;width:1000px;background:#ffffff;';

  // ── Step B: Patch live CSSOM oklch → rgb BEFORE html2canvas clones ──
  const restoreCSSOM = patchLiveCSSOM();

  // Allow browser to apply layout changes
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
    // ── Restore: always run regardless of success/error ──
    restoreCSSOM();
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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

export async function exportAnalyticsDocument(
  elementId: string,
  options: AnalyticsExportOptions,
  onProgress?: (msg: string) => void
): Promise<ExportResult> {
  const element = document.getElementById(elementId);
  if (!element) {
    return {
      success: false,
      message: 'Export failed: Report canvas not found. Try reopening the export dialog.',
    };
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

    // Dynamic share text
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
        } catch { /* non-fatal */ }

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
        } catch { /* non-fatal */ }

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
    return { success: false, message: `Export failed: ${reason}` };
  }
}
