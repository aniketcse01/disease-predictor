import React from "react";
import record from "../img/record.svg";
import profile from "../img/profile.svg";
import settings from "../img/settings.svg";
import consumption from "../img/cons.svg";

export default function Sidebar({
  setRecord,
  setLogModal,
  setProfileModal,
  setConsumptionModal,
}) {
  const buttons = [
    { icon: profile, label: "Profile", onClick: () => setProfileModal(true) },
    { icon: record, label: "Record", onClick: () => setRecord(true) },
    { icon: settings, label: "Settings", onClick: () => setLogModal(true) },
    {
      icon: consumption,
      label: "Consumption",
      onClick: () => setConsumptionModal(true),
    },
  ];

  return (
    <div className="flex flex-col h-full py-6 px-3 gap-4">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className="relative flex items-center justify-center w-full p-4 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-2xl hover:scale-110"
          title={btn.label}
          aria-label={btn.label}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

          {/* Icon container */}
          <div className="relative z-10 w-7 h-7 flex items-center justify-center">
            <img
              src={btn.icon}
              alt={btn.label}
              className="w-full h-full object-contain filter brightness-0 invert group-hover:brightness-110 group-hover:scale-125 transition-all duration-300"
            />
          </div>

          {/* Label tooltip on hover */}
          <span className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl">
            {btn.label}
            <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
          </span>
        </button>
      ))}
    </div>
  );
}
