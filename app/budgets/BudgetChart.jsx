import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useAppSelector } from "@/lib/hooks";

const DoughnutChart = () => {
  const { budgetData } = useAppSelector((state) => state.finance);
  const { spentMoney, maximum } = budgetData.reduce(
    (acc, budget) => {
      return {
        spentMoney: acc.spentMoney + budget.spentMoney,
        maximum: acc.maximum + budget.maximum,
      };
    },
    {
      spentMoney: 0,
      maximum: 0,
    },
  );

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: budgetData.map((budget) => budget.category),
        datasets: [
          {
            data: budgetData.map((budget) => Math.abs(budget.spentMoney)), // Dynamic data: used and remaining
            backgroundColor: budgetData.map((budget) => budget.theme), // Colors for segments
            borderWidth: 0, // Remove borders
          },
        ],
      },
      options: {
        cutout: "60%", // Makes the center hollow
        plugins: {
          legend: {
            display: false, // Hides the legend
          },
          tooltip: {
            enabled: true, // Enables tooltips
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [budgetData]);

  return (
    <div style={{ position: "relative", width: "250px", height: "250px" }}>
      <canvas ref={chartRef}></canvas>
      {/* Center Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h2 className="mb-2 text-3xl font-bold text-grey-900">${spentMoney}</h2>
        <p className="text-base text-grey-500">of ${maximum} limit</p>
      </div>
    </div>
  );
};

export default DoughnutChart;
