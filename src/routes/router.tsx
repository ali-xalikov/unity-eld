import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Logs from "../pages/dashboard/Logs";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../ProtectedRoute";
import { HashRouter } from "react-router-dom";

export default function Router() {
  return (
    <HashRouter>
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

        <Route
          path="/dashboard/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />

        {/* 404 sahifa */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
