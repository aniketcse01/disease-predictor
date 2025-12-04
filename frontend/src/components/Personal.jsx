// src/components/Personal.jsx
import React from "react";

function displayValue(value, unit = "") {
  if (value === null || value === undefined || value === "") return "—";
  // if boolean-like strings or booleans, make them pretty
  if (typeof value === "boolean") return value ? "Yes" : "No";
  const lower = String(value).toLowerCase();
  if (lower === "true") return "Yes";
  if (lower === "false") return "No";
  // numeric values keep as-is
  return `${value}${unit ? ` ${unit}` : ""}`.trim();
}

export default function Personal({ responseData = {} }) {
  // prefer the new keys used in your modal/context, fallback to older keys if any
  const exerciseValue =
    responseData.exercise_type ?? responseData.exercise ?? "";
  const dietValue = responseData.diet_type ?? responseData.diet ?? "";

  // alcohol_cons and smoke_cons might be booleans or strings like "No"/"Yes"
  const alcoholValue = responseData.alcohol_cons ?? responseData.alcohol ?? "";
  const smokingValue = responseData.smoke_cons ?? responseData.smoking ?? "";

  const fields = [
    ["Age", responseData.age, "years", "👤"],
    ["Sex", responseData.sex, "", "🧬"],
    ["Height", responseData.height, "cm", "📏"],
    ["Weight", responseData.weight, "kg", "⚖️"],
    ["Exercise", exerciseValue, "", "🏃"],
    ["Diet", dietValue, "", "🥗"],
    ["Alcohol", alcoholValue, "", "🍷"],
    ["Smoking", smokingValue, "", "🚭"],
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
        <span>📋</span> Personal Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fields.map(([label, val, unit, emoji]) => (
          <div
            key={label}
            className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-5 border-2 border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xl">{emoji}</span>
              </div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                {label}
              </p>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
              {displayValue(val, unit)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
