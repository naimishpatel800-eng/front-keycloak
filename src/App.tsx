// import './App.css';
// import Registration from './registration/Registration';
// import Login from './login/Login';
// import DashboardPage from './Dashboard/DashboardPage';

// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
// import React, { useState } from 'react';


// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import ForgotPassword from './forgotPassword/ForgotPassword';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route
//           path="/login"
//           element={
//             <>
//               <Login />
//               <div className="mt-3 text-center">
//                 <span>Don't have an account? </span>
//                 <Link to="/register">Register Here</Link>
//               </div>
//             </>
//           }
//         />

//         <Route
//           path="/register"
//           element={
//             <>
//               <Registration />
//               <div className="mt-3 text-center">
//                 <span>Already have an account? </span>
//                 <Link to="/login">Login Here</Link>
//               </div>
//             </>
//           }
//         />

//         {/* Dashboard Page */}
//         <Route path="/dashboard" element={<DashboardPage />} />
//         <Route
//   path="/forgot-password"
//   element={<ForgotPassword />}
// />
//       </Routes>
//     </Router>
//   );
// // const [data,setData]=useState("");
// // const handel=()=>{
// // setData("naimish")
// // }
// // return (<div>
// //   <p>hello test</p>
// //   <input type="text" placeholder='pelse enter name' />
// //   <button onClick={handel}>update</button>
// //   <h1>{data}</h1>
// //   <button title='click'>hello-2</button>
// //   <button>hello-1</button>
// // </div>);

// }

// export default App;




// // src/App.tsx
// // src/App.tsx
// // src/App.tsx
  // import './App.css';
  // import Registration from './registration/Registration';
  // import Login from './login/Login';
  // import DashboardPage from './Dashboard/DashboardPage';
  // import ForgotPassword from './forgotPassword/ForgotPassword';

  // import 'primereact/resources/themes/lara-light-blue/theme.css';
  // import 'primereact/resources/primereact.min.css';
  // import 'primeicons/primeicons.css';
  // import 'primeflex/primeflex.css';

  // import React, { useState } from 'react';
  // import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
  // import { getToken, logout } from "./KeycloakService";

  // function App() {
  //   const [authenticated, setAuthenticated] = useState<boolean>(!!getToken());

  //   const handleApiCall = async () => {
  //     const token = getToken();
  //     if (!token) {
  //       alert("No token available. Please login first.");
  //       return;
  //     }

  //     try {
  //       const res = await fetch("http://localhost:8080/api/hello", {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (!res.ok) {
  //         console.error("[API] Call failed with status:", res.status);
  //         return alert("API call failed");
  //       }

  //       const data = await res.text();
  //       console.log("[API] Response:", data);
  //       alert(data);
  //     } catch (err) {
  //       console.error("[API] Error:", err);
  //       alert("API call failed");
  //     }
  //   };

  //   return (
  //     <Router>
  //       <div>
  //         {authenticated && (
  //           <div className="text-right m-2">
  //             <button
  //               onClick={() => {
  //                 logout();
  //                 setAuthenticated(false);
  //               }}
  //             >
  //               Logout
  //             </button>
  //           </div>
  //         )}

  //         <Routes>
  //           <Route path="/" element={<Navigate to="/login" replace />} />

  //           <Route
  //             path="/login"
  //             element={<Login setAuthenticated={setAuthenticated} />}
  //           />

  //           <Route
  //             path="/register"
  //             element={
  //               <>
  //                 <Registration />
  //                 <div className="mt-3 text-center">
  //                   <span>Already have an account? </span>
  //                   <Link to="/login">Login Here</Link>
  //                 </div>
  //               </>
  //             }
  //           />

  //           <Route
  //             path="/dashboard"
  //             element={
  //               authenticated ? (
  //                 <div>
  //                   <DashboardPage token={getToken() ?? undefined} />
  //                   <button onClick={handleApiCall}>Call API</button>
  //                 </div>
  //               ) : (
  //                 <Navigate to="/login" replace />
  //               )
  //             }
  //           />

  //           <Route path="/forgot-password" element={<ForgotPassword />} />
  //         </Routes>
  //       </div>
  //     </Router>
  //   );
  // }


  // export default App;


  
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import keycloak from "./KeycloakService";
import DashboardPage from "./Dashboard/DashboardPage";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "login-required", // forces login and shows Keycloak login page
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then(auth => {
        setAuthenticated(auth);
        setLoading(false);
        if (auth) {
          console.log("Authenticated:", auth, "Token:", keycloak.token);
        }
      })
      .catch(err => {
        console.error("Keycloak init error:", err);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    keycloak.logout();
  };

  if (loading) {
    return <div>Loading Keycloak...</div>;
  }

  if (!authenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <Router>
      <div style={{ padding: "10px" }}>
        <button onClick={logout} style={{ marginBottom: "20px" }}>
          Logout
        </button>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;