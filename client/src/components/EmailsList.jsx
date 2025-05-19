import React from "react";

const EmailsList = ({ emails }) => {
  if (!emails) {
    return <p>No emails to show.</p>;
  }
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div key={email._id} className="email-item">
          <div>
            {email.from?.firstName} {email.from?.lastName}
          </div>
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
