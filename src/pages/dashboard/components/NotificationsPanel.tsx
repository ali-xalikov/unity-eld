import { TriangleAlert, Clock3, UserPlus } from "lucide-react";

interface Notification {
  id: string;
  icon: "violation" | "eld" | "driver";
  title: string;
  time: string;
}

interface NotificationsPanelProps {
  onClose: () => void;
}

const notifications: Notification[] = [
  {
    id: "n1",
    icon: "violation",
    title: "Jahari Mambwe uchun yangi violation qayd etildi",
    time: "8 daqiqa oldin",
  },
  {
    id: "n2",
    icon: "eld",
    title: "Huong Vy ELD qurilmasi uzildi",
    time: "23 daqiqa oldin",
  },
  {
    id: "n3",
    icon: "driver",
    title: "Ryan Lee smenasini yakunladi",
    time: "54 daqiqa oldin",
  },
];

function NotificationIcon({ type }: { type: Notification["icon"] }) {
  if (type === "violation")
    return <TriangleAlert size={16} className="text-red-500" />;
  if (type === "eld") return <Clock3 size={16} className="text-orange-500" />;
  return <UserPlus size={16} className="text-green-500" />;
}

export default function NotificationsPanel({
  onClose,
}: NotificationsPanelProps) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-[#1B2140]">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm font-semibold text-[#1B2140] dark:text-white">
            Bildirishnomalar
          </span>
          <span className="text-xs text-orange-500">
            {notifications.length} ta yangi
          </span>
        </div>

        <div className="space-y-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <div className="mt-0.5">
                <NotificationIcon type={n.icon} />
              </div>
              <div>
                <p className="text-sm text-[#1B2140] dark:text-gray-100">
                  {n.title}
                </p>
                <p className="text-xs text-gray-400">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
