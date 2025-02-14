import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { colorPalette } from "@/utils/functions";

const PieChartGraph = ({ data }) => {
  const formattedData = data.map((item) => {
    console.log(item);
    const nameKey = Object.keys(item).find((key) => key !== "total");

    return {
      name: item[nameKey],
      total: Number(item.total),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="total"
          label={({ name, total }) => `${name}: ${total}`}
        >
          {formattedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorPalette[index % colorPalette.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartGraph;
