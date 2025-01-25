import Modal from "@/Components/Modal";
import ContainerAuth from "@/Components/MyComponents/ContainerAuth";
import { NoContent } from "@/Components/MyComponents/NoContent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Pagination from "@/Components/Pagination";

export default function Index({
  auth,
  data,
  queryParams = null,
  plants,
  areaMachine,
  suppliers,
}) {
  queryParams = queryParams || {};
  const [filters, setFilters] = useState({
    date: queryParams.date || "",
    rows: queryParams.rows || 10,
    plant_id: queryParams.plant || "",
    area_machine_id: queryParams.area_machine_id || "",
    supplier_id: queryParams.supplier_id || "",
  });
  const { flash } = usePage().props;

  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);
  const [areaMachines, setAreaMachines] = useState([]);

  const onDeleteMeasurement = () => {
    if (!measurementToDelete) return;

    deleteMeasurement(measurementToDelete);
    setIsDeleteModalOpen(false);
  };

  const deleteMeasurement = (permission) => {
    router.delete(route("permission.destroy", permission.id), {
      onSuccess: (response) => {},
      onError: (errors) => {},
    });
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
      route("permission.index"),
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

  useEffect(() => {
    if (flash.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [flash]);

  const clearFilter = () => {
    setFilters({
      date: "",
      rows: 10,
      plant_id: "",
      area_machine_id: "",
      supplier_id: "",
    });

    router.get(route("permission.index"));
  };

  useEffect(() => {
    if (filters.plant_id) {
      const filteredMachines = areaMachine.filter(
        (item) => item.plant_id === parseInt(filters.plant_id, 10)
      );
      setAreaMachines(filteredMachines);
    }
  }, [filters.plant_id]);

  const handleExport = async (item) => {
    const response = await fetch(route("approval.export", item.id), {
      method: "GET",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    if (response.ok) {
      const blob = await response.blob(); // Obtén el archivo como blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Permiso_${item.plant}_${item.areaMaquina}_${
        item.ejecutorTrabajo
      }_ ${new Date().toLocaleDateString()}.xlsx`; // Nombre del archivo
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Error al descargar el archivo:", response.statusText);
    }
  };

  const handleExportHeihgts = async (item) => {
    const response = await fetch(route("approval.alturas", item.id), {
      method: "GET",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    if (response.ok) {
      const blob = await response.blob(); // Obtén el archivo como blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Permiso_Alturas_${item.plant}_${item.areaMaquina}_${
        item.ejecutorTrabajo
      }_ ${new Date().toLocaleDateString()}.xlsx`; // Nombre del archivo
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Error al descargar el archivo:", response.statusText);
    }
  };

  const handleDuplicate = () => {
    router.post(route("approvals.duplicate"), {
      onSuccess: () => {
        console.log("Las filas fueron duplicadas con éxito.");
      },
      onError: () => {
        console.log("Ocurrió un error al duplicar las filas.");
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Permissions
          </h2>
          {(auth.user.roles.includes("Permissions") ||
            auth.user.permissions.includes("Create Permissions")) && (
            <>
              <button
                onClick={handleDuplicate}
                className="bg-blue-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
              >
                Duplicate Last Day
              </button>

              <Link
                href={route("permission.create")}
                className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
              >
                New Permission
              </Link>
            </>
          )}
        </div>
      }
    >
      <Head title="Meters" />

      <ContainerAuth>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
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

          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-2">
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
                  value={filters.date}
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
                  htmlFor="area_machine_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area
                </label>
                <select
                  name="area_machine_id"
                  id="area_machine_id"
                  value={queryParams.area_machine_id}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Plant</option>
                  {areaMachines.map((plant) => (
                    <option key={plant.id} value={plant.id}>
                      {plant.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="supplier_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Supplier
                </label>
                <select
                  name="supplier_id"
                  id="supplier_id"
                  value={queryParams.supplier_id}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
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
                  value={filters.rows}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="5">5</option>
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

            {data.data.length > 0 && (
              <>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50 rounded-lg">
                  <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 rounded-lg">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Plant
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Supplier
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Area
                      </th>

                      {auth.user.roles.includes("Permissions") &&
                        auth.user.permissions.includes(
                          "Export Permissions"
                        ) && (
                          <>
                            <th scope="col" className="px-6 py-3">
                              Permissions
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Work at Heights
                            </th>

                            <th scope="col" className="px-6 py-3">
                              Template
                            </th>
                          </>
                        )}

                      {auth.user.roles.includes("Permissions") &&
                        auth.user.permissions.includes("Edit Permissions") &&
                        auth.user.permissions.includes(
                          "Delete Permissions"
                        ) && (
                          <th scope="col" className="px-6 py-3">
                            Actions
                          </th>
                        )}
                    </tr>
                  </thead>

                  <tbody>
                    {data.data.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                      >
                        <td className="px-6 py-2">{item.plant}</td>
                        <td className="px-6 py-2">{item.fechaEjecucion}</td>
                        <td className="px-6 py-2">{item.ejecutorTrabajo}</td>
                        <td className="px-6 py-2">{item.areaMaquina}</td>

                        {auth.user.roles.includes("Permissions") &&
                          auth.user.permissions.includes(
                            "Export Permissions"
                          ) && (
                            <>
                              <td className="px-6 py-2">
                                <Link
                                  className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                                  onClick={() => handleExport(item)}
                                >
                                  Export
                                </Link>
                              </td>
                              <td className="px-6 py-2">
                                {item.TrabajosEnAlturas === "SI" ? (
                                  <Link
                                    className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                                    onClick={() => handleExportHeihgts(item)}
                                  >
                                    Export
                                  </Link>
                                ) : (
                                  item.TrabajosEnAlturas
                                )}
                              </td>
                              <td className="px-6 py-2">
                                <Link
                                  className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                                  href={route("approval.processId", item.id)} // Corrección aquí
                                >
                                  Template
                                </Link>
                              </td>
                            </>
                          )}

                        {auth.user.roles.includes("Permissions") &&
                          auth.user.permissions.includes("Edit Permissions") &&
                          auth.user.permissions.includes(
                            "Delete Permissions"
                          ) && (
                            <td className="py-2 text-center">
                              <Link
                                className="font-medium text-amber-600 dark:text-amber-500 hover:underline mr-4"
                                href={route("permission.edit", item.id)}
                              >
                                Edit
                              </Link>
                              <button
                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                onClick={() => {
                                  setMeasurementToDelete(item);
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
                <Pagination links={data.meta.links} filters={filters} />
              </>
            )}
            {data.data.length === 0 && (
              <NoContent text={"No Content"} icon={"🛢"} />
            )}
          </div>

          {/* <pre>{JSON.stringify(filters, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(plants, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(auth.user, undefined, 2)}</pre> */}
          {/* <pre>{JSON.stringify(auth.user.permissions, undefined, 2)}</pre> */}
        </div>
      </ContainerAuth>
    </AuthenticatedLayout>
  );
}
