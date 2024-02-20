import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Logout.js";
export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    isAuthenticated && (
      <div className="perfil">
        <img className="imagen" src={user.picture} alt={user.name} />
        <p className="nombre">{user.name}</p>
        <LogoutButton />
      </div>
    )
  );
};