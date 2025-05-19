import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [emails, setEmails] = useState([]);
  const [view, setView] = useState("inbox");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      console.log(storedUser);
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
        setEmails(data);
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      }
    };

    fetchEmails();
    const intervalId = setInterval(fetchEmails, 8000);

    return () => clearInterval(intervalId);
  }, [view, user, searchTerm]);

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

export default HomePage;
