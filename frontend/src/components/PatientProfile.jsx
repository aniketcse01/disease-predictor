// src/components/PatientProfile.jsx
import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import Record from "./Record";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import Sugar_chart from "./Sugar_chart";
import Personal from "./Personal";
import MedicalHistory from "./Medical History";
import ConsumptionModal from "./ConsumptionModal";

const PatientProfile = ({ responseData = {} }) => {
  const [record, setRecord] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [consumptionModal, setConsumptionModal] = useState(false);

  const { first_name, height, weight, last_name } = responseData || {};
  const [bmi, setBmi] = useState(0);
  const [bmiColor, setBmiColor] = useState("");
  const [bmiLabel, setBmiLabel] = useState("");

  useEffect(() => {
    const calculateBMI = () => {
      const h = parseFloat(height);
      const w = parseFloat(weight);
      if (!h || !w) {
        setBmi(0);
        setBmiColor("");
        setBmiLabel("");
        return;
      }
      const heightInMeters = h / 100;
      const bmiValue = w / (heightInMeters * heightInMeters);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setBmiColor("from-purple-500 to-purple-600");
        setBmiLabel("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiColor("from-green-500 to-emerald-600");
        setBmiLabel("Normal");
      } else if (bmiValue >= 24.9 && bmiValue < 29.9) {
        setBmiColor("from-orange-500 to-amber-600");
        setBmiLabel("Overweight");
      } else {
        setBmiColor("from-red-500 to-rose-600");
        setBmiLabel("Obese");
      }
    };
    calculateBMI();
  }, [height, weight]);

  // If the profile explicitly indicates a new patient, don't render profile UI
  if (responseData?.new_patient) {
    return null;
  }

  const fullName = `${first_name || ""} ${last_name || ""}`.trim();

  return (
    <div className="w-full">
      {responseData && Object.keys(responseData).length > 0 ? (
        <div className="max-w-[1600px] mx-auto px-6 pb-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 w-24 rounded-2xl flex-shrink-0 shadow-2xl border border-slate-700/50">
              <Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
                setConsumptionModal={setConsumptionModal}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-3xl p-8 flex justify-between items-center shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <p className="text-white/90 text-sm font-semibold mb-2">
                    Welcome back,
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {fullName || "Patient"}
                  </h1>
                  <p className="text-white/80 text-base mt-2">
                    Let's check your health today! 🏥
                  </p>
                </div>

                {/* BMI Card */}
                <div className="relative z-10 bg-white/95 backdrop-blur-xl px-8 py-6 rounded-2xl border border-white/50 shadow-xl">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Body Mass Index
                  </p>
                  <div
                    className={`w-24 h-16 rounded-xl bg-gradient-to-br ${bmiColor} flex items-center justify-center shadow-lg mb-2`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {isNaN(bmi) ? "0.0" : Number(bmi).toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    {bmiLabel}
                  </p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <BP_chart
                    chartData={
                      responseData.bp_log || { date: [], high: [], low: [] }
                    }
                  />
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <Sugar_chart
                    chartData={
                      responseData.blood_glucose || {
                        date: [],
                        before: [],
                        after: [],
                      }
                    }
                  />
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300">
                <Personal responseData={responseData} />
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-pink-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <Calendar />
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <MedicalHistory data={responseData.medical_history} />
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <span>📊</span> Glucose Levels
                  </h2>
                  <div className="flex-grow">
                    <GlucoseLevel responseData={responseData} />
                  </div>
                </div>
              </div>

              {/* Blood Pressure */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span>💓</span> Blood Pressure Logs
                </h2>
                <div className="flex-grow">
                  <BP_Log responseData={responseData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg font-semibold">
              Loading your dashboard...
            </p>
          </div>
        </div>
      )}

      <Record setRecord={setRecord} record={record} />
      <LogModal setLogModal={setLogModal} logModal={logModal} />
      <ProfileModal
        setProfileModal={setProfileModal}
        profileModal={profileModal}
        responseData={responseData}
      />
      <ConsumptionModal
        consumptionModal={consumptionModal}
        setConsumptionModal={setConsumptionModal}
      />
    </div>
  );
};

export default PatientProfile;
