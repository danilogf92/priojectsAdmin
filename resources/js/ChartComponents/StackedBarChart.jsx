import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const StackedBarChart = ({ data }) => {
  // Extrae todas las claves excepto "name" (que representa las categorías)
  const keys = Object.keys(data[0]).filter((key) => key !== "name");

  // Paleta de colores extendida
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#a29bfe",
    "#6c5ce7",
    "#d72631",
    "#ff6b6b",
    "#4ecdc4",
    "#1a535c",
    "#f7b731",
    "#e17055",
    "#fdcb6e",
    "#00cec9",
    "#0984e3",
    "#e84393",
    "#636e72",
    "#b2bec3",
  ];

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colors[index % colors.length]}
            >
              <LabelList dataKey={key} position="center" fill="#fff" />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
