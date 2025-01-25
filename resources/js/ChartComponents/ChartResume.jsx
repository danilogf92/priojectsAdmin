import { Card, DonutChart, List, ListItem } from "@tremor/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const currencyFormatter = (number) => {
  return Intl.NumberFormat("us").format(number).toString() + " m³ ";
};

export default function ChartResume({ data, name, total }) {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg bg-slate-50 shadow-lg">
        <h3 className="text-center text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {name.toUpperCase()}
        </h3>
        <DonutChart
          className="mt-8"
          data={data}
          category="amount"
          index="name"
          valueFormatter={currencyFormatter}
          showTooltip={false}
          colors={[
            "amber",
            "green",
            "red",
            "cyan",
            "blue",
            "indigo",
            "violet",
            "fuchsia",
          ]}
        />

        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Category</span>
          <span>m³ / Percentage</span>
        </p>
        <List className="mt-2">
          {data.map((item) => (
            <ListItem key={item.name} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className={classNames(
                    item.color,
                    "h-2.5 w-2.5 shrink-0 rounded-sm"
                  )}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-dark-tremor-content-emphasis">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {currencyFormatter(item.amount)}
                </span>
                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                  {item.share}
                </span>
              </div>
            </ListItem>
          ))}
        </List>
        <p className="text-center mt-4 text-lg text-tremor-content dark:text-dark-tremor-content">
          Total: {currencyFormatter(total)}
        </p>
      </Card>
    </>
  );
}
