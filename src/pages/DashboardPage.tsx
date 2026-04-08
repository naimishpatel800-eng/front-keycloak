// // src/Dashboard/DashboardPage.tsx
// import React from "react";

// interface DashboardPageProps {
//   token?: string; // token is optional
// }

// const DashboardPage: React.FC<DashboardPageProps> = ({ token }) => {
//   const callApi = async () => {
//     if (!token) {
//       alert("No token available");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/hello", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.text();
//       alert(data);
//     } catch (err) {
//       console.error("[Dashboard] API call error:", err);
//       alert("API call failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <button onClick={callApi}>Call /hello API</button>
//     </div>
//   );
// };

// export default DashboardPage;




// import React from "react";

// interface DashboardPageProps {
//   token?: string; // optional token
// }

// const DashboardPage: React.FC<DashboardPageProps> = ({ token }) => {
//   // Call your backend API
//   const callApi = async () => {
//     if (!token) {
//       alert("No token available. Please login.");
//       return;
//     }

//     console.log("[Dashboard] Using token:", token); // print token in console

//     try {
//       const response = await fetch("http://localhost:8080/api/hello", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         console.error("[Dashboard] API call failed:", response.status, response.statusText);
//         alert("API call failed with status " + response.status);
//         return;
//       }

//       const data = await response.text();
//       console.log("[Dashboard] API response:", data);
//       alert(data);
//     } catch (err) {
//       console.error("[Dashboard] API call error:", err);
//       alert("API call failed due to network error");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Dashboard</h2>
//       {token && (
//         <div style={{ marginBottom: "10px", wordBreak: "break-all" }}>
//           <strong>Token:</strong> {token}
//         </div>
//       )}
//       <button onClick={callApi}>Call /hello API</button>
//     </div>
//   );
// };

// export default DashboardPage;


import React, { useState, useEffect } from "react";
import keycloak from "../KeycloakService";

const DashboardPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (keycloak.tokenParsed) {
      const parsed = keycloak.tokenParsed as any;
      setUsername(parsed.preferred_username || "Unknown");
      setEmail(parsed.email || "");
     
    }
  }, []);

  const handleApiCall = async () => {
    try {
      const refreshed = await keycloak.updateToken(30);
      console.log(
        "[Dashboard] Token",
        refreshed ? "refreshed" : "still valid",
        keycloak.token
      );

      if (!keycloak.token) {
        alert("No token available. Please login.");
        return;
      }

      const response = await fetch("http://localhost:8080/api/hello", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      if (!response.ok) {
        alert(`API call failed with status ${response.status}`);
        return;
      }

      const data = await response.text();
      console.log("[Dashboard] API response:", data);
      alert(data);
    } catch (err) {
      console.error(err);
      alert("API call failed due to network error");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Username: <strong>{username}</strong></p>
      <p>Email: <strong>{email}</strong></p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={handleApiCall}>Call /hello API</button>
    
      </div>
    </div>
  );
};

export default DashboardPage;