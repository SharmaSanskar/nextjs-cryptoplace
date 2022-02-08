import { AuthProvider } from "../contexts/AuthContext";
import { useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // ALAN AI
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: process.env.NEXT_PUBLIC_ALANAI_KEY,
      rootEl: document.getElementById("alan-btn"),
      onCommand: ({ command }) => {
        if (command === "navigate-home") {
          window.location && (window.location.href = "/");
        }
        if (command === "navigate-about") {
          window.location && (window.location.href = "/about");
        }
        if (command === "navigate-cryptos") {
          window.location && (window.location.href = "/cryptos");
        }
        if (command === "navigate-news") {
          window.location && (window.location.href = "/news");
        }
      },
    });
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
