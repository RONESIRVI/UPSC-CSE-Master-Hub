package com.upscconquest.app;

import android.content.ComponentName;
import android.content.pm.PackageManager;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AppIcon")
public class AppIconPlugin extends Plugin {

    @PluginMethod
    public void changeIcon(PluginCall call) {
        String iconName = call.getString("name");
        if (iconName == null) {
            call.reject("Must provide an icon name");
            return;
        }

        PackageManager pm = getContext().getPackageManager();
        String pkg = getContext().getPackageName();

        ComponentName defaultIcon = new ComponentName(pkg, pkg + ".MainActivityDefault");
        ComponentName darkIcon = new ComponentName(pkg, pkg + ".MainActivityDark");
        ComponentName minimalIcon = new ComponentName(pkg, pkg + ".MainActivityMinimal");

        try {
            pm.setComponentEnabledSetting(defaultIcon,
                "default".equals(iconName) ? PackageManager.COMPONENT_ENABLED_STATE_ENABLED : PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP);

            pm.setComponentEnabledSetting(darkIcon,
                "dark".equals(iconName) ? PackageManager.COMPONENT_ENABLED_STATE_ENABLED : PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP);

            pm.setComponentEnabledSetting(minimalIcon,
                "minimal".equals(iconName) ? PackageManager.COMPONENT_ENABLED_STATE_ENABLED : PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP);
                
            call.resolve();
        } catch (Exception e) {
            call.reject("Could not change app icon", e);
        }
    }
}
