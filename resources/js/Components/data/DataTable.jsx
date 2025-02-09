// components/DataTable.jsx
import React from "react";
import { Link } from "@inertiajs/react";

export default function DataTable({
  data,
  auth,
  setDataToDelete,
  setIsDeleteModalOpen,
}) {
  return (
    <div className="m-2">
      <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50 rounded-lg">
        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 rounded-lg">
          <tr>
            <th scope="col" className="px-2 py-3">
              Area
            </th>
            <th scope="col" className="px-2 py-3">
              Group 1
            </th>
            <th scope="col" className="px-2 py-3">
              Group 2
            </th>
            <th scope="col" className="px-2 py-3">
              Calsification
            </th>
            <th scope="col" className="px-2 py-3">
              Item Type
            </th>
            <th scope="col" className="px-2 py-3">
              Unit
            </th>
            <th scope="col" className="px-2 py-3">
              Qty
            </th>
            <th scope="col" className="px-2 py-3">
              Unit price
            </th>
            <th scope="col" className="px-2 py-3">
              Global Price
            </th>
            <th scope="col" className="px-2 py-3">
              Stage
            </th>
            <th scope="col" className="px-2 py-3">
              Real
            </th>
            <th scope="col" className="px-2 py-3">
              Booked
            </th>
            {auth.user.roles.includes("Project") && (
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
            >
              <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.area}
              </td>

              <td className="px-2 py-2">{item.group_1}</td>
              <td className="px-2 py-2">{item.group_2}</td>
              <td className="px-2 py-2">{item.general_classification}</td>
              <td className="px-2 py-2">{item.item_type}</td>
              <td className="px-2 py-2">{item.unit}</td>
              <td className="px-2 py-2">{item.qty}</td>
              <td className="px-2 py-2">{item.unit_price}</td>
              <td className="px-2 py-2">{item.global_price}</td>
              <td className="px-2 py-2">{item.stage}</td>
              <td className="px-2 py-2">{item.real_value}</td>
              <td className="px-2 py-2">{item.booked}</td>
              {auth.user.roles.includes("Project") && (
                <td className="py-2 text-center">
                  <Link
                    className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                    href={route("data.edit", item.id)}
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      setDataToDelete(project);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
    </div>
  );
}
