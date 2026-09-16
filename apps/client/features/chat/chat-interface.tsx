"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { JobseekerSidebar } from "../jobseeker-dashboard/components/jobseeker-sidebar";
import { useAuth } from "@/contexts/auth-context";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  CheckCheck,
  Sparkles,
  ShieldCheck,
  FileText,
  X,
  Plus,
  ArrowLeft,
  User,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Download,
  Zap,
} from "lucide-react";

export interface ChatMessageItem {
  id: string;
  sender: "me" | "them" | "system";
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
  attachment?: {
    name: string;
    size: string;
    type: "pdf" | "image" | "doc";
  };
  reaction?: string;
}

export interface ConversationItem {
  id: string;
  senderName: string;
  company: string;
  role: string;
  initials: string;
  avatarBg: string;
  isOnline: boolean;
  lastSeen?: string;
  verified: boolean;
  preview: string;
  timeLabel: string;
  unreadCount: number;
  category: "all" | "unread" | "interviews" | "offers";
  jobTitle: string;
  projectBudget?: string;
  messages: ChatMessageItem[];
}

const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: "usmael-google",
    senderName: "Usmael Taju",
    company: "Google Ethiopia & East Africa",
    role: "Lead Infrastructure & MEP Director",
    initials: "UT",
    avatarBg: "bg-emerald-700 text-amber-200 border-amber-400/50",
    isOnline: true,
    verified: true,
    preview: "Hi Robera, we have reviewed your portfolio and would like to schedule a technical sync next week...",
    timeLabel: "10:45 AM",
    unreadCount: 2,
    category: "interviews",
    jobTitle: "Master Electrical & Substation Contractor",
    projectBudget: "ETB 65,000 / Milestone",
    messages: [
      {
        id: "m1",
        sender: "them",
        senderName: "Usmael Taju",
        text: "Hello Robera! We thoroughly reviewed your WorkBridge profile and trade certifications for the High-Voltage Substation upgrade at our Addis Campus.",
        timestamp: "10:30 AM",
        read: true,
      },
      {
        id: "m2",
        sender: "them",
        senderName: "Usmael Taju",
        text: "Here is the architectural blueprint and load requirement document for your review before we meet.",
        timestamp: "10:32 AM",
        read: true,
        attachment: {
          name: "Google_Campus_Power_Blueprint_2026.pdf",
          size: "4.2 MB",
          type: "pdf",
        },
      },
      {
        id: "m3",
        sender: "me",
        senderName: "You",
        text: "Hi Usmael, thank you for reaching out! I've downloaded the specifications and reviewed the dual-transformer redundancy layout. Everything is well within my team's certification scope.",
        timestamp: "10:38 AM",
        read: true,
      },
      {
        id: "m4",
        sender: "them",
        senderName: "Usmael Taju",
        text: "Fantastic! We would love to schedule a video call this Thursday at 2:00 PM EAT to finalize the milestones and lock in the 0% commission direct contract.",
        timestamp: "10:45 AM",
        read: true,
      },
    ],
  },
  {
    id: "sarah-apex",
    senderName: "Sarah Jenkins",
    company: "Apex Renewable Energy",
    role: "Operations Director",
    initials: "SJ",
    avatarBg: "bg-teal-700 text-teal-100 border-teal-300/50",
    isOnline: true,
    verified: true,
    preview: "The 30kW solar inverter specs look great. Can you start on-site next Tuesday?",
    timeLabel: "09:15 AM",
    unreadCount: 1,
    category: "offers",
    jobTitle: "Commercial Solar Lead Installer",
    projectBudget: "ETB 48,000 Direct Payout",
    messages: [
      {
        id: "s1",
        sender: "them",
        senderName: "Sarah Jenkins",
        text: "Good morning Robera! We received your quote for the 30kW rooftop solar array in Kazanchis.",
        timestamp: "09:00 AM",
        read: true,
      },
      {
        id: "s2",
        sender: "me",
        senderName: "You",
        text: "Good morning Sarah. I factored in high-efficiency monocrystalline panels and dual hybrid inverters with full lithium battery backup.",
        timestamp: "09:10 AM",
        read: true,
      },
      {
        id: "s3",
        sender: "them",
        senderName: "Sarah Jenkins",
        text: "The 30kW solar inverter specs look great. Can you start on-site next Tuesday?",
        timestamp: "09:15 AM",
        read: false,
      },
    ],
  },
  {
    id: "robel-addis",
    senderName: "Robel Haile",
    company: "Addis MEP & Construction",
    role: "Project General Manager",
    initials: "RH",
    avatarBg: "bg-blue-700 text-blue-100 border-blue-300/50",
    isOnline: false,
    lastSeen: "15m ago",
    verified: true,
    preview: "Milestone payment #1 of ETB 25,000 has been released into escrow without any fee deduction.",
    timeLabel: "Yesterday",
    unreadCount: 0,
    category: "offers",
    jobTitle: "HVAC & Ducting Specialist",
    projectBudget: "ETB 50,000 Total Project",
    messages: [
      {
        id: "r1",
        sender: "them",
        senderName: "Robel Haile",
        text: "Robera, the HVAC ventilation ducting installation at the Bole Medhanialem complex passed the municipal pressure test!",
        timestamp: "Yesterday, 3:15 PM",
        read: true,
      },
      {
        id: "r2",
        sender: "them",
        senderName: "Robel Haile",
        text: "Milestone payment #1 of ETB 25,000 has been released into escrow without any fee deduction.",
        timestamp: "Yesterday, 3:20 PM",
        read: true,
      },
      {
        id: "r3",
        sender: "me",
        senderName: "You",
        text: "Thank you Robel! WorkBridge's direct escrow payout is instant. I'll proceed with Phase 2 condenser calibration tomorrow morning.",
        timestamp: "Yesterday, 3:45 PM",
        read: true,
      },
    ],
  },
  {
    id: "connor-healthbridge",
    senderName: "Dr. Connor Vance",
    company: "HealthBridge Hospitals Group",
    role: "Facilities & Biomedical Director",
    initials: "CV",
    avatarBg: "bg-purple-700 text-purple-100 border-purple-300/50",
    isOnline: true,
    verified: true,
    preview: "Our emergency backup generator sync needs ATS panel inspection before Friday.",
    timeLabel: "May 14",
    unreadCount: 0,
    category: "all",
    jobTitle: "Emergency Power & ATS Engineer",
    projectBudget: "ETB 35,000 / Day",
    messages: [
      {
        id: "c1",
        sender: "them",
        senderName: "Dr. Connor Vance",
        text: "Hello! We are looking for an experienced electrical engineer to audit our 500kVA backup generator ATS switchgear.",
        timestamp: "May 14, 11:00 AM",
        read: true,
      },
      {
        id: "c2",
        sender: "me",
        senderName: "You",
        text: "Hello Dr. Connor. I specialize in critical facility ATS transfer switches and Schneider PLC automation. I can perform the audit this week.",
        timestamp: "May 14, 11:25 AM",
        read: true,
      },
    ],
  },
];

const SMART_SUGGESTIONS = [
  "📅 Yes, Thursday at 2:00 PM works perfectly for me!",
  "⚡ I have attached my certified trade license and references.",
  "🤝 The 0% commission direct agreement terms look great, let's proceed.",
  "📍 Could you confirm the exact site address and access requirements?",
];

const AUTO_REPLY_BANK: Record<string, string[]> = {
  "usmael-google": [
    "Sounds great, Robera! I've marked the video meeting on Google Meet. Looking forward to speaking with you.",
    "Thank you for the quick confirmation! Our engineering supervisor will also join to review the panel schematics.",
    "Perfect. We will ensure all site gate passes and safety gear are ready for your arrival.",
  ],
  "sarah-apex": [
    "Excellent! Tuesday morning at 8:30 AM will be perfect. Our delivery truck with the inverters will be on site.",
    "Noted! We appreciate your fast turnaround. Direct escrow milestone will be funded today.",
  ],
  "robel-addis": [
    "Great work! Let us know once Phase 2 is completed so we can trigger the next milestone release immediately.",
  ],
  "connor-healthbridge": [
    "Thank you! Please bring your PPE and multimeter kit. Our facilities lead will meet you at Gate 2.",
  ],
  default: [
    "Thank you for the update! I have received your message and will follow up shortly.",
    "Understood. Everything is in order on our side. Talk soon!",
  ],
};

export function ChatInterface({
  initialConversationId,
}: {
  initialConversationId?: string;
}) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>(
    initialConversationId || INITIAL_CONVERSATIONS[0].id
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "unread" | "interviews" | "offers">("all");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  // Modals
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: "pdf" | "image" | "doc" } | null>(null);

  // Call simulation state
  const [callMuted, setCallMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active conversation
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeId) || conversations[0];
  }, [conversations, activeId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isTyping]);

  // Call timer simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isVideoModalOpen || isCallModalOpen) {
      setCallDuration(0);
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoModalOpen, isCallModalOpen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Filtered conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      const matchesSearch =
        c.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.preview.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === "all") return true;
      if (selectedCategory === "unread") return c.unreadCount > 0;
      if (selectedCategory === "interviews") return c.category === "interviews";
      if (selectedCategory === "offers") return c.category === "offers";
      return true;
    });
  }, [conversations, searchQuery, selectedCategory]);

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setMobileView("chat");
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text && !attachedFile) return;

    const newMsg: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      sender: "me",
      senderName: user?.fullName || "You",
      text: text || `Attached: ${attachedFile?.name}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
      attachment: attachedFile || undefined,
    };

    const targetConvId = activeId;

    // Update active conversation
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === targetConvId) {
          return {
            ...conv,
            preview: text || `Attached: ${attachedFile?.name}`,
            timeLabel: "Just now",
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );

    setInputMessage("");
    setAttachedFile(null);
    setShowEmojiPicker(false);

    // Simulate smart employer response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = AUTO_REPLY_BANK[targetConvId] || AUTO_REPLY_BANK.default;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const employerReply: ChatMessageItem = {
        id: `reply-${Date.now()}`,
        sender: "them",
        senderName: activeConversation.senderName,
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === targetConvId) {
            return {
              ...conv,
              preview: randomResponse,
              timeLabel: "Just now",
              messages: [...conv.messages, employerReply],
            };
          }
          return conv;
        })
      );
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReaction = (msgId: string, emoji: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeId) {
          return {
            ...conv,
            messages: conv.messages.map((m) =>
              m.id === msgId ? { ...m, reaction: m.reaction === emoji ? undefined : emoji } : m
            ),
          };
        }
        return conv;
      })
    );
  };

  const simulateAttachment = (fileName: string, type: "pdf" | "image" | "doc", size: string) => {
    setAttachedFile({ name: fileName, type, size });
  };

  return (
    <div className="flex h-screen bg-[#f8f8fa] text-slate-950 antialiased overflow-hidden flex-col md:flex-row">
      {/* 1. Common Left Sidebar (Provides sticky top bar & bottom nav on mobile, sidebar on desktop) */}
      <JobseekerSidebar />

      {/* 2. Main Messaging Hub */}
      <div className="flex flex-1 min-w-0 h-full overflow-hidden">
        {/* Panel A: Conversations List (Visible on mobile when mobileView === "list") */}
        <div
          className={`w-full md:w-[360px] lg:w-[400px] bg-white border-r border-slate-200 flex flex-col h-full shrink-0 pt-16 pb-20 md:pt-0 md:pb-0 ${
            mobileView === "chat" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-[#14214a] tracking-tight">Messages</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2 py-0.5 rounded-full">
                  {conversations.reduce((sum, c) => sum + c.unreadCount, 0)} new
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Real-time trade & employer chats</p>
            </div>

            <button
              onClick={() => setIsNewChatModalOpen(true)}
              className="p-2 sm:p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Start New Conversation"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="p-3 sm:p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations, skills, employers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1 no-scrollbar">
              {(
                [
                  { id: "all", label: "All" },
                  { id: "unread", label: "Unread" },
                  { id: "interviews", label: "Interviews" },
                  { id: "offers", label: "Offers" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === tab.id
                      ? "bg-[#14214a] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 0% Commission Badge */}
          <div className="mx-3 sm:mx-4 mt-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 flex items-center gap-2.5 text-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-[11px] leading-tight text-emerald-900">
              <span className="font-bold">0% Middleman Fees:</span> 100% direct trade wage settlement on all chats.
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-1.5">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4 text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-semibold text-slate-600">No conversations found</p>
                <p className="text-xs text-slate-400 mt-1">Try another search keyword or filter</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isCurrent = conv.id === activeId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`w-full text-left p-3 sm:p-3.5 rounded-2xl transition-all border flex gap-3 items-start relative group ${
                      isCurrent
                        ? "bg-emerald-50/60 border-emerald-200 shadow-xs"
                        : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    {/* Avatar with Online Indicator */}
                    <div className="relative shrink-0 mt-0.5">
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs border shadow-xs ${conv.avatarBg}`}
                      >
                        {conv.initials}
                      </div>
                      {conv.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full ring-1 ring-emerald-500/20" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`font-black text-sm truncate ${
                              isCurrent ? "text-emerald-950" : "text-slate-900"
                            }`}
                          >
                            {conv.senderName}
                          </span>
                          {conv.verified && (
                            <span title="Verified Employer">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
                          {conv.timeLabel}
                        </span>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-500 truncate mb-1">
                        {conv.company}
                      </div>

                      <p
                        className={`text-xs truncate ${
                          conv.unreadCount > 0 ? "font-bold text-slate-900" : "text-slate-500 font-normal"
                        }`}
                      >
                        {conv.preview}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 truncate">
                          {conv.jobTitle}
                        </span>
                        {conv.unreadCount > 0 && (
                          <span className="ml-auto bg-emerald-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Panel B: Active Chat Window (Takes over viewport on mobile when in chat view) */}
        <div
          className={`flex-1 flex flex-col h-full bg-[#f8f8fa] min-w-0 ${
            mobileView === "list"
              ? "hidden md:flex"
              : "fixed inset-0 z-50 md:static md:flex"
          }`}
        >
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="h-16 sm:h-20 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-xs">
                <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setMobileView("list")}
                    className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold mr-1 shrink-0 transition active:scale-95"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Chats</span>
                  </button>

                  <div className="relative shrink-0">
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs border shadow-xs ${activeConversation.avatarBg}`}
                    >
                      {activeConversation.initials}
                    </div>
                    {activeConversation.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full ring-1 ring-emerald-500/20" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm sm:text-base font-black text-[#14214a] truncate">
                        {activeConversation.senderName}
                      </h2>
                      {activeConversation.verified && (
                        <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md border border-emerald-200 shrink-0">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 truncate">
                      <span className="font-semibold text-slate-700 truncate">{activeConversation.company}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold shrink-0">
                        {isTyping ? "Typing..." : activeConversation.isOnline ? "Online" : activeConversation.lastSeen || "Offline"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Tools */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="hidden lg:flex flex-col items-end mr-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Trade Gig</span>
                    <span className="text-xs font-bold text-slate-800">{activeConversation.projectBudget}</span>
                  </div>

                  <button
                    onClick={() => setIsCallModalOpen(true)}
                    className="p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-xs"
                    title="Audio Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-xs"
                    title="Google Meet / Video Sync"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Thread / Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
                {/* Date Divider */}
                <div className="flex items-center justify-center my-1 sm:my-2">
                  <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 px-3 sm:px-4 py-1 rounded-full shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-600 text-center">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>0% Direct Trade Escrow Active</span>
                  </div>
                </div>

                {/* Messages List */}
                {activeConversation.messages.map((msg) => {
                  const isMe = msg.sender === "me";

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"} group relative`}
                    >
                      <div
                        className={`flex gap-2 sm:gap-3 max-w-[88%] sm:max-w-[75%] md:max-w-[70%] ${
                          isMe ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {!isMe && (
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-[10px] mt-1 border ${activeConversation.avatarBg}`}
                          >
                            {activeConversation.initials}
                          </div>
                        )}

                        <div className="space-y-1">
                          <div
                            className={`p-3 sm:p-4 rounded-2xl shadow-xs text-xs sm:text-sm leading-relaxed transition-all ${
                              isMe
                                ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-tr-xs"
                                : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">{msg.text}</p>

                            {/* Attached File Card */}
                            {msg.attachment && (
                              <div
                                className={`mt-2.5 p-2.5 rounded-xl flex items-center justify-between gap-2 border ${
                                  isMe
                                    ? "bg-white/10 border-white/20 text-white"
                                    : "bg-slate-50 border-slate-200 text-slate-800"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <FileText className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${isMe ? "text-amber-200" : "text-emerald-600"}`} />
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold truncate">{msg.attachment.name}</p>
                                    <p className={`text-[10px] ${isMe ? "text-emerald-100" : "text-slate-400"}`}>
                                      {msg.attachment.size} • Verified
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => alert(`Downloading ${msg.attachment?.name}...`)}
                                  className={`p-1.5 rounded-lg hover:bg-black/10 transition ${
                                    isMe ? "text-white" : "text-slate-700"
                                  }`}
                                  title="Download File"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Reaction badge */}
                          {msg.reaction && (
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 rounded-full text-xs shadow-xs ${
                                isMe ? "float-right mr-1" : "ml-1"
                              }`}
                            >
                              <span>{msg.reaction}</span>
                              <span className="text-[10px] font-bold text-slate-600">1</span>
                            </div>
                          )}

                          {/* Timestamp & Status */}
                          <div
                            className={`flex items-center gap-1 text-[10px] text-slate-400 font-semibold px-1 ${
                              isMe ? "justify-end" : "justify-start"
                            }`}
                          >
                            <span>{msg.timestamp}</span>
                            {isMe && <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}

                            {/* Quick Reaction Triggers on Hover */}
                            <div className="hidden group-hover:inline-flex items-center gap-1 ml-2 bg-white px-1.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                              {["👍", "❤️", "⚡", "🤝"].map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => handleReaction(msg.id, emoji)}
                                  className="hover:scale-125 transition-transform text-xs"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-[10px] border ${activeConversation.avatarBg}`}
                    >
                      {activeConversation.initials}
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-3 sm:px-6 py-2 bg-white/70 backdrop-blur-xs border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 self-center shrink-0 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> Quick reply:
                </span>
                {SMART_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all shrink-0 active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Attached file preview before sending */}
              {attachedFile && (
                <div className="mx-3 sm:mx-6 mb-2 p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-emerald-900 truncate">{attachedFile.name}</span>
                    <span className="text-[10px] text-emerald-700 shrink-0">({attachedFile.size})</span>
                  </div>
                  <button
                    onClick={() => setAttachedFile(null)}
                    className="p-1 text-emerald-700 hover:text-emerald-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Message Composer Box */}
              <div className="p-2.5 sm:p-4 bg-white border-t border-slate-200 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 sm:p-2 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  {/* File Attachment Button */}
                  <button
                    type="button"
                    onClick={() => simulateAttachment("Trade_Certification_2026.pdf", "pdf", "2.1 MB")}
                    className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                    title="Attach Trade Documents or Photos"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  {/* Input Text Box (text-base prevents iOS zoom on focus) */}
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message ${activeConversation.senderName}...`}
                    className="flex-1 bg-transparent text-base sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none px-1.5"
                  />

                  {/* Emoji Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                      title="Add Emoji"
                    >
                      <Smile className="w-4 h-4" />
                    </button>

                    {showEmojiPicker && (
                      <div className="absolute bottom-12 right-0 bg-white border border-slate-200 p-2 rounded-2xl shadow-xl flex gap-1.5 z-50">
                        {["👍", "🤝", "⚡", "❤️", "👏", "😊", "📅", "🚀"].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              setInputMessage((prev) => prev + emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="p-2 hover:bg-slate-100 rounded-lg text-lg hover:scale-125 transition-transform"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Send Button */}
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() && !attachedFile}
                    className="p-2.5 sm:p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-bold transition-all shadow-xs flex items-center justify-center shrink-0 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
              <User className="w-12 h-12 mb-3 opacity-30 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-700">Select a conversation</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm text-center">
                Choose an employer or contractor from the left panel to review quotes, negotiate milestones, and send messages.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: Interactive Video Call Simulator */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#14214a] border border-slate-700 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="p-3 sm:p-4 bg-slate-900/60 border-b border-slate-700 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Google Meet Sync (0% Direct)</span>
              </div>
              <span className="text-xs font-mono text-slate-300">{formatDuration(callDuration)}</span>
            </div>

            <div className="relative aspect-video bg-slate-900 flex items-center justify-center p-4 sm:p-8">
              {/* Remote Video Placeholder */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-xl sm:text-2xl font-black border-4 ${activeConversation.avatarBg} shadow-xl mb-3 sm:mb-4`}>
                  {activeConversation.initials}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">{activeConversation.senderName}</h3>
                <p className="text-xs text-emerald-300 mt-0.5">{activeConversation.company}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-2 bg-slate-800/80 px-3 py-1 rounded-full">
                  High-definition secure line established
                </p>
              </div>

              {/* Self Video PiP */}
              <div className="absolute bottom-3 right-3 w-28 sm:w-36 aspect-video bg-slate-800 rounded-2xl border-2 border-slate-700 shadow-xl overflow-hidden flex items-center justify-center text-white">
                {videoOff ? (
                  <VideoOff className="w-5 h-5 text-slate-500" />
                ) : (
                  <div className="text-center">
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-400">You (Camera On)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Call Controls */}
            <div className="p-4 sm:p-6 bg-slate-900/90 flex items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setCallMuted(!callMuted)}
                className={`p-3 sm:p-4 rounded-full transition ${
                  callMuted ? "bg-rose-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                title={callMuted ? "Unmute" : "Mute"}
              >
                {callMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOff(!videoOff)}
                className={`p-3 sm:p-4 rounded-full transition ${
                  videoOff ? "bg-rose-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                title={videoOff ? "Turn Video On" : "Turn Video Off"}
              >
                {videoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-5 py-3 sm:px-6 sm:py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                <PhoneOff className="w-5 h-5" /> End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Interactive Voice Call Simulator */}
      {isCallModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm sm:max-w-md overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-lg sm:text-xl font-black border-4 ${activeConversation.avatarBg} shadow-lg mb-4 animate-pulse`}>
              {activeConversation.initials}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">{activeConversation.senderName}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">{activeConversation.company}</p>
            <div className="mt-3 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              In Call: {formatDuration(callDuration)}
            </div>

            <div className="flex gap-4 mt-6 sm:mt-8">
              <button
                onClick={() => setCallMuted(!callMuted)}
                className={`p-3.5 sm:p-4 rounded-full transition ${
                  callMuted ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {callMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsCallModalOpen(false)}
                className="px-6 py-3.5 sm:py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                <PhoneOff className="w-5 h-5" /> End
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Start New Chat */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-black text-[#14214a]">Start a New Message</h3>
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-3 mb-4">
              Select a verified company or employer to initiate a direct 0% commission conversation:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {[
                { name: "Addis Solar Technologies", role: "Rooftop Commercial Project", lead: "Mussie Belay" },
                { name: "Ethiopian Airlines MEP Group", role: "Substation Maintenance", lead: "Dawit Kebede" },
                { name: "Midroc Construction", role: "High-Rise Wiring Contract", lead: "Alemayehu T." },
              ].map((emp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsNewChatModalOpen(false);
                    alert(`Starting conversation with ${emp.name} (${emp.lead})`);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{emp.name}</h4>
                    <p className="text-xs text-slate-500">{emp.role} • {emp.lead}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Connect →</span>
                </button>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 flex justify-end">
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
