import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Need this to avoid '"category" is not a registered scale' error

export default function CustomCharts(props) {
  const data = {
    labels: props.labels,
    datasets: props.datasets,
    //   label: "Dataset 1",
    //   data: Utils.numbers(NUMBER_CFG),
    //   borderColor: Utils.CHART_COLORS.red,
    //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    // },
    // {
    //   label: "Dataset 2",
    //   data: Utils.numbers(NUMBER_CFG),
    //   borderColor: Utils.CHART_COLORS.blue,
    //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
    // },
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
  };

  // const [chartData, setChartData] = useState({
  //   labels: ["Boston", "Worcester", "Springfield", "Lowel", "Cambridge"],
  //   datasets: [
  //     {
  //       label: "Population",
  //       data: [117594, 181455, 153060, 106519, 105162],
  //       backgroundColor: "#303F9F",
  //       // "#A52885",
  //       // "#F4888B",
  //       // "#F39617",
  //       // "#2EB2A5",
  //       // "#453187"
  //     },
  //   ],
  // });

  return (
    <>
      <Typography variant="h6">Log Statistics</Typography>
      <Line
        data={data}
        options={{
          maintainAspectRatio: true,
          title: {
            display: true,
            text: "Largest cities of Massachusetts",
            /* fontSize: 25 */
          },
          legend: { display: true, position: "bottom" },
        }}
      />
    </>
  );
}
