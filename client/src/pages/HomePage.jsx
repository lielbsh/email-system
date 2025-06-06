import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailsList from "../components/EmailsList";
import Header from "../components/Header";
import NewEmailModal from "../components/NewEmailModal";
import "./HomePage.css";
import UserIcon from "../components/UserIcon";

const HomePage = () => {
  const [emails, setEmails] = useState([]);
  const [view, setView] = useState("inbox");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [showNewEmailModal, setShowNewEmailModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedEmail(null);
  }, [view]);

  useEffect(() => {
    const fetchRecipients = async () => {
      if (
        !selectedEmail ||
        !selectedEmail.to ||
        selectedEmail.to.length === 0
      ) {
        setRecipients([]);
        return;
      }

      const res = await fetch("emails/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedEmail.to }),
      });

      const data = await res.json();
      setRecipients(data);
    };

    fetchRecipients();
  }, [selectedEmail]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      console.log("storedUser", storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchEmails = async () => {
      let url = `/emails/${view}?userId=${user._id}`;
      if (searchTerm) {
        url = `/emails/search?userId=${user._id}&search=${searchTerm}&box=${view}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("emails:", data);
        setEmails(data);
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      }
    };

    fetchEmails();
    const intervalId = setInterval(fetchEmails, 8000);

    return () => clearInterval(intervalId);
  }, [view, user, searchTerm]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      {showNewEmailModal && (
        <NewEmailModal
          fromUserId={user._id}
          onClose={() => setShowNewEmailModal(false)}
        />
      )}
      <Header
        user={user}
        onViewChange={handleViewChange}
        onSearch={setSearchTerm}
        currentView={view}
        onNewEmailClick={() => setShowNewEmailModal(true)}
      />
      <div className="main-content">
        <div className="email-list-container">
          <EmailsList
            emails={emails}
            onSelectEmail={setSelectedEmail}
            selectedEmail={selectedEmail}
          />
        </div>
        <div className="open-email-container">
          {selectedEmail && (
            <div>
              <div className="email-header">
                <UserIcon user={selectedEmail.from} />
                <div className="text">
                  <div>{selectedEmail.subject || "(No subject)"}</div>
                  To:
                  {recipients.map((recipient, index) => (
                    <span key={index}>
                      {recipient.firstName} {recipient.lastName}
                      {index < recipients.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div>{selectedEmail.body}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
