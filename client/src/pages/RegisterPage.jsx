import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registered successfully");
      navigate("/login");
    } else {
      alert(data.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>SIGN-UP</h2>
      <div>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Sign-Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
