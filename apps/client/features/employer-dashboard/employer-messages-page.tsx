"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { SVGProps } from "react";
import {
  BellIcon,
  SearchJobIcon,
} from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";
import { WorkBridgeLogo, Spinner } from "@repo/ui";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { MessageSquare, ArrowRight } from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;

interface EmployerConversation {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  active?: boolean;
  avatarUrl?: string;
  applicantId?: string;
}

function BackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 6 9 12l6 6M9.5 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4 4 17 8-17 8 4-8-4-8Zm4 8h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Avatar({ large = false, name = "Applicant" }: { large?: boolean; name?: string }) {
  const initial = name.charAt(0).toUpperCase() || "A";
  const dimensions = large ? "h-12 w-12 text-base" : "h-10 w-10 text-xs";

  return (
    <div
      className={`grid ${dimensions} shrink-0 place-items-center rounded-full bg-slate-900 font-bold text-white shadow-xs border border-slate-700`}
    >
      {initial}
    </div>
  );
}

function Header() {
  return (
    <header className="hidden md:flex h-[71px] items-center justify-between border-b border-[#d9d9df] bg-white px-6 shadow-[0_2px_5px_rgba(15,23,42,0.14)] md:px-10">
      <Link
        href="/dashboard/employer"
        aria-label="WorkBridge home"
        className="hidden h-full items-center text-[#172653] md:flex"
      >
        <WorkBridgeLogo className="h-8 w-auto max-w-[170px]" />
      </Link>

      <div className="ml-auto flex items-center gap-8">
        <Link
          href="/dashboard/employer/notifications"
          aria-label="Notifications"
          className="relative inline-flex items-center justify-center text-black"
        >
          <BellIcon className="h-6 w-6" />
        </Link>
      </div>
    </header>
  );
}

export function EmployerMessagesPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<EmployerConversation[]>([]);
  const [activeConv, setActiveConv] = useState<EmployerConversation | null>(null);
  const [messages, setMessages] = useState<Array<{ id: string; sender: string; text: string; time: string }>>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingChat, setLoadingChat] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!isAuthenticated) return;
      try {
        setLoadingChat(true);
        const res = await api.chat.listConversations();
        const rawList = Array.isArray(res) ? res : (res as any)?.conversations || [];
        const formatted: EmployerConversation[] = rawList.map((c: any) => ({
          id: c.id || c.conversationId || `c_${Math.random()}`,
          name: c.senderName || c.applicantName || "Trade Worker",
          role: c.applicantRole || c.category || "Skilled Worker",
          preview: c.messages?.[c.messages.length - 1]?.text || "No messages yet",
          time: c.updatedAt ? new Date(c.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Recent",
          active: false,
          applicantId: c.applicantId || c.userId,
        }));

        setConversations(formatted);
        if (formatted.length > 0) {
          setActiveConv(formatted[0]);
        }
      } catch (err) {
        console.error("Failed to load employer conversations:", err);
      } finally {
        setLoadingChat(false);
      }
    };

    fetchConversations();
  }, [isAuthenticated]);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeConv) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: "employer",
      text: newMessageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessageText("");
  };

  if (authLoading || loadingChat) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8f8fa]">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex min-w-0 flex-1 flex-col pt-16 pb-20 md:pt-0 md:pb-0">
          <Header />

          {conversations.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#f7f7fb]">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 shadow-sm">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">No Candidate Messages Yet</h2>
              <p className="text-sm text-slate-500 max-w-md mt-1 mb-6">
                When skilled workers apply for your posted jobs or initiate a direct service conversation, your chat threads will appear here.
              </p>
              <Link
                href="/dashboard/employer/create"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                <span>Post a Job to Get Applicants</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid min-h-[calc(100vh-71px)] flex-1 lg:grid-cols-[370px_1fr]">
              <aside className="flex min-h-0 flex-col border-r border-[#d9d9df] bg-white">
                <div className="px-3 py-7">
                  <label className="flex h-10 items-center gap-4 rounded border border-[#c0c7c9] bg-[#dce5e7] px-8">
                    <SearchJobIcon className="h-5 w-5 shrink-0 text-[#4d5b5e]" />
                    <span className="sr-only">Search conversations</span>
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Conversations..."
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#6f7779]"
                    />
                  </label>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConv(conv)}
                      className={`flex w-full items-start gap-4 border-b border-[#e5e5e9] p-4 text-left transition ${
                        activeConv?.id === conv.id ? "bg-[#eef8f8]" : "hover:bg-slate-50"
                      }`}
                    >
                      <Avatar name={conv.name} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h2 className="truncate text-sm font-bold text-black">{conv.name}</h2>
                          <span className="text-[11px] text-[#555]">{conv.time}</span>
                        </div>
                        <p className="truncate text-xs text-[#555] mt-0.5">{conv.role}</p>
                        <p className="truncate text-xs text-[#888] mt-1">{conv.preview}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <Link
                  href="/dashboard/employer"
                  className="m-7 inline-flex items-center gap-2 text-2xl font-normal text-black"
                >
                  <BackIcon className="h-5 w-5" />
                  Back
                </Link>
              </aside>

              <section className="flex min-h-0 flex-col bg-[#f7f7fb]">
                {activeConv && (
                  <>
                    <div className="flex min-h-[66px] flex-col gap-4 border-b border-[#d9d9df] bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar large name={activeConv.name} />
                        <div>
                          <h1 className="text-lg font-medium leading-tight">{activeConv.name}</h1>
                          <p className="text-xs text-[#666]">{activeConv.role}</p>
                        </div>
                      </div>

                      {activeConv.applicantId && (
                        <div className="flex gap-3">
                          <Link
                            href={`/dashboard/employer/applications/${activeConv.applicantId}`}
                            className="inline-flex h-9 px-4 items-center justify-center gap-2 rounded border border-[#c9c9cf] bg-white text-xs font-semibold text-black hover:bg-slate-50"
                          >
                            <ProfileIcon className="h-4 w-4 text-[#707070]" />
                            View Candidate Profile
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-8">
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                          <MessageSquare className="w-10 h-10 mb-2 text-slate-300" />
                          <p className="text-xs font-semibold">Beginning of chat thread with {activeConv.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {messages.map((m) => (
                            <div
                              key={m.id}
                              className={`flex flex-col ${m.sender === "employer" ? "items-end" : "items-start"}`}
                            >
                              <div
                                className={`max-w-[500px] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                                  m.sender === "employer"
                                    ? "bg-[#172653] text-white"
                                    : "bg-white border border-slate-200 text-slate-900 shadow-xs"
                                }`}
                              >
                                {m.text}
                              </div>
                              <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="bg-[#f7f7fb] px-6 pb-4">
                      <div className="mx-auto flex h-11 max-w-[500px] items-center gap-3 rounded-xl border border-[#c9c9cf] bg-white px-4 shadow-xs">
                        <input
                          type="text"
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                          placeholder="Type your message..."
                          className="min-w-0 flex-1 bg-transparent text-xs text-slate-900 outline-none placeholder:text-[#9a9a9a]"
                        />
                        <button type="submit" aria-label="Send message" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">
                          <SendIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
