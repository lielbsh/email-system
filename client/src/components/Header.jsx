import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onViewChange, onSearch }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button onClick={() => onViewChange("inbox")}>Inbox</button>
        <button onClick={() => onViewChange("outbox")}>Outbox</button>
        <button onClick={() => onViewChange("drafts")}>Drafts</button>
      </div>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button onClick={() => navigate("/compose")}>New Email</button>

      <div>
        {`${user?.firstName?.charAt(0) || ""}${
          user?.lastName?.charAt(0) || ""
        }`}
      </div>
    </div>
  );
};

export default Header;
