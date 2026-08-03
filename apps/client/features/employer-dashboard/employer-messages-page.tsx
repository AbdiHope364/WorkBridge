import Link from "next/link";
import type { SVGProps } from "react";
import {
  BellIcon,
  SearchJobIcon,
} from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";

type IconProps = SVGProps<SVGSVGElement>;

const conversations = [
  {
    id: "bonsa",
    name: "Bonsa Daba",
    role: "Senior Full stack Developer",
    preview: "I have attached my updated portfolio, go and che...",
    time: "2 mins Ago",
    active: true,
  },
  {
    id: "tolera-1",
    name: "Tolera Imiru",
    role: "Senior Full stack Developer",
    preview: "I have attached my updated portfolio, go and che...",
    time: "2 days Ago",
    active: false,
  },
  {
    id: "tolera-2",
    name: "Tolera Imiru",
    role: "Senior Full stack Developer",
    preview: "I have attached my updated portfolio, go and che...",
    time: "2 days Ago",
    active: false,
  },
  {
    id: "tolera-3",
    name: "Tolera Imiru",
    role: "Senior Full stack Developer",
    preview: "I have attached my updated portfolio, go and che...",
    time: "2 days Ago",
    active: false,
  },
];

const messages = [
  {
    id: "m1",
    sender: "employer",
    text: "Hello, thank you for applying for the UI Designer position at our company. We reviewed your application and would like to learn more about your experience and design background.",
    time: "10:15 AM Seen",
  },
  {
    id: "m2",
    sender: "candidate",
    text: "Hello! Thank you for reaching out. I'm excited about the opportunity. I have been working as a UI Designer for the past three years, mainly focusing on mobile apps and website interfaces.",
    time: "11:15 AM",
  },
  {
    id: "m3",
    sender: "employer",
    text: "That sounds great. We are currently looking for someone who can create modern, user-friendly, and responsive designs for both web and mobile platforms. What design tools do you usually work with?",
    time: "10:15 AM Seen",
  },
  {
    id: "m4",
    sender: "candidate",
    text: "I mainly use Figma for interface design and prototyping. I also have experience with Adobe XD, Photoshop, and basic frontend collaboration using HTML and CSS concepts.",
    time: "11:15 AM",
  },
  {
    id: "m5",
    sender: "employer",
    text: "Excellent. Collaboration is very important in our team because design ers work closely with developers and project managers. Have you worked in a team environment before?",
    time: "10:15 AM Seen",
  },
  {
    id: "m6",
    sender: "candidate",
    text: "Yes, definitely. In my previous role, I worked with developers and UX researchers during the entire product development process.",
    time: "11:15 AM",
  },
];

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
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c.7-4 3.2-6 7-6s6.3 2 7 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 4h7l5 5v11H7V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 4v5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({ large = false }: { large?: boolean }) {
  return (
    <span
      className={
        `relative grid shrink-0 place-items-center rounded-full border-4 border-[#00a77f] bg-[#111827] font-semibold text-[#f4b28a] shadow-inner ` +
        (large ? "h-12 w-12 text-sm" : "h-11 w-11 text-xs")
      }
    >
      BD
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#00e077]" />
    </span>
  );
}

function Header() {
  return (
    <header className="flex h-[71px] items-center justify-between border-b border-[#cfd1d8] bg-white px-6 md:px-12">
      <Link
        href="/"
        aria-label="WorkBridge home"
        className="hidden h-full w-[82px] items-center justify-center text-[#172653] md:flex"
      >
        <span className="relative h-12 w-8">
          <span className="absolute left-1/2 top-0 h-12 w-1 -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute bottom-2 left-1 h-1 w-7 rotate-[60deg] rounded-full bg-current" />
          <span className="absolute bottom-2 right-1 h-1 w-7 -rotate-[60deg] rounded-full bg-current" />
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-8">
        <Link href="/dashboard/notifications" aria-label="Notifications">
          <BellIcon className="h-5 w-5 text-black" />
        </Link>
        <Link href="/dashboard/employer/profile" aria-label="Profile">
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#273158] bg-[#111827] text-sm font-semibold text-[#f4b28a]">
            EA
          </span>
        </Link>
      </div>
    </header>
  );
}

function ConversationCard({
  conversation,
}: {
  conversation: (typeof conversations)[number];
}) {
  return (
    <button
      className={
        `grid w-full grid-cols-[56px_1fr_auto] items-center gap-3 border-b border-[#d9d9df] px-7 py-3 text-left transition ` +
        (conversation.active
          ? "border-l-4 border-l-[#00aaa8] bg-[#e7f5f4]"
          : "bg-white hover:bg-[#f7f7fb]")
      }
    >
      <Avatar />
      <div className="min-w-0">
        <h2 className="truncate text-base font-medium text-black">
          {conversation.name}
        </h2>
        <p className="truncate text-xs text-[#5e5e5e]">{conversation.role}</p>
        <p className="mt-2 truncate text-xs text-[#4a4a4a]">
          {conversation.preview}
        </p>
      </div>
      <span className="self-start whitespace-nowrap pt-1 text-xs text-[#424242]">
        {conversation.time}
      </span>
    </button>
  );
}

function MessageBubble({ message }: { message: (typeof messages)[number] }) {
  const isEmployer = message.sender === "employer";

  return (
    <div
      className={
        `flex w-full flex-col ` + (isEmployer ? "items-end" : "items-start")
      }
    >
      <div
        className={
          `flex max-w-[660px] items-end gap-3 ` +
          (isEmployer ? "flex-row-reverse" : "flex-row")
        }
      >
        {!isEmployer ? <Avatar /> : null}
        <p
          className={
            `rounded-lg px-5 py-4 text-sm leading-tight ` +
            (isEmployer ? "bg-[#172653] text-white" : "bg-[#d8d8d8] text-black")
          }
        >
          {message.text}
        </p>
      </div>
      <span
        className={
          `mt-2 text-xs text-[#3d3d3d] ` + (isEmployer ? "mr-2" : "ml-[62px]")
        }
      >
        {message.time}
      </span>
    </div>
  );
}

export function EmployerMessagesPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Header />

          <div className="grid min-h-[calc(100vh-71px)] flex-1 lg:grid-cols-[370px_1fr]">
            <aside className="flex min-h-0 flex-col border-r border-[#d9d9df] bg-white">
              <div className="px-3 py-7">
                <label className="flex h-10 items-center gap-4 rounded border border-[#c0c7c9] bg-[#dce5e7] px-8">
                  <SearchJobIcon className="h-5 w-5 shrink-0 text-[#4d5b5e]" />
                  <span className="sr-only">Search conversations</span>
                  <input
                    type="search"
                    placeholder="Search Conversations..."
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#6f7779]"
                  />
                </label>

                <div className="mt-4 flex flex-wrap gap-5 px-4">
                  {["All", "Unread", "Active", "Accepted"].map((filter) => (
                    <button
                      key={filter}
                      className={
                        `h-7 rounded-full px-5 text-xs font-medium ` +
                        (filter === "All"
                          ? "bg-black text-white"
                          : "bg-[#dfe7e9] text-black")
                      }
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <ConversationCard
                    key={conversation.id}
                    conversation={conversation}
                  />
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
              <div className="flex min-h-[66px] flex-col gap-4 border-b border-[#d9d9df] bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar large />
                  <div>
                    <h1 className="text-lg font-medium leading-tight">
                      Bonsa Daba
                    </h1>
                    <p className="text-xs text-[#666]">
                      Senior Full stack Developer
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/dashboard/employer/applications/app-1"
                    className="inline-flex h-9 w-[98px] items-center justify-center gap-2 rounded border border-[#c9c9cf] bg-white text-base font-medium text-black"
                  >
                    <ProfileIcon className="h-5 w-5 text-[#707070]" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/employer/applications/app-1"
                    className="inline-flex h-9 w-[106px] items-center justify-center gap-2 rounded bg-[#172653] text-base font-medium text-white"
                  >
                    <FileIcon className="h-4 w-4 text-[#00aaa8]" />
                    Resume
                  </Link>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-8">
                <div className="mb-4 flex justify-center">
                  <span className="rounded-full bg-[#d7e0e2] px-4 py-1 text-xs">
                    Today
                  </span>
                </div>

                <div className="space-y-5">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              </div>

              <div className="bg-[#f7f7fb] px-6 pb-4">
                <label className="mx-auto flex h-[38px] max-w-[440px] items-center gap-3 rounded-lg border border-[#c9c9cf] bg-white px-6">
                  <span className="sr-only">Type your message</span>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#9a9a9a]"
                  />
                  <button aria-label="Send message" className="text-black">
                    <SendIcon className="h-5 w-5" />
                  </button>
                </label>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
