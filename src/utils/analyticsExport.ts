import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  SyllabusTopic,
  StudySessionLog,
  MockTestLog,
  WeakAreaItem,
} from "../types";
import { GAP_ANALYSIS_METRICS } from "../data/analyticsDefaults";

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

export async function exportAnalyticsDocument(
  elementId: string,
  options: AnalyticsExportOptions,
  onProgress?: (msg: string) => void
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    if (onProgress)
      onProgress("Rendering visual heatmap & analytics telemetry...");

    // Generate high-resolution canvas with scale 2
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
    });

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `UPSC_Performance_Gap_Analytics_${timestamp}`;

    if (options.format === "png") {
      if (onProgress) onProgress("Generating high-resolution PNG image...");
      const imageUri = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = imageUri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    if (options.format === "pdf") {
      if (onProgress) onProgress("Compiling PDF report pages...");
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      const pdf = new jsPDF("p", "mm", "a4");

      // First Page
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;

      // Additional pages if content spans beyond 1 A4 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}.pdf`);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to export analytics report:", error);
    return false;
  }
}
