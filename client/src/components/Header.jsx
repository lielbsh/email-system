import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import UserIcon from "./UserIcon";

const Header = ({
  user,
  onViewChange,
  onSearch,
  currentView,
  onNewEmailClick,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="nav-buttons">
        {["inbox", "outbox", "drafts"].map((view) => (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={currentView === view ? "active" : ""}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="compose-button" onClick={onNewEmailClick}>
        New Email
      </button>

      <UserIcon user={user} onClick={handleLogout} />
    </div>
  );
};

export default Header;
