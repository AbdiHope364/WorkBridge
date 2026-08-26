"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui";
import { useCurrentUser } from "../../hooks/use-current-user";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
import {
  messageConversations,
  type MessageConversation,
} from "./messages-data";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M10.8 17.3a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.6 15.6 20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Avatar() {
  return (
    <div className="relative h-12 w-12 shrink-0 rounded-full border-4 border-emerald-950 bg-slate-900">
      <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-200" />
      <div className="absolute left-1/2 top-5 h-5 w-7 -translate-x-1/2 rounded-t-full bg-emerald-700" />
      <div className="absolute left-2 top-3 h-7 w-7 rounded-full border border-amber-400/50" />
      <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600" />
    </div>
  );
}

function ConversationCard({
  conversation,
}: {
  conversation: MessageConversation;
}) {
  return (
    <Link
      href={conversation.href}
      className="grid min-h-24 grid-cols-[56px_1fr_auto] items-center gap-4 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
    >
      <Avatar />

      <div className="min-w-0">
        <h2 className="truncate text-lg font-black leading-tight text-slate-950">
          {conversation.senderName} . {conversation.company}
        </h2>
        <p className="mt-2 max-w-[760px] text-sm leading-5 text-neutral-500">
          {conversation.preview}
        </p>
      </div>

      <div className="flex h-full flex-col items-end justify-between gap-4">
        <span className="text-xs font-semibold text-teal-600">
          {conversation.timeLabel}
        </span>
        {conversation.unread ? (
          <span className="h-3.5 w-3.5 rounded-full bg-blue-600" />
        ) : null}
      </div>
    </Link>
  );
}

export function MessagesPage() {
  const { isLoading, isAuthenticated } = useCurrentUser();
  // const user = {
  //   fullName: "Mock User",
  // };

  // const isLoading = false;
  // const isAuthenticated = true;

  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.replace("/login?next=/dashboard/messages");
  //   }
  // }, [isAuthenticated, isLoading, router]);

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return messageConversations;
    }

    return messageConversations.filter((conversation) => {
      return (
        conversation.senderName.toLowerCase().includes(normalizedQuery) ||
        conversation.company.toLowerCase().includes(normalizedQuery) ||
        conversation.preview.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm">
          Checking your session...
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex min-h-screen flex-col md:flex-row">
        <JobseekerSidebar />

        <section className="min-w-0 flex-1 px-6 py-5 md:px-8">
          <div className="max-w-[1040px]">
            <div>
              <h1 className="text-4xl font-normal leading-tight tracking-normal text-black">
                Messages
              </h1>
              <p className="text-base text-neutral-500">
                Track and manage messages.
              </p>
            </div>

            <label className="mt-6 flex h-14 max-w-[740px] items-center gap-4 rounded-lg border border-slate-300 bg-white px-6 text-teal-500 shadow-sm">
              <SearchIcon />
              <span className="sr-only">Search conversations</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Conversations"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-neutral-400"
              />
            </label>

            <div className="mt-8 space-y-5">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationCard
                    key={conversation.id}
                    conversation={conversation}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white px-8 py-14 text-center">
                  <h2 className="text-lg font-black text-slate-950">
                    No conversations found
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500">
                    Try searching by company, sender, or message content.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-7 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="h-9 min-w-72 border-teal-500 text-teal-600 hover:border-teal-600 hover:bg-teal-50"
              >
                Load older messages
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
