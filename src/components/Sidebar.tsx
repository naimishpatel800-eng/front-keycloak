import { useNavigate, useLocation } from "react-router-dom";
import keycloak from "../KeycloakService";
import { useState } from "react";
import "./Sidebar.css";
import logo from "../logo/logo.svg";

interface NavItem {
  label: string;
  icon: string;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Home",          icon: "pi-home",         path: "/home" },
  { label: "Dashboard",     icon: "pi-chart-bar",    path: "/dashboard" },
  { label: "Messages",      icon: "pi-inbox",        path: "/messages" },
  { label: "Notifications", icon: "pi-bell",         path: "/notifications" },
  {
    label: "Reports", icon: "pi-file-pdf",
    children: [
      { label: "Sales",     icon: "pi-chart-line",   path: "/reports/sales" },
      { label: "Analytics", icon: "pi-chart-pie",    path: "/reports/analytics" },
    ],
  },
  {
    label: "User", icon: "pi-users",
    children: [
      { label: "Profile",  icon: "pi-id-card",      path: "/profile" },
      { label: "Settings", icon: "pi-cog",          path: "/settings" },
    ],
  },
  { label: "About",    icon: "pi-info-circle",  path: "/about" },
  { label: "Contact",  icon: "pi-envelope",     path: "/contact" },
];

const Sidebar: React.FC = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const isActive = (path?: string) => !!path && location.pathname === path;

  const toggleGroup = (label: string) =>
    setOpenGroup((prev) => (prev === label ? null : label));

  return (
    <aside className={`sb ${collapsed ? "sb--collapsed" : ""}`}>

      {/* ── HEADER ── */}
      <div className="sb__header">
        <div className="sb__brand">
          <img src={logo} alt="logo" className="sb__logo" />
          {!collapsed && <span className="sb__app-name">MyApp</span>}
        </div>

        <button
          className="sb__collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle sidebar"
        >
          <i className={`pi ${collapsed ? "pi-chevron-right" : "pi-chevron-left"}`} />
        </button>
      </div>

      {/* ── USER CARD ── */}
      {!collapsed && (
        <div className="sb__user">
          <div className="sb__avatar">
            <i className="pi pi-user" />
          </div>
          <div className="sb__user-info">
            <span className="sb__user-name">Admin User</span>
            <span className="sb__user-role">Administrator</span>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="sb__avatar sb__avatar--center">
          <i className="pi pi-user" />
        </div>
      )}

      <div className="sb__divider" />

      {/* ── NAV ── */}
      <nav className="sb__nav">
        {navItems.map((item) =>
          item.children ? (
            <div key={item.label} className="sb__group">
              <button
                className={`sb__item sb__item--group ${openGroup === item.label ? "sb__item--open" : ""}`}
                onClick={() => !collapsed && toggleGroup(item.label)}
                title={collapsed ? item.label : undefined}
              >
                <i className={`pi ${item.icon} sb__icon`} />
                {!collapsed && (
                  <>
                    <span className="sb__label">{item.label}</span>
                    <i className={`pi pi-chevron-down sb__arrow ${openGroup === item.label ? "sb__arrow--up" : ""}`} />
                  </>
                )}
              </button>

              {!collapsed && openGroup === item.label && (
                <div className="sb__children">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      className={`sb__item sb__item--child ${isActive(child.path) ? "sb__item--active" : ""}`}
                      onClick={() => child.path && navigate(child.path)}
                    >
                      <i className={`pi ${child.icon} sb__icon`} />
                      <span className="sb__label">{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              key={item.label}
              className={`sb__item ${isActive(item.path) ? "sb__item--active" : ""}`}
              onClick={() => item.path && navigate(item.path)}
              title={collapsed ? item.label : undefined}
            >
              <i className={`pi ${item.icon} sb__icon`} />
              {!collapsed && <span className="sb__label">{item.label}</span>}
            </button>
          )
        )}
      </nav>

      {/* ── FOOTER ── */}
      <div className="sb__footer">
        <div className="sb__divider" />
        <button
          className="sb__item c"
          onClick={() => keycloak.logout()}
          title="Logout"
        >
          <i className="pi pi-sign-out sb__icon" />
          {!collapsed && <span className="sb__label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
