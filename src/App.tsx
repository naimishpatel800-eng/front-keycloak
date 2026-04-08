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
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import keycloak from "./KeycloakService";

// Pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Sidebar
import Sidebar from "./components/Sidebar";

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
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;