// src/components/GlucoseLevel.jsx
import React from "react";

/**
 * GlucoseLevel - tabular display of blood glucose logs.
 * Expects responseData.blood_glucose = { date: [], before: [], after: [] }
 */
export default function GlucoseLevel({ responseData = {} }) {
  const glucose = responseData.blood_glucose || {
    date: [],
    before: [],
    after: [],
  };
  const { date = [], before = [], after = [] } = glucose;

  if (!date || date.length === 0) {
    return (
      <div className="w-full text-center py-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-300">
        <p className="text-5xl mb-3">📊</p>
        <p className="text-slate-600 font-bold text-lg">
          No glucose data recorded yet
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-green-200 shadow-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <th className="py-4 px-5 text-left font-bold uppercase tracking-wide text-sm">
              📅 Date
            </th>
            <th className="py-4 px-5 text-center font-bold uppercase tracking-wide text-sm">
              Before 🔍
            </th>
            <th className="py-4 px-5 text-center font-bold uppercase tracking-wide text-sm">
              After 🔍
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {date.map((d, idx) => {
            const valBefore =
              before && before[idx] !== undefined ? before[idx] : "";
            const valAfter =
              after && after[idx] !== undefined ? after[idx] : "";

            if (!valBefore && !valAfter) return null;

            const isFirstDate = idx === 0 || date[idx] !== date[idx - 1];
            const beforeHigh = Number(valBefore) > 120;
            const afterHigh = Number(valAfter) > 180;

            return (
              <tr
                key={idx}
                className="border-b border-green-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
              >
                <td
                  className={`py-4 px-5 font-bold text-slate-800 ${
                    isFirstDate ? "bg-green-100" : ""
                  }`}
                >
                  {d}
                </td>
                <td
                  className={`py-4 px-5 text-center font-bold text-lg transition-all ${
                    beforeHigh ? "bg-red-100 text-red-700" : "text-slate-700"
                  }`}
                >
                  {valBefore || "—"}
                </td>
                <td
                  className={`py-4 px-5 text-center font-bold text-lg transition-all ${
                    afterHigh ? "bg-red-100 text-red-700" : "text-slate-700"
                  }`}
                >
                  {valAfter || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
