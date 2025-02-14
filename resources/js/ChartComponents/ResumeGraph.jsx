import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = ["#5BCA5A", "#CC5555", "#FFA500", "#800080"];

const ResumeGraph = ({ data }) => {
  // Filtrar solo valores numéricos
  const filteredData = data.filter((item) => typeof item.value === "number");

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={filteredData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" label={{ position: "inside", fill: "#fff" }}>
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResumeGraph;
