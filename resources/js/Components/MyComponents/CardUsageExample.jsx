import { Card, SparkAreaChart } from "@tremor/react";

export function CardUsageExample({ name, value }) {
  const dataFormatter = (value) =>
    `${Intl.NumberFormat("en-US").format(value)} m³`; // Cambiado a "en-US" para formatear números en inglés de Estados Unidos

  return (
    <Card
      className="mx-auto max-w-xs bg-slate-50 shadow-lg"
      decoration="top"
      decorationColor="rose"
    >
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {name}
      </p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        {dataFormatter(value)}
      </p>
    </Card>
  );
}
