import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChartComp = ({ labels, values }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Data",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        data: values,
      },
    ],
  };

  const options = {

    scale: {
      r: {
          angleLines: {
              display: false
          },
          suggestedMin: 0,
          suggestedMax: values.length+1
      },
  }
    
  };
 
  return <Radar data={data} options={options} className="" />;
};

export default RadarChartComp;
