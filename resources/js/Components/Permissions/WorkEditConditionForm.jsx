import React, { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import InputError from "../InputError";

const WorkEditConditionForm = ({
  plants,
  areaMachine,
  suppliers,
  approval,
}) => {
  const [filteredArea, setFilteredArea] = useState([]);
  const [allAreas, setAllAreas] = useState(areaMachine);
  const [allSuppliers, setAllSuppliers] = useState(suppliers);

  const { data, setData, put, errors } = useForm({
    fechaEjecucion: approval.fechaEjecucion || "",
    desde: approval.desde,
    hasta: approval.hasta,
    inspectorSSA: approval.inspectorSSA || "",
    plant_id: approval.plant_id || "",
    user_id: approval.user_id || "",
    area_machine_id: approval.area_machine_id || "",
    supplier_id: approval.supplier_id || "",
    descripcionTrabajo: approval.descripcionTrabajo || "",
    condiciones: approval.condiciones || [],
    TrabajosIncompatible: approval.TrabajosIncompatible || "",
    RiesgosFactores: approval.RiesgosFactores || "",
    TrabajosElectricos: approval.TrabajosElectricos || "",
    TrabajosDeSoldadura: approval.TrabajosDeSoldadura || "",
    TrabajosEnAlturas: approval.TrabajosEnAlturas || "",
    Escalera: approval.Escalera || "",
    Montacargas: approval.Montacargas || "",
    Andamios: approval.Andamios || "",
    Techo: approval.Techo || "",
    TrabajosDentroCocinadores: approval.TrabajosDentroCocinadores || "",
    TrabajosTransportar: approval.TrabajosTransportar || "",
    TrabajosLevantarObjetos: approval.TrabajosLevantarObjetos || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleConditionChange = (index, value) => {
    const newCondiciones = [...approval.condiciones];
    newCondiciones[index].cumple = value;
    setData((prevData) => ({
      ...prevData,
      condiciones: newCondiciones,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("permission.update", approval.id), {
      onSuccess: (response) => {
        // console.log(response); // AQUI GENERA EL showSuccess
      },
      onError: (errors) => {
        // console.log(errors);
      },
    });
  };

  const handlePlantChange = async (selectedPlantId) => {
    const filteredArea = allAreas.filter(
      (area) => area.plant_id === parseInt(selectedPlantId, 10)
    );
    setFilteredArea(filteredArea);
  };

  useEffect(() => {
    handlePlantChange(data.plant_id);
  }, [data.plant_id]);

  useEffect(() => {
    if (data.TrabajosEnAlturas === "NO") {
      setData((prevData) => ({
        ...prevData,
        Escalera: "NO",
        Montacargas: "NO",
        Andamios: "NO",
        Techo: "NO",
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        Escalera: "SI",
        Montacargas: "NO",
        Andamios: "SI",
        Techo: "NO",
      }));
    }
  }, [data.TrabajosEnAlturas]);

  return (
    <form onSubmit={onSubmit} className="border border-gray-300 p-4 rounded-lg">
      <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
        <tbody>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">Fecha Ejecución</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <input
                type="date"
                name="fechaEjecucion"
                value={data.fechaEjecucion}
                onChange={handleChange}
              />
            </td>
            <th className="p-2 border border-gray-700">DESDE:</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <input
                type="time"
                name="desde"
                value={data.desde}
                onChange={handleChange}
              />
            </td>
            <th className="p-2 border border-gray-700">HASTA:</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <input
                type="time"
                name="hasta"
                value={data.hasta}
                onChange={handleChange}
              />
            </td>

            <th className="p-2 border border-gray-700">Inspector SSA</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              {data.inspectorSSA}
            </td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">Planta</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <div className="mt-2">
                <select
                  onChange={handleChange}
                  value={data.plant_id}
                  id="plant_id"
                  name="plant_id"
                  autoComplete="plant_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    -- Select Plant --
                  </option>
                  {plants.map((plant) => (
                    <option key={plant.id} value={plant.id * 1}>
                      {plant.name}
                    </option>
                  ))}
                </select>
                <InputError
                  message={errors.plant_id}
                  className="mt-2 text-red-500"
                />
              </div>
            </td>
            <th className="p-2 border border-gray-700">Área/Máquina</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              <div className="mt-2">
                <select
                  onChange={handleChange}
                  value={data.area_machine_id}
                  id="area_machine_id"
                  name="area_machine_id"
                  autoComplete="area_machine_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    -- Select Machine --
                  </option>
                  {filteredArea.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.nombre}
                    </option>
                  ))}
                </select>
                <InputError
                  message={errors.area_machine_id}
                  className="mt-2 text-red-500"
                />
              </div>
            </td>
            <th className="p-2 border border-gray-700">Proveedor</th>
            <td
              className="p-2 border border-gray-700 bg-gray-300 text-gray-700"
              colSpan={4}
            >
              <div className="mt-2">
                <select
                  onChange={handleChange}
                  value={data.supplier_id}
                  id="supplier_id"
                  name="supplier_id"
                  autoComplete="supplier_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    -- Select Supplier --
                  </option>
                  {allSuppliers.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.name}
                    </option>
                  ))}
                </select>
                <InputError
                  message={errors.supplier_id}
                  className="mt-2 text-red-500"
                />
              </div>
            </td>
            {/* <th className="p-2 border border-gray-700">Orden/Trabajo</th>
            <td className="p-2 border border-gray-700 bg-gray-300 text-gray-700">
              No Aplica
            </td> */}
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">
              Descripción Breve Del Trabajo a Realizar
            </th>
            <td className="p-2 border bg-gray-300 text-gray-700" colSpan="8">
              <textarea
                name="descripcionTrabajo"
                value={data.descripcionTrabajo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
                placeholder="Descripción del trabajo..."
              ></textarea>
              <InputError
                message={errors.descripcionTrabajo}
                className="mt-2 text-red-500"
              />
            </td>
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-700">CUMPLE CON</th>
            <th className="p-2 border border-gray-700">SÍ</th>
            <th className="p-2 border border-gray-700">NO</th>
            <th className="p-2 border border-gray-700">N/A</th>
            <th className="p-2 border border-gray-700" colSpan="4">
              OBSERVACIONES
            </th>
          </tr>

          {approval.condiciones.map((condicion, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300 text-center">
                {condicion.nombre}
              </td>

              <td className="p-2 border border-gray-300">
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name={`cumple_${index}`}
                    value="SI"
                    checked={condicion.cumple === "SI"}
                    onChange={() => handleConditionChange(index, "SI")}
                  />
                </div>
              </td>

              <td className="p-2 border border-gray-300">
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name={`cumple_${index}`}
                    value="NO"
                    checked={condicion.cumple === "NO"}
                    onChange={() => handleConditionChange(index, "NO")}
                  />
                </div>
              </td>

              <td className="p-2 border border-gray-300">
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name={`cumple_${index}`}
                    value="N/A"
                    checked={condicion.cumple === "N/A"}
                    onChange={() => handleConditionChange(index, "N/A")}
                  />
                </div>
              </td>

              <td className="p-2 border border-gray-300" colSpan="4">
                <textarea
                  className="w-full p-2 border border-gray-300"
                  placeholder="Observaciones"
                  value={condicion.observaciones || ""}
                  onChange={(e) => {
                    const newCondiciones = [...data.condiciones];
                    newCondiciones[index].observaciones = e.target.value;
                    setData((prevData) => ({
                      ...prevData,
                      condiciones: newCondiciones,
                    }));
                  }}
                />
              </td>
            </tr>
          ))}

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">
              Trabajos Incompatible en las Cercanias:
            </th>
            <td className="p-2 border border-gray-300" colSpan={8}>
              <textarea
                name="TrabajosIncompatible"
                value={data.TrabajosIncompatible}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
                placeholder="Observaciones"
              ></textarea>
            </td>
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="p-2 border border-gray-300">
              Riesgos y Factores de Riesgo en la Tarea Reconocidos por el
              Ejecutor del Trabajo:
            </th>
            <td className="p-2 border border-gray-300" colSpan={8}>
              <textarea
                name="RiesgosFactores"
                value={data.RiesgosFactores}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-zinc-800"
                rows="4"
                placeholder="Observaciones"
              ></textarea>
            </td>
          </tr>

          <tr className="bg-blue-900 text-white">
            <th className="text-center p-2 border border-gray-300" colSpan={8}>
              Destimación de Alto Riesgo de Actividad
            </th>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Intervención en instalaciones o equipos eléctricos de mediana
              tensión (1KV - 50KV) o alta tensión (50KV - 500KV)
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosElectricos" // Cambié aquí para que coincida con el nombre en data
                  value="SI"
                  checked={data.TrabajosElectricos === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosElectricos" // Cambié aquí también
                  value="NO"
                  checked={data.TrabajosElectricos === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajo de soldadura fuera de los talleres (ambiente controlado)
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDeSoldadura" // Cambié aquí para que coincida con el nombre en data
                  value="SI"
                  checked={data.TrabajosDeSoldadura === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDeSoldadura" // Cambié aquí también
                  value="NO"
                  checked={data.TrabajosDeSoldadura === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajos de cualquier tipo, a alturas mayores a la referencial (h
              + 1 piso de altura), fuera de ambiente controlado.
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosEnAlturas" // Cambié aquí para que coincida con el nombre en data
                  value="SI"
                  checked={data.TrabajosEnAlturas === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosEnAlturas" // Cambié aquí también
                  value="NO"
                  checked={data.TrabajosEnAlturas === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          {data.TrabajosEnAlturas === "SI" && (
            <tr className="bg-gray-200">
              <td className="p-2 border border-gray-300">
                <span className="pr-3">ESCALERA</span>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="Escalera" // Cambié aquí para que coincida con el nombre en data
                    value="SI"
                    checked={data.Escalera === "SI"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  Sí
                </label>
                <label className="ml-4">
                  <input
                    className="mr-1"
                    type="radio"
                    name="Escalera" // Cambié aquí también
                    value="NO"
                    checked={data.Escalera === "NO"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  No
                </label>
              </td>

              <td className="p-2 border border-gray-300" colSpan={2}>
                <span className="pr-3">MONTACARGAS</span>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="Montacargas" // Cambié aquí para que coincida con el nombre en data
                    value="SI"
                    checked={data.Montacargas === "SI"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  Sí
                </label>
                <label className="ml-4">
                  <input
                    className="mr-1"
                    type="radio"
                    name="Montacargas" // Cambié aquí también
                    value="NO"
                    checked={data.Montacargas === "NO"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  No
                </label>
              </td>

              <td className="p-2 border border-gray-300" colSpan={2}>
                <span className="pr-3">ANDAMIOS</span>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="Andamios" // Cambié aquí para que coincida con el nombre en data
                    value="SI"
                    checked={data.Andamios === "SI"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  Sí
                </label>
                <label className="ml-4">
                  <input
                    className="mr-1"
                    type="radio"
                    name="Andamios"
                    value="NO"
                    checked={data.Andamios === "NO"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  No
                </label>
              </td>

              <td className="p-2 border border-gray-300" colSpan={2}>
                <span className="pr-3">TECHO</span>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="Techo" // Cambié aquí para que coincida con el nombre en data
                    value="SI"
                    checked={data.Techo === "SI"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  Sí
                </label>
                <label className="ml-4">
                  <input
                    className="mr-1"
                    type="radio"
                    name="Techo"
                    value="NO"
                    checked={data.Techo === "NO"}
                    onChange={handleChange} // Aquí solo llamas a handleChange
                  />
                  No
                </label>
              </td>
            </tr>
          )}

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajos dentro de cocinadores, autoclaves, cisternas, tanques,
              reservorios o similares
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDentroCocinadores" // Cambié aquí para que coincida con el nombre en data
                  value="SI"
                  checked={data.TrabajosDentroCocinadores === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosDentroCocinadores" // Cambié aquí también
                  value="NO"
                  checked={data.TrabajosDentroCocinadores === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Transportar, trasvasar, mezclar, utilizar o manipular químicos
              peligrosos, fuera del ambiente controlado
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosTransportar" // Cambié aquí para que coincida con el nombre en data
                  value="SI"
                  checked={data.TrabajosTransportar === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosTransportar" // Cambié aquí también
                  value="NO"
                  checked={data.TrabajosTransportar === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>

          <tr>
            <td className="p-2 border border-gray-300" colSpan={6}>
              Trabajos que implican levantar objetos pesados o cargas utilizando
              equipos especializados, como grúas, polipastos o similares
            </td>
            <td className="p-2 border border-gray-300" colSpan={2}>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosLevantarObjetos" // Cambié aquí para que coincida con el nombre en data
                  value="SI"
                  checked={data.TrabajosLevantarObjetos === "SI"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                Sí
              </label>
              <label className="ml-4">
                <input
                  className="mr-1"
                  type="radio"
                  name="TrabajosLevantarObjetos" // Cambié aquí también
                  value="NO"
                  checked={data.TrabajosLevantarObjetos === "NO"}
                  onChange={handleChange} // Aquí solo llamas a handleChange
                />
                No
              </label>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <Link
          href={route("permission.index")}
          className="rounded-md bg-amber-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Update
        </button>
      </div>
      {/* <pre>{JSON.stringify(errors, undefined, 2)}</pre> */}
    </form>
  );
};

export default WorkEditConditionForm;
