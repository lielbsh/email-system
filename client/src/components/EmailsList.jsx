import React from "react";
import UserIcon from "./UserIcon";

const EmailsList = ({ emails }) => {
  if (!emails) {
    return <p>No emails to show.</p>;
  }
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div key={email._id} className="email-item">
          <UserIcon user={email.from} onClick={() => {}} />
          <div>
            {email.subject || "(No subject)"}
            {email.updatedAt}
          </div>
          <div>{email.body}</div>
        </div>
      ))}
    </div>
  );
};

export default EmailsList;
