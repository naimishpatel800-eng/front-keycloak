// // src/KeycloakService.ts

// const TOKEN_KEY = "access_token";
// const EXPIRATION_KEY = "token_expiration"; // store token expiration timestamp

// let token: string | null = localStorage.getItem(TOKEN_KEY);
// let expiration: number | null = localStorage.getItem(EXPIRATION_KEY)
//   ? parseInt(localStorage.getItem(EXPIRATION_KEY) as string)  
//   : null;

// export const getToken = (): string | null => {
//   // If token has expired, return null
//   if (token && expiration && Date.now() > expiration) {
//     logout(); // If token is expired, log out
//     return null;
//   }
//   return token; // Return stored token
// };

// export const setToken = (newToken: string, expiresIn: number) => {
//   token = newToken;
//   expiration = Date.now() + expiresIn * 1000; // set token expiration time in milliseconds
//   localStorage.setItem(TOKEN_KEY, newToken);
//   localStorage.setItem(EXPIRATION_KEY, expiration.toString());
// };

// export const logout = () => {
//   token = null;
//   expiration = null;
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem(EXPIRATION_KEY);
// };

// export const loginWithPassword = async (username: string, password: string) => {
//   const params = new URLSearchParams();
//   params.append("grant_type", "password");
//   params.append("client_id", "spring-boot-app");
//   params.append("client_secret", "6VD0ttFDKuQr1FLtg28ewM8KqaviIxn0"); // only if confidential client
//   params.append("username", username);
//   params.append("password", password);

//   try {
//     const res = await fetch(
//       "http://localhost:9090/realms/MyAppRealm/protocol/openid-connect/token",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: params.toString(),
//       }
//     );

//     if (!res.ok) {
//       console.error("[KeycloakService] Token API failed", res.status);
//       return null;
//     }

//     const data = await res.json();
//     console.log("[KeycloakService] Access Token:", data.access_token);

//     // Save token and expiration time to localStorage
//     setToken(data.access_token, data.expires_in);

//     return data.access_token;
//   } catch (err) {
//     console.error("[KeycloakService] Token fetch error:", err);
//     return null;
//   }
// };



import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:9090",
  realm: "MyAppRealm",
  clientId: "spring-boot-app",
});

export default keycloak; 
