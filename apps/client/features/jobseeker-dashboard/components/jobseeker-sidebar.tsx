"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  CreditCardIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export function JobseekerSidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: '/dashboard/jobseeker',
      label: 'Dashboard',
      icon: HomeIcon,
      isActive: (p: string) => p === '/dashboard' || p === '/dashboard/jobseeker',
    },
    {
      href: '/dashboard/jobs',
      label: 'Find Jobs',
      icon: BriefcaseIcon,
      isActive: (p: string) => p.startsWith('/dashboard/jobs') || p.startsWith('/dashboard/find-jobs'),
    },
    {
      href: '/dashboard/messages',
      label: 'Messages',
      icon: ChatBubbleLeftIcon,
      isActive: (p: string) => p.startsWith('/dashboard/messages') || p.startsWith('/dashboard/chat'),
    },
    {
      href: '/dashboard/payments',
      label: 'Payments',
      icon: CreditCardIcon,
      isActive: (p: string) => p.startsWith('/dashboard/payments'),
    },
    {
      href: '/dashboard/profile',
      label: 'Profile',
      icon: UserIcon,
      isActive: (p: string) => p.startsWith('/dashboard/profile'),
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      icon: Cog6ToothIcon,
      isActive: (p: string) => p.startsWith('/dashboard/settings'),
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col shrink-0">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/dashboard/jobseeker" className="text-xl font-black text-[#14214a] tracking-tight flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
            W
          </span>
          WorkBridge
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isItemActive = link.isActive(pathname);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isItemActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isItemActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
