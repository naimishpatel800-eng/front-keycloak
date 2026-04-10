import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import keycloak from "./KeycloakService";

// Pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import SalesReportPage from "./pages/SalesReportPage";
import AnalyticsPage from "./pages/AnalyticsPage";

// Sidebar
import Sidebar from "./components/Sidebar";
import "./App.css";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "login-required",
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then(auth => {
        setAuthenticated(auth);
        setLoading(false);
      })
      .catch(err => {
        console.error("Keycloak init error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Keycloak...</div>;
  if (!authenticated) return <div>Redirecting to login...</div>;

  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/reports/sales" element={<SalesReportPage />} />
            <Route path="/reports/analytics" element={<AnalyticsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
