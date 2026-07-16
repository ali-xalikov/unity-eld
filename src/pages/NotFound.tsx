import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0F1419] dark:to-[#12162C]">
      <div className="flex flex-col items-center justify-center space-y-8 text-center px-4">
        {/* 404 Text */}
        <div className="space-y-4">
          <div className="text-9xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Sahifa topilmadi
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Kechirasiz, siz izlayotgan sahifa mavjud emas yoki o'chirilgan.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-[#1B2140] text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#222847] font-semibold transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={20} />
            Orqaga qaytish
          </button>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            <Home size={20} />
            Asosiy sahifaga o'tish
          </button>

          {/* Dashboard Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            📊 Dashboard
          </button>
        </div>

        {/* Illustration */}
        <div className="mt-16 text-6xl opacity-20">
          🔍
        </div>
      </div>
    </div>
  );
}
