import Modal from "@/Components/Modal";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import ExportButton from "@/Components/MyComponents/ExportButton";
import { NoContent } from "@/Components/MyComponents/NoContent";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const ROWS = 10;

export default function Index({
  auth,
  fuelData,
  queryParams = null,
  fuelEquipment,
  plants,
}) {
  queryParams = queryParams || {};
  const [fuelEquipmentArray, setFuelEquipmentArray] = useState(fuelEquipment);
  const { flash } = usePage().props;
  const [showSuccess, setShowSuccess] = useState(false);
  const [filters, setFilters] = useState({
    date: queryParams.date || "",
    plant_id: queryParams.plant_id || "",
    fuel_equipment_id: queryParams.fuel_equipment_id || "",
    rows: queryParams.rows || ROWS,
  });

  useEffect(() => {
    if (flash.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [flash]);

  const deleteMeasurement = (fuel) => {
    console.log(fuel.id);

    router.delete(route("fuel.destroy", fuel.id), {
      onSuccess: (response) => {
        console.log(response); // AQUI GENERA EL showSuccess
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);

  const onDeleteMeasurement = () => {
    if (!measurementToDelete) return;

    deleteMeasurement(measurementToDelete);
    setIsDeleteModalOpen(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado local de los filtros
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    // Hacer la solicitud a la ruta de índice de medidas usando los filtros actualizados
    router.get(
      route("fuel.index"),
      {
        ...filters,
        [name]: value, // Actualiza el filtro específico que cambió
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const clearFilter = () => {
    setFilters({
      date: "",
      plant_id: "",
      meter_id: "",
      rows: ROWS,
    });

    // Hacer la solicitud a la ruta de índice de medidas usando los filtros actualizados
    router.get(route("fuel.index"));
  };

  useEffect(() => {
    if (filters.plant_id) {
      const filteredEquipments = fuelEquipment.filter(
        (fuelEquipment) =>
          fuelEquipment.plant_id === parseInt(filters.plant_id, 10)
      );
      setFuelEquipmentArray(() => filteredEquipments);
    }
  }, [filters.plant_id]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Fuel Measurement
          </h2>
          {(auth.user.roles.includes("Fuel") ||
            auth.user.permissions.includes("Create Fuel")) && (
            <>
              <Link
                href={route("fuel.create")}
                className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
              >
                New Measure
              </Link>
            </>
          )}
        </div>
      }
    >
      <Head title="Meters" />

      <ContainerAuth>
        {(auth.user.roles.includes("Fuel") ||
          auth.user.permissions.includes("Create Fuel")) && (
          <>
            <ExportButton link="/fuel-data/export" documentName="fuel" />
          </>
        )}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2 my-2">
          {showSuccess && (
            <div className="mt-20 fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center shadow-md">
              <div className="relative">
                <strong className="font-bold block">Success!</strong>
                <span className="block sm:inline">{flash.success}</span>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="absolute top-1 right-1 px-3 focus:outline-none"
                >
                  <svg
                    className="fill-current h-6 w-6 text-green-500 hover:opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.354 5.646a.5.5 0 1 0-.708-.708L10 9.293 6.354 5.646a.5.5 0 1 0-.708.708L9.293 10l-3.647 3.646a.5.5 0 1 0 .708.708L10 10.707l3.646 3.647a.5.5 0 0 0 .708-.708L10.707 10l3.647-3.646z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Filter Form */}
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2">
              <div className="col-span-1">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={queryParams.date}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="plant_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Plant
                </label>
                <select
                  name="plant_id"
                  id="plant_id"
                  value={queryParams.plant_id}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Plant</option>
                  {plants.map((plant) => (
                    <option key={plant.id} value={plant.id}>
                      {plant.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="fuel_equipment_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Equipment
                </label>
                <select
                  name="fuel_equipment_id"
                  id="fuel_equipment_id"
                  value={queryParams.fuel_equipment_id}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Equipment</option>
                  {fuelEquipmentArray.map((equipment) => (
                    <option key={equipment.id} value={equipment.id}>
                      {equipment.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="rows"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rows
                </label>
                <select
                  name="rows"
                  id="rows"
                  value={queryParams.rows}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="col-span-1 flex items-end space-x-2">
                <button
                  onClick={clearFilter}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded shadow"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {fuelData.data.length > 0 && (
            <>
              <div className="m-2">
                <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50 rounded-lg">
                  <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 rounded-lg">
                    <tr>
                      <th scope="col" className="px-2 py-3">
                        Plant
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Equipment
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Start Value
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Final Value
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Difference
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Units
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Start Value KW/h
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Final Value KW/h
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Difference KW/h
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Start Value H
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Final Value H
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Difference H
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Date
                      </th>
                      {auth.user.roles.includes("Fuel") && (
                        <th scope="col" className="px-2 py-3">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {fuelData.data.map((fuel, index) => (
                      <tr
                        key={fuel.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                      >
                        <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {fuel.plant_id}
                        </td>
                        <td className="px-2 py-2">{fuel.fuel_equipment_id}</td>
                        <td className="px-2 py-2">{fuel.start_value}</td>
                        <td className="px-2 py-2">{fuel.end_value} </td>
                        <td className="px-2 py-2">{fuel.difference}</td>
                        <td className="px-2 py-2">
                          {fuel.fuel_equipment_units}
                        </td>
                        <td className="px-2 py-2">{fuel.kw_start_value}</td>
                        <td className="px-2 py-2">{fuel.kw_end_value}</td>
                        <td className="px-2 py-2">{fuel.kw_difference}</td>
                        <td className="px-2 py-2">{fuel.hour_start_value}</td>
                        <td className="px-2 py-2">{fuel.hour_end_value}</td>
                        <td className="px-2 py-2">{fuel.hour_difference}</td>

                        <td className="px-2 py-2 text-nowrap">{fuel.date}</td>
                        {auth.user.roles.includes("Fuel") && (
                          <td className="py-2 text-center">
                            <Link
                              className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                              href={route("fuel.edit", fuel.id)}
                            >
                              Edit
                            </Link>
                            <button
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              onClick={() => {
                                setMeasurementToDelete(fuel);
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
              </div>

              <Modal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                maxWidth="sm"
              >
                <div className="p-6 bg-slate-500 text-white">
                  <h2 className="text-lg font-semibold mb-4">
                    Delete Confirmation
                  </h2>
                  <p className="text-sm text-white mb-8">
                    Are you sure you want to delete this measurement? This
                    action cannot be undone.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={onDeleteMeasurement}
                      className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal>
              {/* <Pagination links={fuelData.meta.links} /> */}
              <Pagination links={fuelData.meta.links} filters={filters} />
            </>
          )}
          {fuelData.data.length === 0 && (
            <NoContent text={"No Content"} icon={"🛢"} />
          )}

          {/* <pre>{JSON.stringify(fuelData, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(filters, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(fuelData, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(auth.user, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(auth.user.permissions, undefined, 2)}</pre> */}
        </div>
      </ContainerAuth>
    </AuthenticatedLayout>
  );
}
