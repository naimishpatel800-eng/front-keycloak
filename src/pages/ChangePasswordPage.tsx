import { useEffect } from "react";
import keycloak from "../KeycloakService";

const ChangePasswordPage: React.FC = () => {
  useEffect(() => {
    keycloak.login({
      action: "UPDATE_PASSWORD",
      redirectUri: `${window.location.origin}/?kc_action_status=success`,
    });
  }, []);

  return (
    <div className="cp-wrapper">
      <div className="cp-card">
        <div className="cp-header">
          <i className="pi pi-lock" />
          <h2>Change Password</h2>
        </div>
        <div className="cp-alert cp-alert--success">
          <i className="pi pi-spin pi-spinner" />
          Redirecting to Keycloak...
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
