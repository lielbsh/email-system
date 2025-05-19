import React from "react";
import UserIcon from "./UserIcon";

const EmailsList = ({ emails, onSelectEmail, selectedEmail }) => {
  if (!emails) {
    return <p>No emails to show.</p>;
  }
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div
          key={email._id}
          className={`email-item ${
            selectedEmail?._id === email._id ? "selected" : ""
          }`}
          onClick={() => {
            console.log("Clicked email:", email);
            onSelectEmail(email);
          }}
        >
          <div className="email-icon">
            <UserIcon user={email.from} />
          </div>
          <div className="email-info">
            <div className="email-header">
              {email.from.firstName} {email.from.lastName}
            </div>

            <div className="email-subject-row">
              <div className="text">{email.subject || "(No subject)"}</div>

              <div>
                {new Date(email.updatedAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>

            <div className="email-body-preview">{email.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailsList;
