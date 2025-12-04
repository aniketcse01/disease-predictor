import React from "react";
import servicesImg from "../img/services-img.svg";

export default function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for your convenience
          </p>
        </div>

        <div className="grid grid-cols-12 items-center gap-16">
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[520px]">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl blur-2xl opacity-40" />

              <div className="relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-purple-100/50">
                <img
                  src={servicesImg}
                  alt="Services illustration"
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-8">
              <h2 className="hero-text text-3xl lg:text-4xl font-bold">
                Access Quality Healthcare Assistance Anytime, Anywhere
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed">
                Medlytics provides you with your go-to Healthcare Services at
                the ease of your device from any location!
              </p>

              {/* Feature cards */}
              <div className="grid gap-4 mt-8">
                {[
                  {
                    icon: "🔬",
                    title: "ML-Powered Diagnosis",
                    desc: "Advanced disease prediction using Machine Learning",
                  },
                  {
                    icon: "📊",
                    title: "Health Dashboard",
                    desc: "Track your health metrics in real-time",
                  },
                  {
                    icon: "👨‍⚕️",
                    title: "Doctor Directory",
                    desc: "Find and connect with qualified specialists",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="group p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
