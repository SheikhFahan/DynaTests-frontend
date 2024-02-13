import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ProgressBarChart = ({ solved , total, type}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        // Destroy existing chart instance
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [''],
          datasets: [{
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [solved],
            borderRadius : 4,
            // barPercentage: 0.2,
            minBarLength:2 ,
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              display : false,
              beginAtZero: true,
              min: 0,
              max: total,
              ticks: {
                stepSize: 5
              }
            },
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              padding : 0,
              margin :0
              
            },

          }
        }
      });
    }


    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [solved]);

  return(
    <div className='h-20'>
       <canvas ref={chartRef} />
    </div>
  )
};

export default ProgressBarChart;