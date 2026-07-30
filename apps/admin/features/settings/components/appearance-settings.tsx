// features/settings/components/appearance-settings.tsx
"use client";

import React, { useState } from "react";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  Eye,
  Brush,
  Layout,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: string[];
  preview: string;
}

interface AppearanceSettingsData {
  theme: string;
  fontSize: "small" | "medium" | "large";
  sidebarCollapsed: boolean;
  animations: boolean;
  compactView: boolean;
}

export function AppearanceSettings() {
  const [settings, setSettings] = useState<AppearanceSettingsData>({
    theme: "light",
    fontSize: "medium",
    sidebarCollapsed: false,
    animations: true,
    compactView: false,
  });

  const themes: Theme[] = [
    {
      id: "light",
      name: "Light",
      description: "Clean and bright interface",
      colors: ["#FFFFFF", "#F8FAFC", "#4100F2", "#00D47E"],
      preview: "bg-white border border-slate-200",
    },
    {
      id: "dark",
      name: "Dark",
      description: "Easy on the eyes in low light",
      colors: ["#1A1A2E", "#16213E", "#4100F2", "#00D47E"],
      preview: "bg-slate-900 border border-slate-700",
    },
    {
      id: "system",
      name: "System",
      description: "Follows your system preference",
      colors: ["#FFFFFF", "#1A1A2E", "#4100F2", "#00D47E"],
      preview:
        "bg-gradient-to-r from-white to-slate-900 border border-slate-200",
    },
  ];

  const fontSizes = [
    { id: "small", label: "Small", size: "text-sm" },
    { id: "medium", label: "Medium", size: "text-base" },
    { id: "large", label: "Large", size: "text-lg" },
  ];

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
            Theme Preference
          </h4>
          <p className="text-[9px] font-medium text-slate-400 mt-0.5">
            Choose your preferred visual theme
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((theme) => {
              const isSelected = settings.theme === theme.id;

              return (
                <button
                  key={theme.id}
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, theme: theme.id }))
                  }
                  className={cn(
                    "relative p-4 rounded-xl border-2 transition-all text-left",
                    isSelected
                      ? "border-[#4100F2] bg-purple-50/30 shadow-md shadow-purple-100"
                      : "border-slate-100 hover:border-slate-300",
                  )}
                >
                  <div
                    className={cn(
                      "h-20 rounded-lg mb-3 flex items-center justify-center border",
                      theme.preview,
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {theme.name}
                      </p>
                      <p className="text-[9px] font-medium text-slate-400">
                        {theme.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#4100F2] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Font Size & Layout */}
      <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
            Font Size & Layout
          </h4>
          <p className="text-[9px] font-medium text-slate-400 mt-0.5">
            Customize the display and readability
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Font Size */}
          <div>
            <p className="text-[10px] font-bold text-slate-600 mb-3">
              Font Size
            </p>
            <div className="flex gap-3">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      fontSize: size.id as any,
                    }))
                  }
                  className={cn(
                    "flex-1 px-4 py-3 rounded-lg border-2 transition-all",
                    settings.fontSize === size.id
                      ? "border-[#4100F2] bg-purple-50/30"
                      : "border-slate-100 hover:border-slate-300",
                  )}
                >
                  <span
                    className={cn(
                      "block font-medium text-slate-700",
                      size.size,
                    )}
                  >
                    {size.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Layout Options */}
          <div className="border-t border-slate-100 pt-6">
            <p className="text-[10px] font-bold text-slate-600 mb-3">
              Layout Options
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    compactView: !prev.compactView,
                  }))
                }
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                  settings.compactView
                    ? "border-[#4100F2] bg-purple-50/30"
                    : "border-slate-100 hover:border-slate-300",
                )}
              >
                <div className="flex items-center gap-3">
                  <Layout className="w-4 h-4 text-slate-400" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-700">
                      Compact View
                    </p>
                    <p className="text-[8px] font-medium text-slate-400">
                      Reduce spacing for more content
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors",
                    settings.compactView ? "bg-[#4100F2]" : "bg-slate-300",
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 bg-white rounded-full transition-transform mt-0.5",
                      settings.compactView
                        ? "translate-x-5"
                        : "translate-x-0.5",
                    )}
                  />
                </div>
              </button>

              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    animations: !prev.animations,
                  }))
                }
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                  settings.animations
                    ? "border-[#4100F2] bg-purple-50/30"
                    : "border-slate-100 hover:border-slate-300",
                )}
              >
                <div className="flex items-center gap-3">
                  <Brush className="w-4 h-4 text-slate-400" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-700">
                      Animations
                    </p>
                    <p className="text-[8px] font-medium text-slate-400">
                      Enable smooth transitions
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors",
                    settings.animations ? "bg-[#4100F2]" : "bg-slate-300",
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 bg-white rounded-full transition-transform mt-0.5",
                      settings.animations ? "translate-x-5" : "translate-x-0.5",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
