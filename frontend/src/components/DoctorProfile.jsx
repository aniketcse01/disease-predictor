// src/components/DoctorProfile.jsx
import React, { useId } from "react";
import { Link } from "react-router-dom";
import userIcon from "../img/user_icon.webp";

const safeGet = (obj, ...keys) => {
  if (!obj) return undefined;
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return undefined;
};

const DoctorCard = ({ doctor }) => {
  const idSuffix = useId();

  const name =
    (doctor.user && (doctor.user.first_name || doctor.user.username)) ||
    safeGet(doctor, "user")?.username ||
    safeGet(doctor, "name") ||
    safeGet(doctor, "full_name") ||
    doctor.username ||
    "Dr. Name";

  const speciality =
    safeGet(doctor, "specialization") ||
    safeGet(doctor, "speciality") ||
    safeGet(doctor, "special") ||
    "Speciality";

  const phone =
    safeGet(doctor, "phone") ||
    safeGet(doctor, "mobile_no") ||
    safeGet(doctor, "contact") ||
    "";

  const address =
    safeGet(doctor, "clinic_address") ||
    safeGet(doctor, "work_address") ||
    safeGet(doctor, "address") ||
    "";

  const experience =
    safeGet(doctor, "experience") ||
    safeGet(doctor, "years_experience") ||
    null;

  const image =
    safeGet(doctor, "image_link") || safeGet(doctor, "image") || userIcon;

  const stableId = doctor.id || doctor.username || idSuffix;

  return (
    <article
      className="group relative bg-white/80 backdrop-blur-xl border border-purple-100/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      aria-labelledby={`doc-${stableId}`}
    >
      {/* Avatar with gradient ring */}
      <div className="relative -mt-14 mb-4">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <div className="w-full h-full rounded-full bg-white overflow-hidden">
            <img
              src={image}
              alt={`Avatar of ${name}`}
              width={112}
              height={112}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => {
                if (e.currentTarget.src !== userIcon) {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = userIcon;
                }
              }}
            />
          </div>
        </div>
        {/* Online indicator */}
        <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white shadow-sm"></span>
      </div>

      <h3
        id={`doc-${stableId}`}
        className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
      >
        {name}
      </h3>

      <p className="text-sm text-slate-600 mt-1 font-medium">{speciality}</p>

      {experience && (
        <div className="mt-3 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
          <span className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {experience} Years Experience
          </span>
        </div>
      )}

      {/* Address */}
      {address && (
        <div className="w-full mt-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
          <h4 className="text-xs font-semibold text-slate-700 mb-1">
            📍 Clinic Address
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed break-words">
            {address}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="w-full mt-4 flex gap-2">
        <a
          href={phone ? `tel:${phone}` : undefined}
          aria-disabled={!phone}
          className={`flex-1 flex items-center justify-center h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
            phone
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:shadow-xl hover:scale-105"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (!phone) e.preventDefault();
          }}
        >
          📞 Contact
        </a>

        <Link
          to={doctor.profile_link || "#"}
          className="flex-1 flex items-center justify-center h-10 rounded-xl text-sm font-semibold border-2 border-purple-200 text-purple-600 bg-white transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent hover:shadow-xl hover:scale-105"
          aria-label={`View profile of ${name}`}
        >
          👤 Profile
        </Link>
      </div>
    </article>
  );
};

const DoctorProfile = ({ doctors = [] }) => {
  return (
    <section className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-12">
      {doctors.map((doc, idx) => (
        <DoctorCard key={doc.id || doc.user?.id || idx} doctor={doc} />
      ))}
    </section>
  );
};

export default DoctorProfile;
