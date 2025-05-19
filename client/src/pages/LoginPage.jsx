import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./AuthForm.css";

const LoginPage = () => {
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailAddress, password }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data);
      navigate("/");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={emailAddress}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="buttons">
          <button type="submit">Login</button>
          <div>/</div>
          <button type="button" onClick={() => navigate("/register")}>
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
