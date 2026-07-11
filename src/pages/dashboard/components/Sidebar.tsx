import { toast } from "sonner";
import type { ReactElement } from "react";
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

const starItems: NavItem[] = [
  { title: "Dashboard", icon: <LayoutDashboard size={18} />, badge: "new 16" },
  { title: "Company", icon: <Building2 size={18} />, badge: 67, active: true },
];

const menuItems: NavItem[] = [
  { title: "ELD", icon: <Clock3 size={18} /> },
  { title: "Reports", icon: <TriangleAlert size={18} /> },
  { title: "Users", icon: <Users size={18} /> },
];

function NavRow({ item }: { item: NavItem }) {
  return (
    <div
      onClick={() => {
        if (!item.active) toast("Bu sahifa hali ishlab chiqilmoqda");
      }}
      className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition ${
        item.active
          ? "bg-white text-[#1B2140]"
          : "bg-[#2A3158] hover:bg-[#323a68]"
      }`}
    >
      <div className="flex items-center gap-3">
        {item.icon}
        <span className="text-sm font-medium">{item.title}</span>
      </div>
      {item.badge && (
        <div
          className={`rounded px-2 py-0.5 text-xs font-medium ${
            item.active ? "text-[#1B2140]" : "text-white"
          }`}
        >
          {item.badge}
        </div>
      )}
    </div>
  );
}

function UserCard() {
  const email =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).email
      : "user@example.com";

  return (
    <div className="p-4 absolute bottom-0 w-full">
      <div className="flex items-center gap-3 rounded-xl bg-[#2A3158] p-3">
        <img
          src="https://i.pravatar.cc/100"
          className="h-10 w-10 rounded-full"
          alt="user"
        />
        <div className="overflow-hidden">
          <h2 className="text-sm font-semibold">Jonibek Muradov</h2>
          <p className="text-xs text-gray-400 truncate">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-62.5 bg-[#1B2140] text-white flex flex-col relative">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <img className="w-29" src={logo} alt="logo" />
        <ChevronsLeft size={18} className="cursor-pointer text-gray-400" />
      </div>

      <div className="mt-6 space-y-2 px-3">
        {starItems.map((item) => (
          <NavRow key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-light px-4 text-gray-400 mb-2">Menu</h3>
        <div className="px-3 space-y-2">
          {menuItems.map((item) => (
            <NavRow key={item.title} item={item} />
          ))}
        </div>
      </div>

      <UserCard />
    </aside>
  );
}
