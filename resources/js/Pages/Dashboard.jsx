import { AreaChartHero } from "@/ChartComponents/AreaChartHero";
import { BarChartHero } from "@/ChartComponents/BarChartHero";
import ChartResume from "@/ChartComponents/ChartResume";
import { CardUsageExample } from "@/Components/MyComponents/CardUsageExample";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
  const functionChangeData = (data) => {
    console.log(data);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <ContainerAuth>
        <div className="mx-auto max-w-screen-lg">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {summary.map((item, index) => (
              <CardUsageExample
                key={index}
                name={item.plant.name}
                value={item.total_difference}
              />
            ))}
          </div> */}
        </div>

        {/* {total.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 py-4">
            {total.map((item, index) => (
              <ChartResume
                key={index}
                data={item.data}
                name={item.plant_name}
                total={item.total}
              />
            ))}
          </div>
        )} */}

        {/* <div className="grid grid-cols-1 bg-slate-50 shadow-lg p-1 rounded-md mt-2">
          <AreaChartHero chartdata={lastMonthData} />
        </div> */}

        {/* <div className="grid grid-cols-1 bg-slate-50 shadow-lg p-1 rounded-md mt-2">
          <BarChartHero
            chartdata={chartData}
            functionChangeData={functionChangeData}
          />
        </div> */}

        {/* <pre>{JSON.stringify(total, undefined, 2)}</pre> */}
        {/* <pre>{JSON.stringify(summary, undefined, 2)}</pre> */}
        {/* <pre>{JSON.stringify(lastMonthData, undefined, 2)}</pre> */}

        {/* <ul className="list-disc pl-5">
          {summary.map((item, index) => (
            <li key={index}>
              {item.plant.name} {item.total_difference}
            </li>
          ))}
        </ul> */}
      </ContainerAuth>
    </AuthenticatedLayout>
  );
}
