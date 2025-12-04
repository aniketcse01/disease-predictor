import React from "react";
import patternImg from "../img/pattern.svg";

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-blue-200/30 to-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-8 about-section">
        <div className="grid grid-cols-12 items-center gap-16 p-12">
          {/* LEFT TEXT */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                💡 About Us
              </span>
            </div>

            <h2 className="about-title text-4xl font-extrabold">
              About Medlytics
            </h2>

            <p className="about-desc text-slate-700 text-lg leading-relaxed">
              Your one-stop healthcare provider. Our innovative medical
              dashboard and disease predictor offer personalized insights into
              your health.
            </p>

            <p className="about-desc text-slate-600 leading-relaxed">
              Experience the difference in exceptional care and advanced Machine
              Learning technologies with Medlytics.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4 pt-4">
              {[
                "Advanced ML-powered diagnostics",
                "Intelligent symptom analysis",
                "Secure & encrypted platform",
                "Personalized health recommendations",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end about-illustration-frame">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10" />

              <img
                src={patternImg}
                alt="About illustration"
                className="about-illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
