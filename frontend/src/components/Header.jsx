// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoHorizontal from "../img/logo.svg";
import AuthModal from "./AuthModal";
import { useAuth } from "./AuthContext";

const USER_KEY = "user";
const TOKEN_KEY = "token";

export default function Header() {
  const { showAuth, authMode, openAuthModal, closeAuthModal } = useAuth();

  // Initialize from localStorage to avoid extra render
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn("Header: failed to parse user from localStorage", e);
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Set axios header from token
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    } catch (e) {
      console.warn("Header: error reading token from localStorage", e);
    }

    // storage event for other tabs
    function onStorage(e) {
      if (!e) return;
      if (e.key === USER_KEY) {
        try {
          setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setCurrentUser(null);
        }
      }
      if (e.key === TOKEN_KEY) {
        if (e.newValue) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Token ${e.newValue}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      }
    }
    window.addEventListener("storage", onStorage);

    // same-tab custom event
    function onAuthChanged() {
      try {
        const raw = localStorage.getItem(USER_KEY);
        setCurrentUser(raw ? JSON.parse(raw) : null);
      } catch {
        setCurrentUser(null);
      }
    }
    window.addEventListener("auth:changed", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:changed", onAuthChanged);
    };
  }, []);

  /**
   * Called by AuthModal after successful login/register
   * - saves token (if provided)
   * - computes/stores a per-user patient_profile_key on the saved user object
   * - ensures an *empty* per-user profile exists (DO NOT copy legacy global data)
   */
  function handleAuthSuccess(user, token) {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      }

      if (user) {
        // ensure role exists (default to patient)
        const roleed = user.role ?? "patient";

        // compute per-user key (prefer existing patient_profile_key)
        const idPart = user.id ?? user.username ?? user.email ?? null;
        const existingKey = user.patient_profile_key;
        // If no id, generate a timestamp-based key so it's unique
        const key =
          existingKey ||
          (idPart
            ? `patient_profile_${idPart}`
            : `patient_profile_${Date.now()}`);

        // attach patient_profile_key and role to the saved user object
        const savedUser = { ...user, patient_profile_key: key, role: roleed };

        // persist user
        localStorage.setItem(USER_KEY, JSON.stringify(savedUser));
        setCurrentUser(savedUser);

        // IMPORTANT: Do NOT copy legacy global `patient_profile` into a new user's per-user profile.
        // That causes all new users to inherit previous profile data.
        // Instead, create an empty per-user profile if none exists.
        try {
          if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify({ new_patient: true }));
          }
        } catch (mErr) {
          console.warn("Header: failed to create per-user profile", mErr);
        }
      }
    } catch (e) {
      console.warn("Header: error saving auth to localStorage", e);
    }

    // Notify same-tab listeners so components update immediately
    window.dispatchEvent(new Event("auth:changed"));

    closeAuthModal();
    // Use a small timeout to ensure the modal has time to close before navigating
    setTimeout(() => {
      navigate("/predictor");
    }, 50);
  }

  function handleLogout() {
    try {
      // remove auth items
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      // Optional: remove per-user patient profile key if you stored it separately
      try {
        const raw = localStorage.getItem(USER_KEY);
        if (raw) {
          const user = JSON.parse(raw);
          if (user?.patient_profile_key) {
            localStorage.removeItem(user.patient_profile_key);
          }
        }
      } catch (e) {
        // ignore migration errors
      }

      // clear axios auth header
      delete axios.defaults.headers.common["Authorization"];

      // clear local React state
      setCurrentUser(null);
    } catch (e) {
      console.warn("Header: error during logout", e);
    }

    // inform same-tab listeners
    window.dispatchEvent(new Event("auth:changed"));

    // navigate home and do a full reload to ensure everything re-inits cleanly
    // (keeps user on / but forces app-level reinitialization so "Loading..." won't remain)
    navigate("/", { replace: true });
    window.location.reload();
  }

  return (
    <>
      {/* NOTE: header is fixed on top and has high z-index so it's always clickable */}
      <header
        className="site-header fixed top-0 left-0 right-0 z-[60] bg-white"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}
      >
        <div className="header-inner max-w-[1280px] mx-auto px-6 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center" aria-label="Go to home">
            <img src={LogoHorizontal} alt="Medlytics" className="site-logo" />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Primary navigation"
          >
            {!currentUser && (
              <>
                <a href="#services" className="nav-link">
                  Services
                </a>
                <a href="#about" className="nav-link">
                  About Us
                </a>
              </>
            )}

            {currentUser && (
              <>
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => navigate("/predictor")}
                >
                  Predict
                </button>
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => navigate("/consult")}
                >
                  Consult
                </button>
                <button
                  type="button"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            )}

            {!currentUser && (
              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="nav-link"
              >
                Register / Login
              </button>
            )}
          </nav>

          {/* mobile */}
          <div className="lg:hidden">
            {!currentUser ? (
              <button
                onClick={() => openAuthModal("register")}
                className="p-2 rounded-md"
              >
                Register / Login
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate("/predictor")} className="p-2">
                  Predict
                </button>
                <button onClick={() => navigate("/dashboard")} className="p-2">
                  Dashboard
                </button>
                <button onClick={() => navigate("/consult")} className="p-2">
                  Consult
                </button>
                <button onClick={handleLogout} className="p-2">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        open={showAuth}
        onClose={closeAuthModal}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
