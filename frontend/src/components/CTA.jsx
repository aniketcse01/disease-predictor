import React from "react";
import { useAuth } from "./AuthContext";

export default function CTA({ children, variant = "primary", onClick, small }) {
  const size = small ? "px-4 py-2 text-sm" : "px-6 py-3";
  const base = `btn-cta ${size} rounded-md font-semibold`;
  const { openAuthModal } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the event from bubbling up

    if (onClick) {
      onClick(e);
    } else {
      // Default behavior: open auth modal using context
      const mode = variant === "primary" ? "register" : "login";
      openAuthModal(mode);
    }
  };

  if (variant === "primary") {
    return (
      <button
        className={`${base} btn-primary-outline`}
        onClick={handleClick}
        aria-label={String(children)}
      >
        {children}
      </button>
    );
  }

  if (variant === "outline-green") {
    return (
      <button
        className={`${base} btn-outline-green`}
        onClick={handleClick}
        aria-label={String(children)}
      >
        {children}
      </button>
    );
  }

  return (
    <button className={`${base} border border-gray-200`} onClick={handleClick}>
      {children}
    </button>
  );
}
