// features/settings/components/integration-settings.tsx
"use client";

import React, { useState } from "react";
import {
  Puzzle,
  //   Github,
  Mail,
  //   Slack,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Trash2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "connected" | "disconnected" | "error" | "pending";
  color: string;
  lastSync?: string;
  action: "connect" | "configure" | "sync";
}

export function IntegrationSettings() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    // {
    //   id: "github",
    //   name: "GitHub",
    //   description: "Connect your GitHub repositories",
    //   icon: Github,
    //   status: "connected",
    //   color: "bg-slate-900 text-white",
    //   lastSync: "2 hours ago",
    //   action: "sync",
    // },
    // {
    //   id: "slack",
    //   name: "Slack",
    //   description: "Send notifications to Slack channels",
    //   icon: Slack,
    //   status: "connected",
    //   color: "bg-[#4A154B] text-white",
    //   lastSync: "5 minutes ago",
    //   action: "configure",
    // },
    {
      id: "email",
      name: "Email",
      description: "Configure email notifications",
      icon: Mail,
      status: "connected",
      color: "bg-blue-500 text-white",
      lastSync: "1 day ago",
      action: "configure",
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with 5000+ apps",
      icon: Zap,
      status: "disconnected",
      color: "bg-amber-500 text-white",
      action: "connect",
    },
  ]);

  const getStatusConfig = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return {
          color: "bg-emerald-50 text-emerald-600",
          icon: CheckCircle2,
          label: "Connected",
        };
      case "disconnected":
        return {
          color: "bg-slate-50 text-slate-600",
          icon: XCircle,
          label: "Disconnected",
        };
      case "error":
        return {
          color: "bg-rose-50 text-rose-600",
          icon: AlertCircle,
          label: "Error",
        };
      case "pending":
        return {
          color: "bg-amber-50 text-amber-600",
          icon: RefreshCw,
          label: "Pending",
        };
    }
  };

  const handleAction = (integrationId: string, action: string) => {
    // TODO: Implement integration actions
    console.log(`Action: ${action} for integration: ${integrationId}`);
  };

  return (
    <div className="space-y-6">
      {/* Available Integrations */}
      <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                Integrations
              </h4>
              <p className="text-[9px] font-medium text-slate-400 mt-0.5">
                Connect third-party services to enhance your platform
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4100F2] text-white rounded-lg text-[10px] font-bold hover:bg-[#2B00A1] transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Integration
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {integrations.map((integration) => {
            const StatusIcon = getStatusConfig(integration.status).icon;
            const statusConfig = getStatusConfig(integration.status);

            return (
              <div
                key={integration.id}
                className="p-5 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        integration.color,
                      )}
                    >
                      <integration.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">
                          {integration.name}
                        </p>
                        <div
                          className={cn(
                            "flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase",
                            statusConfig.color,
                          )}
                        >
                          <StatusIcon className="w-2.5 h-2.5" />
                          {statusConfig.label}
                        </div>
                      </div>
                      <p className="text-[10px] font-medium text-slate-500 mt-0.5">
                        {integration.description}
                      </p>
                      {integration.lastSync && (
                        <p className="text-[8px] font-medium text-slate-400 mt-1">
                          Last sync: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {integration.status === "connected" && (
                      <>
                        <button
                          onClick={() =>
                            handleAction(integration.id, integration.action)
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-bold transition-colors"
                        >
                          {integration.action === "sync" && (
                            <RefreshCw className="w-3 h-3" />
                          )}
                          {integration.action === "configure" && "Configure"}
                          {integration.action === "sync" && "Sync Now"}
                        </button>
                        <button
                          onClick={() =>
                            handleAction(integration.id, "disconnect")
                          }
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {integration.status === "disconnected" && (
                      <button
                        onClick={() => handleAction(integration.id, "connect")}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4100F2] hover:bg-[#2B00A1] text-white rounded-lg text-[9px] font-bold transition-colors"
                      >
                        Connect
                      </button>
                    )}
                    {integration.status === "error" && (
                      <button
                        onClick={() => handleAction(integration.id, "retry")}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[9px] font-bold transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </button>
                    )}
                    <button
                      onClick={() => window.open("#", "_blank")}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
            API Keys
          </h4>
          <p className="text-[9px] font-medium text-slate-400 mt-0.5">
            Manage API access keys for integrations
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-700">
                  Production API Key
                </p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  sk_live_••••••••••••••••••••••••••••••••••••••••
                </p>
                <p className="text-[8px] font-medium text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-[9px] font-bold transition-colors">
                  Regenerate
                </button>
                <button className="px-3 py-1.5 bg-[#4100F2] hover:bg-[#2B00A1] text-white rounded-lg text-[9px] font-bold transition-colors">
                  Copy
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-700">Test API Key</p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  sk_test_••••••••••••••••••••••••••••••••••••••••
                </p>
                <p className="text-[8px] font-medium text-amber-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Test Mode
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-[9px] font-bold transition-colors">
                  Regenerate
                </button>
                <button className="px-3 py-1.5 bg-[#4100F2] hover:bg-[#2B00A1] text-white rounded-lg text-[9px] font-bold transition-colors">
                  Copy
                </button>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Generate New API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
