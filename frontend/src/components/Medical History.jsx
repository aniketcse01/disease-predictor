import React from "react";

export default function MedicalHistory({ data }) {
  if (!data) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-dashed border-orange-300">
        <p className="text-5xl mb-3">📝</p>
        <p className="text-slate-600 font-bold text-lg">
          No medical history recorded
        </p>
      </div>
    );
  }

  const list = Array.isArray(data)
    ? data
    : String(data)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  if (list.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-dashed border-orange-300">
        <p className="text-5xl mb-3">📝</p>
        <p className="text-slate-600 font-bold text-lg">
          No medical history recorded
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">⚕️</span> Medical History
      </h2>
      <ul className="space-y-3">
        {list.map((item, i) => (
          <li
            key={i}
            className="group flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-white text-sm font-bold">⚠️</span>
            </div>
            <span className="text-slate-700 font-semibold flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
