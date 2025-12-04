// src/components/LogModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import crossIconUrl from "../img/cross icon.svg";

// import { useGlobalContext } from "./context";

// using uploaded asset path (will be transformed by your environment)

/**
 * Compute the profile storage key for the currently-logged-in user.
 * - If a user is logged in and has patient_profile_key -> use it.
 * - If a user is logged in but no patient_profile_key -> use user id/username/email.
 * - If no user logged in -> fallback to legacy "patient_profile".
 */
function getPatientProfileKey() {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return "patient_profile";
    const u = JSON.parse(rawUser);
    if (u?.patient_profile_key) return u.patient_profile_key;
    const idPart = u.id ?? u.username ?? u.email;
    return idPart ? `patient_profile_${idPart}` : "patient_profile";
  } catch {
    return "patient_profile";
  }
}

export default function LogModal({ logModal, setLogModal }) {
  // we don't need the `data` value here (we persist directly to localStorage)
  // const { data } = useGlobalContext();

  const [bpDate, setBpDate] = useState("");
  const [bpHigh, setBpHigh] = useState("");
  const [bpLow, setBpLow] = useState("");

  const [gluDate, setGluDate] = useState("");
  const [gluBefore, setGluBefore] = useState("");
  const [gluAfter, setGluAfter] = useState("");

  // detect opening transition to avoid cascading renders
  const prevLogModalRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (logModal && !prevLogModalRef.current) {
      // defer state updates to next frame to avoid synchronous setState-in-effect warnings
      rafRef.current = window.requestAnimationFrame(() => {
        const today = new Date().toISOString().slice(0, 10);
        setBpDate(today);
        setGluDate(today);
        setBpHigh("");
        setBpLow("");
        setGluBefore("");
        setGluAfter("");
      });
    }
    prevLogModalRef.current = !!logModal;
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [logModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList && event.target.classList.contains("modal")) {
        setLogModal(false);
      }
    };
    if (logModal) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [logModal, setLogModal]);

  if (!logModal) return null;

  function persistUpdatedProfile(updatedProfile) {
    try {
      const key = getPatientProfileKey();
      localStorage.setItem(key, JSON.stringify(updatedProfile));
      window.dispatchEvent(new Event("auth:changed"));
    } catch (err) {
      console.error("Failed to save profile logs:", err);
    }
  }

  function onSubmitBP(e) {
    e.preventDefault();
    try {
      const key = getPatientProfileKey();
      const raw = localStorage.getItem(key);
      const profile = raw ? JSON.parse(raw) : {};
      if (!profile.bp_log) profile.bp_log = { date: [], high: [], low: [] };

      profile.bp_log.date.push(bpDate);
      profile.bp_log.high.push(bpHigh || "");
      profile.bp_log.low.push(bpLow || "");

      persistUpdatedProfile(profile);
      setBpHigh("");
      setBpLow("");
      setLogModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  function onSubmitGlucose(e) {
    e.preventDefault();
    try {
      const key = getPatientProfileKey();
      const raw = localStorage.getItem(key);
      const profile = raw ? JSON.parse(raw) : {};
      if (!profile.blood_glucose)
        profile.blood_glucose = { date: [], before: [], after: [] };

      profile.blood_glucose.date.push(gluDate);
      profile.blood_glucose.before.push(gluBefore || "");
      profile.blood_glucose.after.push(gluAfter || "");

      persistUpdatedProfile(profile);
      setGluBefore("");
      setGluAfter("");
      setLogModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative z-[101]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Health Logs</h2>
          <button
            onClick={() => setLogModal(false)}
            aria-label="Close log modal"
            className="hover:scale-110 transition-transform"
          >
            <img src={crossIconUrl} alt="close" className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blood Pressure Form */}
          <form onSubmit={onSubmitBP} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 pb-3 border-b-2 border-purple-300">
              Blood Pressure
            </h3>
            <TextField
              label="Date"
              type="date"
              value={bpDate}
              onChange={(e) => setBpDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
            <TextField
              label="High (mmHg)"
              type="number"
              value={bpHigh}
              onChange={(e) => setBpHigh(e.target.value)}
              placeholder="e.g., 120"
              fullWidth
              size="small"
            />
            <TextField
              label="Low (mmHg)"
              type="number"
              value={bpLow}
              onChange={(e) => setBpLow(e.target.value)}
              placeholder="e.g., 80"
              fullWidth
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Save BP
            </Button>
          </form>

          {/* Glucose Form */}
          <form onSubmit={onSubmitGlucose} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 pb-3 border-b-2 border-green-300">
              Glucose Level
            </h3>
            <TextField
              label="Date"
              type="date"
              value={gluDate}
              onChange={(e) => setGluDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
            <TextField
              label="Before (mg/dL)"
              type="number"
              value={gluBefore}
              onChange={(e) => setGluBefore(e.target.value)}
              placeholder="e.g., 100"
              fullWidth
              size="small"
            />
            <TextField
              label="After (mg/dL)"
              type="number"
              value={gluAfter}
              onChange={(e) => setGluAfter(e.target.value)}
              placeholder="e.g., 120"
              fullWidth
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              className="mt-4"
            >
              Save Glucose
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
