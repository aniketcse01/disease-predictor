import React from "react";
import hero_img from "../img/hero-img.svg";
import CTA from "./CTA";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/30 via-pink-100/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 via-cyan-100/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-12 items-center gap-16">
          {/* LEFT: text column */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ✨ Welcome to the Future of Healthcare
              </span>
            </div>

            <h1
              className="hero-text text-5xl lg:text-6xl font-bold"
              style={{ lineHeight: 1.15 }}
            >
              Your Healthcare,
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="hero-stanza text-lg max-w-[520px] text-slate-600">
              Experience optimal health with simplified solutions, just a click
              away! Personalized care powered by advanced Machine Learning
              technology.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <CTA variant="primary">JOIN US!</CTA>
              <CTA variant="outline-green">ALREADY A MEMBER?</CTA>
            </div>
          </div>

          {/* RIGHT: illustration with enhanced styling */}
          <div className="col-span-12 lg:col-span-7 flex justify-end">
            <div className="relative w-full max-w-[880px] hero-image-frame">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-3xl blur-2xl -z-10" />

              <img
                src={hero_img}
                alt="Hero illustration"
                className="w-full h-auto object-contain hero-zoom"
                style={{ maxHeight: 720 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
