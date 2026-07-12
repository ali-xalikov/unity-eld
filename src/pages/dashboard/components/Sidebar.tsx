import { toast } from "sonner";
import { type ReactElement } from "react";
import {
  ChevronsLeft,
  LayoutDashboard,
  Building2,
  Clock3,
  TriangleAlert,
  Users,
} from "lucide-react";
import logo from "../../../../public/assets/images/Logo_white.svg";

interface NavItem {
  title: string;
  icon: ReactElement;
  badge?: string | number;
  active?: boolean;
}
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const starItems: NavItem[] = [
  { title: "Dashboard", icon: <LayoutDashboard size={18} />, badge: "new 16" },
  { title: "Company", icon: <Building2 size={18} />, badge: 67, active: true },
];

const menuItems: NavItem[] = [
  { title: "ELD", icon: <Clock3 size={18} /> },
  { title: "Reports", icon: <TriangleAlert size={18} /> },
  { title: "Users", icon: <Users size={18} /> },
];

function NavRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <div
      onClick={() => {
        if (!item.active) toast("Bu sahifa hali ishlab chiqilmoqda");
      }}
      className={`group flex cursor-pointer items-center gap-3.5 rounded-2xl px-5 py-3.5 transition-all ${
        item.active
          ? "bg-white text-[#1B2140] shadow-sm"
          : "hover:bg-[#323a68] text-white/90 hover:text-white"
      } ${collapsed ? "justify-center px-3" : ""}`}
    >
      {/* Icon rangi active holatga moslashtirildi */}
      <div
        className={`transition-colors ${
          item.active
            ? "text-[#1B2140]"
            : "text-white/80 group-hover:text-white"
        }`}
      >
        {item.icon}
      </div>

      {!collapsed && (
        <>
          <span className="text-[15px] font-medium flex-1">{item.title}</span>
          {item.badge && (
            <div
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                item.active
                  ? "bg-orange-100 text-orange-600"
                  : "bg-white/20 text-white"
              }`}
            >
              {item.badge}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function UserCard({ collapsed }: { collapsed: boolean }) {
  const email =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).email
      : "user@example.com";

  return (
    <div className="mt-auto p-4 border-t border-white/10">
      <div
        className={`flex items-center gap-3 rounded-2xl bg-[#2A3158] hover:bg-[#323a68] transition-colors ${
          collapsed ? "justify-center" : "p-3"
        }`}
      >
        <img
          src="https://i.pravatar.cc/100"
          className={` rounded-2xl object-cover ring-2 ring-white/20 ${
            collapsed ? "w-5 h-5" : "h-10 w-10"
          }`}
          alt="user"
        />
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="text-sm font-semibold text-white">
              Jonibek Muradov
            </h2>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#1B2140] text-white flex flex-col z-50 border-r border-white/10 transition-all duration-300 ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      <div
        className={`flex h-16 items-center justify-between border-b border-white/10 px-4`}
      >
        {!collapsed && <img className="w-36" src={logo} alt="Unity ELD" />}
        <ChevronsLeft
          size={20}
          className={`cursor-pointer text-gray-400 hover:text-white transition-all ${
            collapsed ? "rotate-180" : ""
          }`}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <div className="mt-6 px-3 space-y-1">
        {starItems.map((item) => (
          <NavRow key={item.title} item={item} collapsed={collapsed} />
        ))}
      </div>

      <div className="mt-8 px-3">
        {!collapsed && (
          <h3 className="text-xs uppercase tracking-widest text-gray-400 px-5 mb-3">
            Menu
          </h3>
        )}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavRow key={item.title} item={item} collapsed={collapsed} />
          ))}
        </div>
      </div>

      <UserCard collapsed={collapsed} />
    </aside>
  );
}
