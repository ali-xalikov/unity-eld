import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../ProtectedRoute";
import { BrowserRouter } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter basename="/unity-eld/">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 sahifa (ixtiyoriy) */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center text-2xl">
              404 - Sahifa topilmadi
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
