import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

interface CardItem {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

const cards: CardItem[] = [
  {
    title: "Dashboard",
    description: "View your analytics and key metrics at a glance.",
    icon: "pi-chart-bar",
    path: "/dashboard",
    color: "#E50914",
  },
  {
    title: "Messages",
    description: "Read and reply to your latest messages.",
    icon: "pi-inbox",
    path: "/messages",
    color: "#E50914",
  },
  {
    title: "Notifications",
    description: "Stay updated with your recent notifications.",
    icon: "pi-bell",
    path: "/notifications",
    color: "#E50914",
  },
  {
    title: "Sales Report",
    description: "Track your sales performance and trends.",
    icon: "pi-chart-line",
    path: "/reports/sales",
    color: "#E50914",
  },
  {
    title: "Analytics",
    description: "Deep dive into your data and insights.",
    icon: "pi-chart-pie",
    path: "/reports/analytics",
    color: "#E50914",
  },
  {
    title: "Profile",
    description: "View and update your personal information.",
    icon: "pi-id-card",
    path: "/profile",
    color: "#E50914",
  },
  {
    title: "Settings",
    description: "Manage your app preferences and account.",
    icon: "pi-cog",
    path: "/settings",
    color: "#E50914",
  },
  {
    title: "About",
    description: "Learn more about this application.",
    icon: "pi-info-circle",
    path: "/about",
    color: "#E50914",
  },
  {
    title: "Contact",
    description: "Get in touch with our support team.",
    icon: "pi-envelope",
    path: "/contact",
    color: "#E50914",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hp">
      {/* Page Header */}
      <div className="hp__header">
        <h1 className="hp__title">Welcome back, Admin 👋</h1>
        <p className="hp__subtitle">Here's a quick overview of everything in your app.</p>
      </div>

      {/* Cards Grid */}
      <div className="hp__grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="hp__card"
            onClick={() => navigate(card.path)}
            style={{ "--card-color": card.color } as React.CSSProperties}
          >
            <div className="hp__card-icon">
              <i className={`pi ${card.icon}`} />
            </div>
            <div className="hp__card-body">
              <h3 className="hp__card-title">{card.title}</h3>
              <p className="hp__card-desc">{card.description}</p>
            </div>
            <i className="pi pi-arrow-right hp__card-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
