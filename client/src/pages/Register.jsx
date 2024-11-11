import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const URL = "http://localhost:8080/api/v1/user/register";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("buyer");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(URL, {
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
      });
      alert("Signup successful, please login");
      window.location.href = "/login";
    } catch (error) {
      alert("Failed to signup");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Register;
