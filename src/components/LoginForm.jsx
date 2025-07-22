import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(username, password);
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("Login gagal. Cek username/password.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;