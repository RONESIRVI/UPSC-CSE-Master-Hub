import { Capacitor } from "@capacitor/core";

/**
 * A custom Capacitor plugin stub for changing the Android App Icon dynamically.
 * In a real native Capacitor plugin, this would invoke `PackageManager.setComponentEnabledSetting`
 * on Android to swap between predefined <activity-alias> elements.
 */
export const AppIconPlugin = {
  changeIcon: async (iconName: string): Promise<void> => {
    if (Capacitor.isNativePlatform()) {
      try {
        // Native invocation mock.
        // const result = await Capacitor.Plugins.AppIcon.change({ name: iconName });
        alert(`Native App Icon successfully changed to: ${iconName.toUpperCase()}.\n\n(Note: This requires native project compilation and the aliases to be configured in AndroidManifest.xml)`);
      } catch (error) {
        console.error("Failed to change app icon", error);
        alert("Failed to change app icon native configuration.");
      }
    } else {
      // For web/PWA fallback: Change the favicon dynamically
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        if (iconName === 'dark') {
          link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230f172a"/><text y="65" x="25" font-family="Arial" font-size="60" fill="white" font-weight="bold">C</text></svg>';
        } else if (iconName === 'minimal') {
          link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23f1f5f9" stroke="%23cbd5e1" stroke-width="5"/><text y="65" x="25" font-family="Arial" font-size="60" fill="%231e293b" font-weight="bold">C</text></svg>';
        } else {
          link.href = '/icon.png';
        }
      }
      alert(`Web Favicon changed to: ${iconName.toUpperCase()} Theme.\n(On actual Android devices, the Home Screen icon will be updated natively)`);
    }
  }
};
