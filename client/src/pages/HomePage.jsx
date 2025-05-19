import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailsList from "../components/EmailsList";
import Header from "../components/Header";

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
      <Header
        user={user}
        onViewChange={handleViewChange}
        onSearch={setSearchTerm}
      />
      <EmailsList emails={emails} />
    </div>
  );
};

export default HomePage;
