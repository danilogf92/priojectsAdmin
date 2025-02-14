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

const validTypes = [
  "area",
  "general_classification",
  "group_1",
  "group_2",
  "item_type",
  "stage",
  "supplier",
];

const StackedBarChart2 = ({ data }) => {
  // Detectar la clave válida del eje X (primer key que esté en validTypes)
  const xAxisKey =
    validTypes.find((key) => data.some((item) => key in item)) || "area";

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="total" stackId="a" fill="#ff8042">
          <LabelList dataKey="total" position="top" fill="#000" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart2;
