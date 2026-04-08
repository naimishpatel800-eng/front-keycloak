// Sidebar.tsx
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from "react-router-dom";
import keycloak from "../KeycloakService";
import { useState } from "react";
import "./Sidebar.css";
import type { MenuItem } from "primereact/menuitem";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // Menu items
  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-home", command: () => navigate("/home") },
    { label: "Dashboard", icon: "pi pi-chart-bar", command: () => navigate("/dashboard") },
    {
      label: "User",
      icon: "pi pi-user",
      items: [
        { label: "Profile", icon: "pi pi-id-card", command: () => navigate("/profile") },
        { label: "Settings", icon: "pi pi-cog", command: () => alert("Settings clicked") },
      ],
    },
    { label: "About", icon: "pi pi-info-circle", command: () => navigate("/about") },
    { label: "Contact", icon: "pi pi-envelope", command: () => navigate("/contact") },
  ];

  // Collapse effect: hide all labels and add tooltips
  const renderItems = items.map((item: MenuItem) => ({
    ...item,
    label: collapsed ? "" : item.label,
    title: item.label, // tooltip when collapsed
    items: item.items?.map((sub: MenuItem) => ({
      ...sub,
      label: collapsed ? "" : sub.label,
      title: sub.label,
    })),
  }));

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        {/* Collapse button */}
        <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "⬅️"} {!collapsed && "Collapse"}
        </button>

        {/* App title */}
        {!collapsed && <h2 className="sidebar-title">MyApp</h2>}

        {/* PanelMenu */}
        <PanelMenu model={renderItems} className="p-panelmenu-custom" />
      </div>

      {/* Logout button */}
      <button className="sidebar-logout" onClick={() => keycloak.logout()} title="Logout">
        {collapsed ? "🚪" : "Logout"}
      </button>
    </div>
  );
};

export default Sidebar;