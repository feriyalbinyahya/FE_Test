import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../styles/login.css";
import BackgroundImage from "../assets/images/background.jpg";
import Logo from "../assets/images/logo.png";
import { Box } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img
          src={Logo} // ganti dengan logo kamu di folder public
          alt="App Logo"
          className="login-logo"
        />
        <LoginForm />
      </div>
      <Box
        sx={{
            position: "relative",
            width: "fit-content",
            mx: "auto",
            display: "block",
        }}
        >
        <Box
            component="img"
            src={BackgroundImage}
            alt="Login Image"
            sx={{
            width: "100%",
            height: "100%",
            display: "block",
            }}
        />
        {/* Overlay gelap */}
        <Box
            sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.4)", // ubah alpha untuk gelap-terang
            }}
        />
        </Box>
    </div>
  );
};

export default LoginPage;