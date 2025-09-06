import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export const dataset = [
  {
    antes: 9.315,
    depois: 9.703,
    ganho: "4,1638%",
    month: "BFSTree",
  },
];

export default function BasicBars() {
  return (
    <BarChart xAxis={[{ data: ["BFSTree", "group B", "group C"] }]} series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]} height={300} />
  );
}
