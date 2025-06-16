import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useAppSelector } from "../lib/redux/controls";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

type LineChartProps = {
  labels?: string[];
  dataset?: any[];
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      min: 0,
    },
  },
  tension: 0.4,
  plugins: {
    legend: {
      display: false, 
    },
  },
};

const defaultLabels: string[] | undefined = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const LineChart: React.FC<LineChartProps> = ({
  labels = defaultLabels,
}) => {
  // const paymentReport = useAppSelector(state => state.dashboard.paymentReport);

  // Fallback dummy data: payments in cents for each month
  const dummyPaymentData = [
    120000,  // Jan
    95000,   // Feb
    102000,  // Mar
    110000,  // Apr
    87000,   // May
    113000,  // Jun
    99000,   // Jul
    108000,  // Aug
    97000,   // Sep
    125000,  // Oct
    111000,  // Nov
    135000,  // Dec
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: (dummyPaymentData).map((item: number) => item / 100),
        borderColor: "#071C23",
        backgroundColor: "rgba(63, 164, 110, 0.1)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHitRadius: 10,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
