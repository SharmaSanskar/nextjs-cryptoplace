import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PredictedChart({ result }) {
  const data = {
    labels: result.dates.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: "Predicted Price",
        data: result.prices,
        fill: true,
        backgroundColor: "#241F4C",
        borderColor: "#6366F1",
        borderWidth: 1,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}
