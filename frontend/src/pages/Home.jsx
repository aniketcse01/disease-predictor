import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import DiseasePredictorBlock from "../components/DiseasePredictorBlock";
import About from "../components/About";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />
      <main>
        <Hero />
        <Services />
        <DiseasePredictorBlock />
        <About />
      </main>
      <Footer />
    </div>
  );
}
