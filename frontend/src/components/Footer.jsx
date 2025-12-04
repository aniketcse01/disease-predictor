import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import footer_logo from "../img/foo.svg";
import { useAuth } from "./AuthContext";

const USER_KEY = "user";

export default function Footer() {
  const navigate = useNavigate();
  const { openAuthModal } = useAuth();
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    function onAuthChanged() {
      try {
        const raw = localStorage.getItem(USER_KEY);
        setCurrentUser(raw ? JSON.parse(raw) : null);
      } catch {
        setCurrentUser(null);
      }
    }
    window.addEventListener("auth:changed", onAuthChanged);
    return () => window.removeEventListener("auth:changed", onAuthChanged);
  }, []);

  const handlePredictorClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      navigate("/predictor");
      window.scrollTo(0, 0);
    } else {
      openAuthModal("register");
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const socialIcons = [
    {
      label: "Github",
      d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.86 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.252-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.696-4.566 4.944.359.31.679.92.679 1.855 0 1.338-.012 2.417-.012 2.746 0 .268.18.58.688.481C19.144 20.194 22 16.44 22 12.017 22 6.484 17.523 2 12 2z",
    },
    {
      label: "Twitter",
      d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
    },
    {
      label: "Discord",
      d: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-slate-200 overflow-hidden mt-20">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-tl from-blue-500 to-cyan-500 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={footer_logo}
                alt="Medlytics"
                className="h-10 w-auto object-contain opacity-90"
              />
              <span className="text-xl font-bold text-white">Medlytics</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your trusted healthcare companion powered by Machine Learning
              technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase text-slate-300 tracking-wide">
              Quick Links
            </h3>
            {currentUser ? (
              <ul className="text-sm text-slate-400 space-y-3">
                <li>
                  <a
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={() => handleNavigate("/predictor")}
                  >
                    Predict
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={() => handleNavigate("/dashboard")}
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={() => handleNavigate("/consult")}
                  >
                    Consult
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="text-sm text-slate-400 space-y-3">
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#services"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="#about"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition-colors"
                    href="/predictor"
                    onClick={handlePredictorClick}
                  >
                    Disease Predictor
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase text-slate-300 tracking-wide">
              Legal
            </h3>
            <ul className="text-sm text-slate-400 space-y-3">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-300">Medlytics™</span>. All Rights
            Reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialIcons.map((icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={icon.label}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d={icon.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
