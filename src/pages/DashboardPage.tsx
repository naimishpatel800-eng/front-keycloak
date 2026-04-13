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

const countryData: CountryData[] = [
  { country: "United States", flag: "🇺🇸", views: 48200, change: 12.4  },
  { country: "India",         flag: "🇮🇳", views: 36100, change: 18.7  },
  { country: "Brazil",        flag: "🇧🇷", views: 21400, change: -4.2  },
  { country: "Germany",       flag: "🇩🇪", views: 18900, change: 6.1   },
  { country: "Japan",         flag: "🇯🇵", views: 15700, change: -2.8  },
  { country: "UK",            flag: "🇬🇧", views: 14300, change: 9.3   },
  { country: "France",        flag: "🇫🇷", views: 12800, change: 3.5   },
  { country: "Canada",        flag: "🇨🇦", views: 11200, change: -1.4  },
  { country: "Australia",     flag: "🇦🇺", views: 9800,  change: 7.8   },
  { country: "South Korea",   flag: "🇰🇷", views: 8600,  change: 14.2  },
  { country: "Mexico",        flag: "🇲🇽", views: 7900,  change: -3.1  },
  { country: "Italy",         flag: "🇮🇹", views: 7400,  change: 5.6   },
  { country: "Spain",         flag: "🇪🇸", views: 6800,  change: 2.9   },
  { country: "Netherlands",   flag: "🇳🇱", views: 6200,  change: -0.8  },
  { country: "Turkey",        flag: "🇹🇷", views: 5900,  change: 11.3  },
  { country: "Indonesia",     flag: "🇮🇩", views: 5400,  change: 16.5  },
  { country: "Argentina",     flag: "🇦🇷", views: 4800,  change: -5.7  },
  { country: "Poland",        flag: "🇵🇱", views: 4300,  change: 4.2   },
  { country: "Sweden",        flag: "🇸🇪", views: 3900,  change: 1.8   },
  { country: "Nigeria",       flag: "🇳🇬", views: 3500,  change: 22.4  },
  { country: "Russia",        flag: "🇷🇺", views: 3100,  change: -6.9  },
  { country: "Saudi Arabia",  flag: "🇸🇦", views: 2700,  change: 9.1   },
  { country: "Switzerland",   flag: "🇨🇭", views: 2400,  change: 3.3   },
  
]; 

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;

const DashboardPage: React.FC = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (keycloak.tokenParsed) {
      const p = keycloak.tokenParsed as any;
      setUsername(p.preferred_username || "Admin");
    }
  }, []);

  const barData = {
    labels: countryData.map((c) => `${c.flag} ${c.country}`),
    datasets: [{
      label: "Views",
      data: countryData.map((c) => c.views),
      backgroundColor: countryData.map((c) =>
        c.change >= 0 ? "rgba(202, 218, 208, 0.85)" : "rgba(229,9,20,0.85)"
      ),
      borderRadius: 6,
    }],
  };

  // const barOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: { legend: { display: false } },
  //   scales: {
  //     x: { ticks: { color: "#999", font: { size: 11 } }, grid: { color: "#2a2a2a" } },
  //     y: { ticks: { color: "#999" },                     grid: { color: "#2a2a2a" } },
  //   },
  // };

  return (
    <div className="dp">

      {/* Header */}
      <div className="dp__header">
        <h1 className="dp__title">Netflix Views by Country</h1>
        <p className="dp__subtitle">Welcome back, <span>{username}</span></p>
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
                <span className={`dp__change ${c.change >= 0 ? "dp__change--up" : "dp__change--down"}`}>
                  <i className={`pi ${c.change >= 0 ? "pi-arrow-up" : "pi-arrow-down"}`} />
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
            <Chart type="bar" data={barData}  />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
