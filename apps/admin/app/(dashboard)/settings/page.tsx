// app/settings/page.tsx
"use client";

import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { SettingsSidebar } from "@/features/settings/components/settings-sidebar";
import { GeneralSettings } from "@/features/settings/components/general-settings";
import { SecuritySettings } from "@/features/settings/components/security-settings";
import { NotificationSettings } from "@/features/settings/components/notification-settings";
import { AppearanceSettings } from "@/features/settings/components/appearance-settings";
import { IntegrationSettings } from "@/features/settings/components/integration-settings";

type SettingsTab =
  | "general"
  | "security"
  | "notifications"
  | "appearance"
  | "integrations";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<SettingsTab>("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "integrations":
        return <IntegrationSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader
        title="Settings"
        description="Manage your platform settings and preferences"
        showFilter={false}
      />
      <main className="flex-1 px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}
