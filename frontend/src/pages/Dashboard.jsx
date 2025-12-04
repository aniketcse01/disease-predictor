// src/components/Dashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PatientForm from "../components/PatientForm";
import PatientProfile from "../components/PatientProfile";
import { useGlobalContext } from "../components/context";
import Footer from "../components/Footer";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Dashboard = () => {
  const { handleInputChange, formData, handleFormSubmit, data, fetchData } =
    useGlobalContext();

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && data.new_patient === false) {
      setShowProfile(true);
      setTimeout(() => {
        if (profileRef.current && profileRef.current.scrollIntoView) {
          profileRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 60);
    } else {
      setShowProfile(false);
    }
  }, [data]);

  useEffect(() => {
    document.body.style.pointerEvents = "";
    return () => {
      document.body.style.pointerEvents = "";
    };
  }, []);

  function handleFormSubmitted() {
    setShowProfile(true);
    setTimeout(() => {
      if (profileRef.current && profileRef.current.scrollIntoView) {
        profileRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 60);
  }

  return (
    <div className="min-h-screen relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full pt-24 pb-8 relative z-10">
        {/* If not submitted yet, show the form */}
        {!showProfile && (
          <div className="max-w-[1280px] mx-auto px-8">
            <PatientForm
              profileData={formData}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              onSubmitted={handleFormSubmitted}
            />
          </div>
        )}

        {/* The profile + charts area */}
        <div ref={profileRef}>
          <PatientProfile responseData={data} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
