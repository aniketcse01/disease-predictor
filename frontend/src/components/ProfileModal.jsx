import React, { useState } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useGlobalContext } from "./context";

export default function ProfileModal({ profileModal, setProfileModal }) {
  const { dashboardData, handleDashboardChange, handleDashboardSubmit } =
    useGlobalContext();
  const [submitted, setSubmitted] = useState(false);

  if (!profileModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDashboardSubmit();
    setSubmitted(true);
    setTimeout(() => {
      setProfileModal(false);
      setSubmitted(false);
    }, 500);
  };

  // MenuProps to prevent body scrollbar locking and avoid layout shift
  const commonMenuProps = {
    // disableScrollLock prevents MUI from adding overflow:hidden on <body>
    disableScrollLock: true,
    // disablePortal keeps the menu inside the modal container (optional but often helpful)
    disablePortal: true,
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[100]">
      <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl w-full max-w-4xl shadow-2xl border border-blue-100 max-h-[90vh] overflow-auto relative z-[101]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>👤</span> Edit Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Update your information
            </p>
          </div>
          <button
            onClick={() => setProfileModal(false)}
            className="hover:scale-110 transition-transform p-2 hover:bg-gray-100 rounded-full"
          >
            <img src={crossIcon} alt="close" className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="first_name"
                label="First Name"
                fullWidth
                size="small"
                value={dashboardData.first_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="last_name"
                label="Last Name"
                fullWidth
                size="small"
                value={dashboardData.last_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Age"
                type="number"
                fullWidth
                size="small"
                value={dashboardData.age || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="date_of_birth"
                label="Date of Birth"
                type="date"
                fullWidth
                size="small"
                value={dashboardData.date_of_birth || ""}
                onChange={handleDashboardChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Sex</InputLabel>
                <Select
                  name="sex"
                  value={dashboardData.sex || ""}
                  onChange={handleDashboardChange}
                  label="Sex"
                  MenuProps={commonMenuProps}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="height"
                label="Height (cm)"
                fullWidth
                size="small"
                value={dashboardData.height || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="weight"
                label="Weight (kg)"
                fullWidth
                size="small"
                value={dashboardData.weight || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Exercise Type</InputLabel>
                <Select
                  name="exercise_type"
                  value={dashboardData.exercise_type || ""}
                  onChange={handleDashboardChange}
                  label="Exercise Type"
                  MenuProps={commonMenuProps}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Mild- Walks, Jogs">
                    Mild - Walks, Jogs
                  </MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Diet Type</InputLabel>
                <Select
                  name="diet_type"
                  value={dashboardData.diet_type || ""}
                  onChange={handleDashboardChange}
                  label="Diet Type"
                  MenuProps={commonMenuProps}
                >
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Keto">Keto</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={submitted}
            className={`mt-8 py-3 font-bold text-lg transition-all bg-blue-600 hover:bg-blue-700 ${
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
