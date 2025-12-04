import React from "react";
import { useNavigate } from "react-router-dom";
import CTA from "./CTA";
import diseaseImg from "../img/diseasepredictor.svg";

export default function DiseasePredictorBlock() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-green-200/30 to-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-lime-200/30 to-green-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-12 items-center gap-16">
          {/* LEFT: large mint card with illustration */}
          <div className="col-span-12 lg:col-span-7 flex items-center justify-start dp-image-col">
            <div className="dp-image-frame w-full group">
              <img
                src={diseaseImg}
                alt="Disease predictor illustration"
                className="dp-image"
                draggable="false"
              />
            </div>
          </div>

          {/* RIGHT: content */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
              <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                🤖 ML-Powered Health Assistant
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1]">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Feeling
              </span>{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                low?
              </span>
            </h3>

            <p className="text-slate-600 text-lg max-w-[560px] leading-relaxed">
              Use our built-in Disease Predictor powered by advanced Machine
              Learning algorithms and get personalized recommendations and
              medical assistance based on your symptoms.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200/50 hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-green-600">95%+</div>
                <div className="text-sm text-slate-600 mt-1">Accuracy Rate</div>
              </div>
              <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-slate-600 mt-1">Available</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <CTA variant="primary">DISEASE PREDICTOR</CTA>
              <CTA variant="outline-green" onClick={() => navigate("/#about")}>
                LEARN MORE
              </CTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
