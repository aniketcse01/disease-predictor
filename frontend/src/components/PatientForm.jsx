// src/components/PatientForm.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * PatientForm with custom dropdown components (replaces native <select>).
 *
 * Props:
 *  - profileData: object (controlled values)
 *  - handleInputChange: function(e) => { ... }  // provided by your context
 *  - handleFormSubmit: function(e) => { ... }   // provided by your context
 *  - onSubmitted: optional callback called after successful submit
 *
 * NOTE: This file intentionally keeps your existing layout and styling.
 */

function CustomSelect({ name, value, onChange, placeholder, options = [] }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setHighlightIdx(-1);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setHighlightIdx(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (open) setHighlightIdx(-1);
  }, [open, options]);

  function handleSelect(optionValue) {
    onChange({ target: { name, value: optionValue } });
    setOpen(false);
    setHighlightIdx(-1);
  }

  function handleKeyDown(e) {
    if (
      !open &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (open) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIdx((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIdx >= 0 && highlightIdx < options.length) {
          handleSelect(options[highlightIdx].value);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        setHighlightIdx(-1);
      }
    }
  }

  const selectedLabel =
    options.find((o) => String(o.value) === String(value))?.label || "";

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        onKeyDown={handleKeyDown}
        className="w-full text-left border-2 border-purple-100 rounded-xl p-3.5 bg-white/50 backdrop-blur flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
      >
        <span
          className={`truncate text-sm ${
            selectedLabel ? "text-gray-800" : "text-gray-500"
          }`}
        >
          {selectedLabel || placeholder}
        </span>

        <svg
          className={`w-5 h-5 ml-2 transform transition-transform duration-150 text-purple-600 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          aria-label={name}
          className="absolute z-50 mt-2 w-full bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl max-h-56 overflow-auto py-2 text-sm border border-purple-100/50"
          style={{
            boxShadow: "0 20px 60px rgba(102,126,234,0.15)",
          }}
        >
          {options.map((opt, idx) => {
            const isSelected = String(opt.value) === String(value);
            const isHighlighted = idx === highlightIdx;
            return (
              <li
                key={opt.value ?? idx}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightIdx(idx)}
                onMouseLeave={() => setHighlightIdx(-1)}
                onClick={() => handleSelect(opt.value)}
                className={`cursor-pointer px-4 py-2.5 transition-all ${
                  isSelected
                    ? "font-semibold bg-purple-50 text-purple-700"
                    : "text-gray-700"
                } ${isHighlighted ? "bg-purple-100" : "hover:bg-purple-50"}`}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function PatientForm({
  profileData = {},
  handleInputChange = () => {},
  handleFormSubmit = () => {},
  onSubmitted = () => {},
}) {
  const v = (k) =>
    profileData && profileData[k] !== undefined ? profileData[k] : "";

  // option lists
  const sexOptions = [
    { value: "", label: "Sex" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const exerciseOptions = [
    { value: "", label: "Exercise" },
    { value: "None", label: "None" },
    { value: "Mild", label: "Mild - Walks, Jogs" },
    { value: "Regular", label: "Regular" },
  ];

  const dietOptions = [
    { value: "", label: "Diet" },
    { value: "Non-Vegetarian", label: "Non-Vegetarian" },
    { value: "Vegetarian", label: "Vegetarian" },
    { value: "Vegan", label: "Vegan" },
  ];

  const alcoholOptions = [
    { value: "", label: "Alcohol Consumption *" },
    { value: "No", label: "No" },
    { value: "Occasional", label: "Occasional" },
    { value: "Regular", label: "Regular" },
  ];

  const smokeOptions = [
    { value: "", label: "Smoking Consumption *" },
    { value: "No", label: "No" },
    { value: "Mild", label: "Mild" },
    { value: "Regular", label: "Regular" },
  ];

  // wrapper to allow async handleFormSubmit and then notify parent
  const handleSubmit = async (e) => {
    e.preventDefault(); // Add preventDefault
    try {
      // call original submit (it may be async)
      await handleFormSubmit(e);
    } catch (err) {
      console.error("PatientForm: error in handleFormSubmit", err);
    }

    try {
      if (typeof onSubmitted === "function") onSubmitted();
    } catch (err) {
      console.error("PatientForm: error calling onSubmitted", err);
    }
  };

  return (
    <section className="relative pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📋 Health Profile
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Complete Your Health Profile
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Help us understand your health better with a few quick details
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-purple-100/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    name="first_name"
                    value={v("first_name")}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    name="last_name"
                    value={v("last_name")}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Age *
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    max="150"
                    step="1"
                    value={v("age")}
                    onChange={handleInputChange}
                    placeholder="Your age"
                    required
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sex
                  </label>
                  <CustomSelect
                    name="sex"
                    value={v("sex")}
                    onChange={handleInputChange}
                    placeholder="Select your sex"
                    options={sexOptions}
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth Section */}
            <div className="space-y-4 pt-4 border-t border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Date of Birth
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Day
                  </label>
                  <input
                    name="dob_day"
                    value={v("dob_day")}
                    onChange={handleInputChange}
                    placeholder="DD"
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Month
                  </label>
                  <input
                    name="dob_month"
                    value={v("dob_month")}
                    onChange={handleInputChange}
                    placeholder="MM"
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Year
                  </label>
                  <input
                    name="dob_year"
                    value={v("dob_year")}
                    onChange={handleInputChange}
                    placeholder="YYYY"
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>
              </div>
            </div>

            {/* Physical Measurements Section */}
            <div className="space-y-4 pt-4 border-t border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Physical Measurements
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    name="height"
                    value={v("height")}
                    onChange={handleInputChange}
                    placeholder="e.g., 170"
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    name="weight"
                    type="number"
                    min="0"
                    step="0.1"
                    value={v("weight")}
                    onChange={handleInputChange}
                    placeholder="e.g., 70"
                    className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur"
                  />
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="space-y-4 pt-4 border-t border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Medical Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Medications
                </label>
                <textarea
                  name="current_med"
                  value={v("current_med")}
                  onChange={handleInputChange}
                  placeholder="List your current medications (separated by commas)"
                  className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Medical History
                </label>
                <textarea
                  name="medical_history"
                  value={v("medical_history")}
                  onChange={handleInputChange}
                  placeholder="Describe any relevant medical history (separated by commas)"
                  className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-white/50 backdrop-blur h-28"
                />
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="space-y-4 pt-4 border-t border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">5</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Lifestyle & Habits
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Exercise
                  </label>
                  <CustomSelect
                    name="exercise"
                    value={v("exercise")}
                    onChange={handleInputChange}
                    placeholder="Select exercise level"
                    options={exerciseOptions}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Diet
                  </label>
                  <CustomSelect
                    name="diet"
                    value={v("diet")}
                    onChange={handleInputChange}
                    placeholder="Select diet type"
                    options={dietOptions}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Alcohol *
                  </label>
                  <CustomSelect
                    name="alcohol_cons"
                    value={v("alcohol_cons")}
                    onChange={handleInputChange}
                    placeholder="Select consumption"
                    options={alcoholOptions}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Smoking *
                  </label>
                  <CustomSelect
                    name="smoke_cons"
                    value={v("smoke_cons")}
                    onChange={handleInputChange}
                    placeholder="Select consumption"
                    options={smokeOptions}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                COMPLETE PROFILE
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-200/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">ℹ️</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">
                Why do we need this information?
              </h4>
              <p className="text-sm text-slate-600">
                Your health profile helps us provide personalized insights and
                accurate predictions. All information is encrypted and securely
                stored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
