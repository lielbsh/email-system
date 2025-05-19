import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onViewChange, onSearch, currentView }) => {
  const navigate = useNavigate();

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
      <button className="compose-button" onClick={() => navigate("/compose")}>
        New Email
      </button>

      <div className="user-circle">
        {`${user?.firstName?.charAt(0) || ""}${
          user?.lastName?.charAt(0) || ""
        }`}
      </div>
    </div>
  );
};

export default Header;
