import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ questionsSolved, totalQuestions }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const doughnutLabel = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;

      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = '20px Sans-serif';
      ctx.fillText(`${questionsSolved}/ `, centerX-7, centerY);
      ctx.font = ' 13px Sans-serif';
      ctx.fillText(`${totalQuestions}`, centerX+(totalQuestions/100>1 ? 16:5), centerY+6);
      ctx.textAlign = "center";

    },
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        // Destroy existing chart instance
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Solved", "Remaining"],
          datasets: [
            {
              data: [questionsSolved, totalQuestions - questionsSolved],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)", // Questions Attempted
                "rgba(255, 99, 132, 0.2)", // Remaining
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)", // Questions Attempted
                "rgba(255, 99, 132, 1)", // Remaining
              ],
              borderWidth: 1,
            },
          ],
        },        options: {
            plugins: {
              title: {
                display: true,
                text: 'Questions Attempted vs Remaining'
              },
              
            }
          },
        plugins: [doughnutLabel],
      });
    }

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [questionsSolved, totalQuestions]);

  return (
    <div className="h-full">
      <canvas
        ref={chartRef}
      />
    </div>
  );
};

export default DoughnutChart;
