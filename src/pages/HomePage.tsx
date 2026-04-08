import React from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const infoData = [
    {
      title: "Welcome",
      description: "Welcome to the app dashboard",
      icon: "pi pi-smile",
      path: "/dashboard",
    },
    {
      title: "Profile Info",
      description: "You can edit your profile here",
      icon: "pi pi-user",
      path: "/profile",
    },
    {
      title: "Statistics",
      description: "Check your app stats",
      icon: "pi pi-chart-bar",
      path: "/dashboard",
    },
    {
      title: "Settings",
      description: "Manage your preferences",
      icon: "pi pi-cog",
      path: "/profile",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "flex-start",
      }}
    >
      {infoData.map((item, index) => (
        <Card
          key={index}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <i className={item.icon} style={{ fontSize: "1.5rem" }}></i>
              <span>{item.title}</span>
            </div>
          }
          style={{
            width: "250px",
            flex: "1 1 200px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => navigate(item.path)}
          className="hover-card"
        >
          <p>{item.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;