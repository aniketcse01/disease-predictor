// src/components/ContactDoctor.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DoctorProfile from "./DoctorProfile";
import SkeletonLoader from "./SkeletonLoader";
import { Autocomplete, TextField } from "@mui/material";

const docOptions = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrician",
  "Gynecologist",
  "Cardiologist",
  "Oncologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Infectious disease",
  "Nephrologist",
  "Endocrinologist",
  "Ophthalmologist",
  "Otolaryngologist",
  "Dermatologist",
  "Psychiatrist",
  "Neurologist",
  "Radiologist",
  "Anesthesiologist",
  "Surgeon",
  "Physician executive",
];

const ContactDoctor = () => {
  const [doctors, setDoctors] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const doctorType = useRef("All");

  const fetchData = async (type = doctorType.current) => {
    setDoctors(null);
    try {
      const encoded = type && type !== "All" ? encodeURIComponent(type) : "";
      const url = `http://127.0.0.1:8000/api/accounts/doctors/?specialization=${encoded}`;
      const res = await axios.get(url);
      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("fetch doctors error:", err);
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchData("All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDocChange = () => {
    const val = speciality;
    doctorType.current =
      !val || val === "" || !docOptions.includes(val) ? "All" : val;
    fetchData(doctorType.current);
  };

  return (
    <section className="min-h-screen relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pt-32 pb-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              👨‍⚕️ Expert Medical Care
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Consult Our Specialists
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Connect with qualified doctors across various specializations
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-8 border border-purple-100/50 shadow-xl">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Search by Specialization
            </label>

            <div className="flex gap-3">
              <div className="flex-1 relative z-50">
                <Autocomplete
                  options={docOptions}
                  value={speciality}
                  onChange={(e, newValue) => setSpeciality(newValue)}
                  fullWidth
                  disablePortal={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select a specialization..."
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "white",
                          "& fieldset": {
                            borderColor: "#e9d5ff",
                            borderWidth: "2px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#a78bfa",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#a78bfa",
                            boxShadow: "0 0 0 4px rgba(167,139,250,0.1)",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem",
                          padding: "12px 14px",
                        },
                      }}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": {
                      color: "#a78bfa",
                    },
                    "& .MuiAutocomplete-clearIndicator": {
                      color: "#a78bfa",
                    },
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: "250px",
                    },
                  }}
                  componentsProps={{
                    paper: {
                      sx: {
                        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                        borderRadius: "12px",
                        marginTop: "4px",
                        border: "2px solid #e9d5ff",
                        backgroundColor: "white",
                      },
                    },
                  }}
                />
              </div>

              <button
                onClick={handleDocChange}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full">
          {doctors === null ? (
            <SkeletonLoader />
          ) : doctors.length === 0 ? (
            <div className="bg-white/90 rounded-2xl p-12 border border-purple-100/50 shadow-xl text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No Doctors Found
              </h3>
              <p className="text-slate-600">
                No doctors found for the selected specialization. Try selecting
                "All" or another specialization.
              </p>
            </div>
          ) : (
            <DoctorProfile doctors={doctors} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactDoctor;
