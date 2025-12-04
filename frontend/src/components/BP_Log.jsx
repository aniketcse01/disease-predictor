import React from "react";

export default function BP_Log({ responseData }) {
  const log = responseData?.bp_log;

  if (!log || !log.date || log.date.length === 0)
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-dashed border-red-300">
        <p className="text-5xl mb-3">💓</p>
        <p className="text-slate-600 font-bold text-lg">
          No blood pressure logs added yet
        </p>
      </div>
    );

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      {log.date.map((d, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-2xl p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-rose-100 rounded-xl">
              <span className="text-sm font-bold text-red-700">📅</span>
              <span className="text-sm font-bold text-red-700">{d}</span>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <p className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                <span>⬆️</span> High
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                {log.high[i] || "—"}
              </p>
              <p className="text-xs text-purple-600 font-semibold mt-1">mmHg</p>
            </div>
            <div className="w-1 h-16 bg-gradient-to-b from-purple-300 to-pink-300 rounded-full"></div>
            <div className="flex-1 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
              <p className="text-xs font-bold text-pink-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                <span>⬇️</span> Low
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                {log.low[i] || "—"}
              </p>
              <p className="text-xs text-pink-600 font-semibold mt-1">mmHg</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
