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
    return <TriangleAlert size={18} className="text-red-500 mt-0.5" />;
  if (type === "eld")
    return <Clock3 size={18} className="text-orange-500 mt-0.5" />;
  return <UserPlus size={18} className="text-green-500 mt-0.5" />;
}

export default function NotificationsPanel({
  onClose,
}: NotificationsPanelProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute right-6 top-20 z-50 w-96 rounded-3xl border border-gray-100 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#1B2140]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 px-1">
          <span className="text-lg font-semibold text-[#1B2140] dark:text-white">
            Bildirishnomalar
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 rounded-full">
            {notifications.length} ta yangi
          </span>
        </div>

        {/* Notifications List */}
        <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-4 rounded-2xl px-4 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-all group"
            >
              <div className="mt-1">
                <NotificationIcon type={n.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1B2140] dark:text-gray-100 leading-snug">
                  {n.title}
                </p>
                <p className="text-xs text-gray-400 mt-1.5 group-hover:text-gray-500 transition-colors">
                  {n.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="text-center text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          Barcha bildirishnomalarni ko'rish
        </div>
      </div>
    </>
  );
}
