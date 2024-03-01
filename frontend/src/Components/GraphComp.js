import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Radar, Line } from "react-chartjs-2";
import RateOfChangeCalculator from './RateOfChangeCalculator'

const GraphComp = ({ data , aspectRatioValue  }) => {

  const dateLabels = data.map((entry) =>
    new Date(entry.timestamp).toLocaleDateString()
  );
  const scores = data.map((entry) => entry.score);

  // const maxScore = Math.max(...scores);

  

  const chartOptions = {
    aspectRatio :aspectRatioValue,
    scales: {
      x: {
        display: false, // Hide the x-axis labels
      },
      y :{
        beginAtZero : true,
      }
    },
  };
  const chartData = {
    labels: dateLabels,
    datasets: [
      {
        label: "Scores Over Time",
        data: scores,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div className=" flex flex-col items-center w-full h-full">
      <Line data={chartData}  options={chartOptions}/>
     
    </div>
  );
};

export default GraphComp;
