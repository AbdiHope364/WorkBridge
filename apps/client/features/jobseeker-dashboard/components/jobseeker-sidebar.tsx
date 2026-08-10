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
    { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { href: '/dashboard/jobs', label: 'Jobs', icon: BriefcaseIcon },
    { href: '/dashboard/chat', label: 'Messages', icon: ChatBubbleLeftIcon },
    { href: '/dashboard/payments', label: 'Payments', icon: CreditCardIcon },
    { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
    { href: '/dashboard/settings', label: 'Settings', icon: Cog6ToothIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#14214a]">WorkBridge</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
