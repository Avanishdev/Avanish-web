import React, { useState } from "react";
import { useAuth } from "../AuthContext.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (error) {
      alert("Failed to login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{ color: "gray" }}>Login</h1>
      <div>
        <label style={{ color: "gray" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label style={{ color: "gray" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
