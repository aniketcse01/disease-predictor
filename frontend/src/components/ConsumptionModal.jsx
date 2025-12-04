import React, { useState } from "react";
import crossIcon from "../img/cross icon.svg";
import { Select, MenuItem, InputLabel, Button } from "@mui/material";
import { useGlobalContext } from "./context";

export default function ConsumptionModal({
  consumptionModal,
  setConsumptionModal,
}) {
  const { dashboardData, handleDashboardChange, handleDashboardSubmit } =
    useGlobalContext();
  const [submitted, setSubmitted] = useState(false);

  if (!consumptionModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDashboardSubmit();
    setSubmitted(true);
    setTimeout(() => {
      setConsumptionModal(false);
      setSubmitted(false);
    }, 500);
  };

  // MenuProps to prevent body scrollbar locking
  const menuProps = {
    disableScrollLock: true,
    PaperProps: {
      style: {
        maxHeight: 250,
      },
    },
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 flex justify-center items-center backdrop-blur-sm z-[100]">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 relative z-[101]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {" "}
              🚭 Consumption
            </h2>
            <p className="text-sm text-gray-500 mt-1">Update your habits</p>
          </div>
          <button
            onClick={() => setConsumptionModal(false)}
            className="hover:scale-110 transition-transform p-2 hover:bg-gray-100 rounded-full"
          >
            <img src={crossIcon} alt="close" className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <InputLabel className="mb-2 font-bold text-gray-700 text-sm">
              🚬 Smoking Consumption
            </InputLabel>
            <Select
              name="smoke_cons"
              fullWidth
              size="small"
              value={dashboardData.smoke_cons || ""}
              onChange={handleDashboardChange}
              className="bg-gray-50"
              MenuProps={menuProps}
            >
              <MenuItem value="No">
                <span className="flex items-center gap-2">✅ No</span>
              </MenuItem>
              <MenuItem value="Mild">
                <span>⚠️ Mild</span>
              </MenuItem>
              <MenuItem value="High">
                <span>🔴 High</span>
              </MenuItem>
            </Select>
          </div>

          <div>
            <InputLabel className="mb-2 font-bold text-gray-700 text-sm">
              🍷 Alcohol Consumption
            </InputLabel>
            <Select
              name="alcohol_cons"
              fullWidth
              size="small"
              value={dashboardData.alcohol_cons || ""}
              onChange={handleDashboardChange}
              className="bg-gray-50"
              MenuProps={menuProps}
            >
              <MenuItem value="No">
                <span>✅ No</span>
              </MenuItem>
              <MenuItem value="Mild">
                <span>⚠️ Mild</span>
              </MenuItem>
              <MenuItem value="High">
                <span>🔴 High</span>
              </MenuItem>
            </Select>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={submitted}
            className={`mt-6 py-3 font-bold text-lg transition-all ${
              submitted ? "opacity-75" : ""
            }`}
          >
            {submitted ? "✅ Saved!" : "💾 Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
