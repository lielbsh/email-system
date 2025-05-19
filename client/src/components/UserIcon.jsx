import React from "react";

const UserIcon = ({ user, onClick }) => {
  if (!user) return null;

  const initials = `${user.firstName?.charAt(0) || ""}${
    user.lastName?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <button className="user-circle" onClick={onClick} title="Logout">
      {initials}
    </button>
  );
};

export default UserIcon;
