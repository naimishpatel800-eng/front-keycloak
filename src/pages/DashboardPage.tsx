import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import keycloak from "../KeycloakService";
import "./DashboardPage.css";

interface CountryData {
  country: string;
  flag: string;
  views: number;
  change: number;
}

const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;

const DashboardPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (keycloak.tokenParsed) {
      const p = keycloak.tokenParsed as any;
      setUsername(p.preferred_username || "Admin");
    }

    fetch("http://localhost:8080/api/countries", {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        setCountryData(data.data ? data.data : data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  const barData = {
    labels: countryData.map((c) => `${c.flag} ${c.country}`),
    datasets: [
      {
        label: "Views",
        data: countryData.map((c) => c.views),
        backgroundColor: countryData.map((c) =>
          c.change >= 0
            ? "rgba(202, 218, 217, 0.85)"
            : "rgba(229,9,20,0.85)"
        ),
        borderRadius: 6,
      },
    ],
  };

  if (loading) {
    return <div className="dp">Loading...</div>;
  }

  if (error) {
    return <div className="dp">{error}</div>;
  }

  return (
    <div className="dp">
      {/* Header */}
      <div className="dp__header">
        <h1 className="dp__title">Netflix Views by Country</h1>
        <p className="dp__subtitle">
          Welcome back, <span>{username}</span>
        </p>
      </div>
      <div className="dp__grid-main">
        {/* Country List */}
        <div className="dp__card">
          <div className="dp__label">All Countries</div>
          <div className="dp__country-list">
            {countryData.map((c, i) => (
              <div key={c.country} className="dp__country-row">
                <span className="dp__rank">{i + 1}</span>
                <span className="dp__flag">{c.flag}</span>
                <span className="dp__country-name">{c.country}</span>
                <span className="dp__views">{fmt(c.views)}</span>
                <span
                  className={`dp__change ${
                    c.change >= 0
                      ? "dp__change--up"
                      : "dp__change--down"
                  }`}
                >
                  <i
                    className={`pi ${
                      c.change >= 0
                        ? "pi-arrow-up"
                        : "pi-arrow-down"
                    }`}
                  />
                  {Math.abs(c.change)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="dp__card">
          <div className="dp__label">Views by Country</div>
          <div className="dp__chart--bar">
            <Chart type="bar" data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;