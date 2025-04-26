'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const groups: { title: string; links: { href: string; label: string; icon: string }[] }[] = [
  {
    title: 'Home',
    links: [
      { href: '/home', label: 'Home', icon: '/svg/sidebarIcon/home.svg' },
      { href: '/home/dashboard', label: 'Dashboard', icon: '/svg/sidebarIcon/dashboard.svg' },
    ],
  },
  {
    title: 'Morning',
    links: [
      { href: '/morning/ranking', label: 'ランキング', icon: '/svg/sidebarIcon/ranking.svg' },
      { href: '/morning/weekend', label: '今週の朝活状況', icon: '/svg/sidebarIcon/week.svg' },
      { href: '/morning/month', label: '今月の朝活状況', icon: '/svg/sidebarIcon/month.svg' },
    ],
  },
  {
    title: 'Knowledge',
    links: [
      { href: '/knowledge/tech', label: 'テクノロジー', icon: '/svg/sidebarIcon/analysis.svg' },
      { href: '/knowledge/leadership', label: 'リーダーシップ', icon: '/svg/sidebarIcon/analysis.svg' },
      { href: '/knowledge/management', label: 'マネジメント', icon: '/svg/sidebarIcon/analysis.svg' },
    ],
  },
  {
    title: 'Information',
    links: [{ href: '/information/events', label: 'イベント情報', icon: '/svg/sidebarIcon/externalEvents.svg' }],
  },
  {
    title: 'Member',
    links: [{ href: '/members', label: 'GhoonaCamper', icon: '/svg/sidebarIcon/analysis.svg' }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full h-screen bg-[#5D6B80] text-white">
      <div className="flex items-center gap-2 h-[75px] px-4 border-b border-[#374559]">
        <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-[30px] h-[30px]" />
        <span className="font-bold">Ghoona Camp</span>
      </div>

      <nav>
        {groups.map((g) => (
          <div key={g.title} className="border-b border-[#374559] px-[20px] py-4">
            <p className="text-base font-semibold mb-2">
              {g.title}
            </p>
            {g.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'flex items-center gap-3 p-2 rounded-lg text-sm',
                  pathname === l.href
                    ? 'bg-primary text-white'
                    : 'hover:bg-slate-600'
                )}
              >
                <img src={l.icon} alt={l.label} className="w-[20px] h-[20px]" />
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
