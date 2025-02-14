import PieChartGraph from "@/ChartComponents/PieChartGraph";
import RadarChartGraph from "@/ChartComponents/RadarChartGraph";
import ResumeGraph from "@/ChartComponents/ResumeGraph";
import StackedBarChart from "@/ChartComponents/StackedBarChart";
import StackedBarChart2 from "@/ChartComponents/StackedBarChart2";
import React from "react";

const ProjectDashboard = ({
  dashboardItems,
  stackedData,
  stackedData2,
  resume,
  resumePercentage,
  accountBalanceRealValue,
  accountBalanceBookedValue,
  children,
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {children}

      {/* Sección de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dashboardItems.map((item, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded shadow">
            <h4 className="text-md font-medium">{item.title}</h4>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Sección de gráficos */}
      <div className="mt-6 mb-12 h-1/2">
        <div className="flex justify-center gap-4 mb-2">
          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center ">
              Classification
            </h2>
            <StackedBarChart2 data={stackedData} />
          </div>

          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center">Resume for</h2>
            <StackedBarChart data={stackedData2} />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center ">Resume</h2>
            <ResumeGraph data={resume} />
          </div>

          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center">Resume %</h2>
            <ResumeGraph data={resumePercentage} />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center ">Title?</h2>
            <PieChartGraph data={stackedData} />
          </div>

          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center">
              Account Balance with Real Value
            </h2>
            <PieChartGraph data={accountBalanceRealValue} />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center ">Title?</h2>
            <RadarChartGraph data={stackedData} />
          </div>

          <div className="w-1/2 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center">
              Account Balance with Real Value
            </h2>
            <PieChartGraph data={accountBalanceBookedValue} />
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(stackedData, undefined, 2)}</pre> */}
    </div>
  );
};

export default ProjectDashboard;
