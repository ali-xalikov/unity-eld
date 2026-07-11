import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { Driver, EldStatus, ViolationType } from "../types/driver";

interface AddDriverModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (driver: Driver) => void;
}

const emptyForm = {
  name: "",
  company: "Unity Eld Llc",
  date: "",
  eld: "Connected" as EldStatus,
  violation: "" as ViolationType,
  cycle: "",
};

export default function AddDriverModal({
  open,
  onClose,
  onAdd,
}: AddDriverModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name.trim() || !form.date.trim() || !form.cycle.trim()) {
      setError("Name, date va cycle maydonlarini to'ldiring");
      return;
    }

    const driver: Driver = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      violation: form.violation,
      date: form.date,
      eld: form.eld,
      cycle: form.cycle,
      company: form.company.trim() || "Unity Eld Llc",
      updated: "just now",
    };

    onAdd(driver);
    toast(`${driver.name} muvaffaqiyatli qo'shildi`);
    setForm(emptyForm);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-2xl bg-white dark:bg-[#1B2140] p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1B2140] dark:text-white">
            Yangi haydovchi qo'shish
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 dark:text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-gray-400 dark:text-gray-500">
              Driver name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-11 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 text-sm text-[#1B2140] dark:text-white outline-none focus:border-orange-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-400 dark:text-gray-500">
              Company
            </label>
            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="h-11 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 text-sm text-[#1B2140] dark:text-white outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-400 dark:text-gray-500">
                Date
              </label>
              <input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="July 11, 2026"
                className="h-11 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 text-sm text-[#1B2140] dark:text-white outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400 dark:text-gray-500">
                Cycle
              </label>
              <input
                value={form.cycle}
                onChange={(e) => setForm({ ...form, cycle: e.target.value })}
                placeholder="4:30"
                className="h-11 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 text-sm text-[#1B2140] dark:text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-400 dark:text-gray-500">
                Eld connection
              </label>
              <select
                value={form.eld}
                onChange={(e) =>
                  setForm({ ...form, eld: e.target.value as EldStatus })
                }
                className="h-11 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 text-sm text-[#1B2140] dark:text-white outline-none"
              >
                <option value="Connected">Connected</option>
                <option value="Not connected">Not connected</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400 dark:text-gray-500">
                Violation
              </label>
              <select
                value={form.violation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    violation: e.target.value as ViolationType,
                  })
                }
                className="h-11 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 text-sm text-[#1B2140] dark:text-white outline-none"
              >
                <option value="">None</option>
                <option value="Violation">Violation</option>
                <option value="Form & Signature">Form & Signature</option>
              </select>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
