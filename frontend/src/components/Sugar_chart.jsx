// src/components/Sugar_chart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler, // <-- added
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler // <-- register filler plugin
);

function toNumberOrNull(v) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function Sugar_chart({ chartData = {} }) {
  const { after = [], before = [], date = [] } = chartData || {};

  const safeBefore = (Array.isArray(before) ? before : []).map(toNumberOrNull);
  const safeAfter = (Array.isArray(after) ? after : []).map(toNumberOrNull);
  const safeDate = Array.isArray(date) ? date : [];

  const hasData =
    safeDate.length > 0 &&
    (safeBefore.some((v) => v !== null) || safeAfter.some((v) => v !== null));

  if (!hasData) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-dashed border-blue-300 shadow-lg">
        <p className="text-5xl mb-3">📊</p>
        <p className="text-slate-700 text-center font-bold text-lg">
          No glucose data available
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
        label: "Before",
        data: safeBefore,
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 3,
        pointHoverBackgroundColor: "rgba(16, 185, 129, 1)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 4,
      },
      {
        label: "After",
        data: safeAfter,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 3,
        pointHoverBackgroundColor: "rgba(99, 102, 241, 1)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 4,
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
        text: "Blood Glucose Levels",
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
      <Line data={data} options={options} />
    </div>
  );
}
