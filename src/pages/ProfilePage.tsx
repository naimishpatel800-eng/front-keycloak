import keycloak from "../KeycloakService";

const ProfilePage = () => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {keycloak.tokenParsed?.preferred_username}</p>
      <p>Email: {keycloak.tokenParsed?.email}</p>
    </div>
  );
};

export default ProfilePage;