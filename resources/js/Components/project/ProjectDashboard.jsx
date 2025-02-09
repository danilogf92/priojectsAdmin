// import React from "react";

// const ProjectDashboard = ({ dashboardItems }) => {
//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {dashboardItems.map((item, index) => (
//           <div key={index} className="p-4 bg-gray-100 rounded shadow">
//             <h4 className="text-md font-medium">{item.title}</h4>
//             <p className="text-xl font-bold">{item.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectDashboard;

import React from "react";

const ProjectDashboard = ({ dashboardItems }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dashboardItems.map((item, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded shadow">
            <h4 className="text-md font-medium">{item.title}</h4>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;
