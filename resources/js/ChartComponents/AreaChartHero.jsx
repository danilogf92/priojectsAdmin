import { AreaChart } from "@tremor/react";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()} m³`;

export function AreaChartHero({ chartdata }) {
  return (
    <AreaChart
      className="h-80"
      data={chartdata}
      index="date"
      categories={["Ciesa 1", "Ciesa 2"]}
      colors={["cyan", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={100}
      onValueChange={(v) => console.log(v)}
    />
  );
}
