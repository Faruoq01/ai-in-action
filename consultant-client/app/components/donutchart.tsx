"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../lib/redux/controls";

ChartJS.register(ArcElement, Tooltip, Legend);

export const getDataset = (data: any) => {
  return {
    datasets: [
      {
        label: "",
        data: data?.map((item: any) => item?.applicationCount),
        backgroundColor: ["#75a39b", "#d0aef2", "#22c7a4", "#319cb9", "#95b736", "#1f31d0"],
        borderColor: ["#75a39b", "#d0aef2", "#22c7a4", "#319cb9", "#95b736", "#1f31d0"],
        borderWidth: 1,
      },
    ],
  };
}

const DoughnutChart: React.FC = () => {
  const studentstats = useAppSelector(state => state.dashboard.studentstats);

  const dataset = getDataset(studentstats)
  
  return (
    <div style={{width: 180, height: 180}}>
      <Doughnut
        data={dataset}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const dataset = tooltipItem.dataset;
                  const data = dataset.data as number[];
                  const total = data.reduce((acc, value) => acc + value, 0);
                  const currentValue = data[tooltipItem.dataIndex];
                  const percentage = ((currentValue / total) * 100).toFixed(2); 
                  return `${dataset.label}: ${currentValue} (${percentage}%)`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
