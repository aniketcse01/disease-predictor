import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import crossIcon from "../img/cross icon.svg";
import { useGlobalContext } from "./context";

export default function Record({ record, setRecord }) {
  const { dashboardData, handleDashboardChange, handleDashboardSubmit } =
    useGlobalContext();
  const [submitted, setSubmitted] = useState(false);

  if (!record) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDashboardSubmit();
    setSubmitted(true);
    setTimeout(() => {
      setRecord(false);
      setSubmitted(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[100]">
      <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl w-full max-w-4xl shadow-2xl border border-purple-100 max-h-[90vh] overflow-auto relative z-[101]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📋</span> Medical Records
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Update your medical info
            </p>
          </div>
          <button
            onClick={() => setRecord(false)}
            className="hover:scale-110 transition-transform p-2 hover:bg-gray-100 rounded-full"
          >
            <img src={crossIcon} alt="close" className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            name="current_med"
            label="💊 Current Medications"
            fullWidth
            multiline
            rows={3}
            placeholder="List your current medications..."
            value={dashboardData.current_med || ""}
            onChange={handleDashboardChange}
          />

          <TextField
            name="medical_history"
            label="⚕️ Medical History"
            fullWidth
            multiline
            rows={3}
            placeholder="Enter your medical history..."
            value={dashboardData.medical_history || ""}
            onChange={handleDashboardChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={submitted}
            className={`mt-6 py-3 font-bold text-lg transition-all bg-green-600 hover:bg-green-700 ${
              submitted ? "opacity-75" : ""
            }`}
          >
            {submitted ? "✅ Saved!" : "💾 Save Records"}
          </Button>
        </form>
      </div>
    </div>
  );
}
