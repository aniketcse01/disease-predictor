// src/components/BP_chart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function toNumberOrNull(v) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function BP_chart({ chartData = {} }) {
  const { low = [], date = [], high = [] } = chartData;

  const safeLow = (Array.isArray(low) ? low : []).map(toNumberOrNull);
  const safeHigh = (Array.isArray(high) ? high : []).map(toNumberOrNull);
  const safeDate = Array.isArray(date) ? date : [];

  // Check if there's any data
  const hasData =
    safeDate.length > 0 &&
    (safeLow.some((v) => v !== null) || safeHigh.some((v) => v !== null));

  if (!hasData) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-dashed border-red-300 shadow-lg">
        <p className="text-5xl mb-3">💓</p>
        <p className="text-slate-700 text-center font-bold text-lg">
          No blood pressure data available
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Add readings to see the chart
        </p>
      </div>
    );
  }

  const data = {
    labels: safeDate,
    datasets: [
      {
        label: "Low",
        data: safeLow,
        backgroundColor: "rgba(236, 72, 153, 0.8)",
        borderColor: "rgba(236, 72, 153, 1)",
        borderWidth: 2,
        borderRadius: 8,
        yAxisID: "y",
        hoverBackgroundColor: "rgba(236, 72, 153, 1)",
      },
      {
        label: "High",
        data: safeHigh,
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 2,
        borderRadius: 8,
        yAxisID: "y",
        hoverBackgroundColor: "rgba(139, 92, 246, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: {
        display: true,
        text: "Blood Pressure Readings",
        font: { size: 18, weight: "bold", family: "Poppins" },
        padding: 20,
        color: "#1e293b",
      },
      legend: {
        position: "top",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { size: 13, weight: "600" },
          color: "#475569",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        padding: 16,
        titleFont: { size: 15, weight: "bold" },
        bodyFont: { size: 14 },
        borderRadius: 12,
        borderColor: "rgba(148, 163, 184, 0.3)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 13, weight: "600" },
          color: "#64748b",
        },
        grid: { color: "rgba(148, 163, 184, 0.1)" },
      },
      x: {
        ticks: {
          font: { size: 13, weight: "600" },
          color: "#64748b",
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-80 bg-white rounded-2xl p-4 shadow-sm">
      <Bar options={options} data={data} />
    </div>
  );
}
