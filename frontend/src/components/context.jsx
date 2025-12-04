import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import axios from "axios";

const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);
const USER_KEY = "user";

/**
 * Return a per-user profile key when possible. Prefer explicit key stored on
 * the user object (patient_profile_key), then stable id/username/email.
 * Fallback to legacy 'patient_profile' when no user is present.
 */
function getPatientProfileKey() {
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    if (!rawUser) return "patient_profile"; // legacy fallback
    const u = JSON.parse(rawUser);
    if (u?.patient_profile_key) return u.patient_profile_key;
    const idPart = u.id ?? u.username ?? u.email;
    return idPart ? `patient_profile_${idPart}` : "patient_profile";
  } catch {
    return "patient_profile";
  }
}

function getPredictionsKey() {
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    if (!rawUser) return "predictions";
    const u = JSON.parse(rawUser);
    if (u?.predictions_key) return u.predictions_key;
    const idPart = u.id ?? u.username ?? u.email;
    return idPart ? `predictions_${idPart}` : "predictions";
  } catch {
    return "predictions";
  }
}

export function GlobalProvider({ children }) {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    first_name: "",
    last_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    height: "",
    weight: "",
    current_med: "",
    medical_history: "",
    exercise: "",
    diet: "",
    alcohol_cons: "",
    smoke_cons: "",
  });

  const [data, setData] = useState(() => {
    try {
      const key = getPatientProfileKey();
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [dashboardData, setDashboardData] = useState(() => ({
    ...(data || {}),
  }));

  const [predictions, setPredictions] = useState(() => {
    try {
      const key = getPredictionsKey();
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  function shallowEqual(a, b) {
    if (a === b) return true;
    if (!a || !b) return false;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (let k of aKeys) {
      if (a[k] !== b[k]) return false;
    }
    return true;
  }

  // Keep dashboardData up-to-date with data, but avoid causing infinite loops.
  useEffect(() => {
    setDashboardData((prev) => {
      const merged = { ...(prev || {}), ...(data || {}) };
      if (shallowEqual(merged, prev)) return prev;
      return merged;
    });
  }, [data]);

  // Memoized fetchData so consumers can safely include it in deps
  const fetchData = useCallback(async () => {
    try {
      const key = getPatientProfileKey();
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : {};
      setData(parsed || {});
      return parsed;
    } catch (err) {
      // fallback to localStorage parse attempt
      try {
        const key = getPatientProfileKey();
        const raw = localStorage.getItem(key);
        setData(raw ? JSON.parse(raw) : {});
      } catch {
        setData({});
      }
      return {};
    }
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleDashboardChange(e) {
    const { name, value } = e.target;
    setDashboardData((prev) => ({ ...(prev || {}), [name]: value }));
  }

  function handleDashboardSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const updated = {
      ...(data || {}),
      ...(dashboardData || {}),
      new_patient: false,
    };

    const key = getPatientProfileKey();
    try {
      localStorage.setItem(key, JSON.stringify(updated));
      setData(updated);
      // notify other listeners (header, dashboard)
      window.dispatchEvent(new Event("auth:changed"));
    } catch (err) {
      console.error("handleDashboardSubmit: failed to save profile", err);
    }
  }

  async function handleFormSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    try {
      const payload = { ...formData };

      const saved = {
        first_name: payload.first_name ?? payload.firstName ?? "",
        last_name: payload.last_name ?? payload.lastName ?? "",
        age: payload.age ?? null,
        sex: payload.sex ?? "",
        dob_day: payload.dob_day ?? payload.dobDay ?? "",
        dob_month: payload.dob_month ?? payload.dobMonth ?? "",
        dob_year: payload.dob_year ?? payload.dobYear ?? "",
        height: payload.height ?? null,
        weight: payload.weight ?? null,
        current_med: payload.current_med ?? payload.currentMed ?? "",
        medical_history:
          payload.medical_history ?? payload.medicalHistory ?? "",
        exercise: payload.exercise ?? "",
        diet: payload.diet ?? "",
        alcohol_cons: payload.alcohol_cons ?? payload.alcoholCons ?? "",
        smoke_cons: payload.smoke_cons ?? payload.smokeCons ?? "",
        bp_log: { date: [], high: [], low: [] },
        blood_glucose: { date: [], before: [], after: [] },
        new_patient: false,
      };

      const key = getPatientProfileKey();
      localStorage.setItem(key, JSON.stringify(saved));
      setData(saved);

      const pKey = getPredictionsKey();
      const existingPreds = JSON.parse(localStorage.getItem(pKey) || "[]");
      localStorage.setItem(pKey, JSON.stringify(existingPreds));
      setPredictions(existingPreds);

      // notify listeners
      window.dispatchEvent(new Event("auth:changed"));
      return saved;
    } catch (err) {
      console.error("handleFormSubmit error:", err);
      throw err;
    }
  }

  useEffect(() => {
    function onAuthChanged() {
      try {
        const key = getPatientProfileKey();
        const raw = localStorage.getItem(key);
        setData(raw ? JSON.parse(raw) : {});
      } catch {
        setData({});
      }
      try {
        const pKey = getPredictionsKey();
        const rawp = localStorage.getItem(pKey);
        setPredictions(rawp ? JSON.parse(rawp) : []);
      } catch {
        setPredictions([]);
      }
    }
    window.addEventListener("auth:changed", onAuthChanged);

    function onStorage(e) {
      const key = getPatientProfileKey();
      const pKey = getPredictionsKey();

      if (e.key === key || e.key === USER_KEY) {
        try {
          setData(e.newValue ? JSON.parse(e.newValue) : {});
        } catch {
          setData({});
        }
      }
      if (e.key === pKey) {
        try {
          setPredictions(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setPredictions([]);
        }
      }
    }
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("auth:changed", onAuthChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        formData,
        handleInputChange,
        handleFormSubmit,
        data,
        fetchData,
        dashboardData,
        handleDashboardChange,
        handleDashboardSubmit,
        predictions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
