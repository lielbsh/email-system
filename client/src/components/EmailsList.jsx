import React from "react";
import UserIcon from "./UserIcon";

const EmailsList = ({ emails, onSelectEmail }) => {
  if (!emails) {
    return <p>No emails to show.</p>;
  }
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div
          key={email._id}
          className="email-item"
          onClick={() => {
            console.log("Clicked email:", email);
            onSelectEmail(email);
          }}
        >
          <div>
            <UserIcon user={email.from} />
          </div>
          <div>
            <div>
              {email.from.firstName} {email.from.lastName}
            </div>
            <div>
              {email.subject || "(No subject)"}
              {email.updatedAt}
            </div>
            <div>{email.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailsList;
