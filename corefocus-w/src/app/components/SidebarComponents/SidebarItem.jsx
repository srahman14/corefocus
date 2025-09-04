import Link from "next/link";

export function SidebarItem({ href, icon, label, collapsed, lucideIcon: LucideIcon }) {
  return (
    <Link href={href}>
      <div className="w-full flex items-center text-[#000] dark:text-[#520dd0] px-4 py-3 hover:text-[#520dd0]/70 transition cursor-pointer group">
        {/* Render either FontAwesome icon or Lucide icon */}
        {LucideIcon ? (
          <LucideIcon className="w-5 h-5" />
        ) : (
          <i className={`fa-solid ${icon} text-lg`} />
        )}

        {!collapsed && <span className="ml-3 font-bold">{label}</span>}
      </div>
    </Link>
  );
}
