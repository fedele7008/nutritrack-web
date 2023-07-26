import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Need this to avoid '"category" is not a registered scale' error

export default function CustomCharts(props) {
  const data = {
    labels: props.labels,
    datasets: props.datasets,
  };

  return (
    <>
      <Line
        data={data}
        options={{
          maintainAspectRatio: true,
          legend: { display: true, position: "bottom" },
        }}
      />
    </>
  );
}
