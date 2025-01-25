import { Link, useForm } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import InputError from "../InputError";

const datetest = (value = 0) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  hoy.setDate(hoy.getDate() - value);

  return hoy.toISOString().split("T")[0];
};

export default function FormFuelMeters({ plants, fuelEquipment }) {
  const { data, setData, post, errors } = useForm({
    plant_id: "",
    fuel_equipment_id: "",
    start_value: 0,
    end_value: 0,
    difference: 0,
    kw_start_value: 0,
    kw_end_value: 0,
    kw_difference: 0,
    hour_start_value: 0,
    hour_end_value: 0,
    hour_difference: 0,
    date: datetest(1) || "",
    dateInput: datetest() || "",
    dateAux: datetest(2) || "",
  });
  const dateInputRef = useRef(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [allEquipments, setAllEquipments] = useState(fuelEquipment);
  const [dateMeasureBefore, setDateMeasureBefore] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const [selectedEquipment, setSelectedEquipment] = useState({});

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOfWeek = today.getDay();

    today.setDate(today.getDate() - 1);

    setDateMeasureBefore(today.toISOString().split("T")[0]);
  }, []);

  const calculateDifference = (start, end) => {
    return parseFloat((end - start).toFixed(3));
  };

  const handleStartChange = (e) => {
    const startValue = parseFloat(e.target.value) || 0;
    const endValue = parseFloat(data.end_value) || 0;
    const difference = calculateDifference(startValue, endValue);

    setData({
      ...data,
      start_value: startValue,
      difference: difference,
    });
  };

  const handleStartKWChange = (e) => {
    const kw_start_value = parseFloat(e.target.value) || 0;
    const kw_end_value = parseFloat(data.kw_end_value) || 0;
    const kw_difference = calculateDifference(kw_start_value, kw_end_value);

    setData({
      ...data,
      kw_start_value: kw_start_value,
      kw_difference: kw_difference,
    });
  };

  const handleStartHourChange = (e) => {
    const hour_start_value = parseFloat(e.target.value) || 0;
    const hour_end_value = parseFloat(data.hour_end_value) || 0;
    const hour_difference = calculateDifference(
      hour_start_value,
      hour_end_value
    );

    setData({
      ...data,
      hour_start_value: hour_start_value,
      hour_difference: hour_difference,
    });
  };

  const handleEndChange = (e) => {
    const endValue = parseFloat(e.target.value) || 0;
    const startValue = parseFloat(data.start_value) || 0;
    const difference = calculateDifference(startValue, endValue);

    setData({
      ...data,
      end_value: endValue,
      difference: difference,
    });
  };

  const handleEndKWChange = (e) => {
    const kw_end_value = parseFloat(e.target.value) || 0;
    const kw_start_value = parseFloat(data.kw_start_value) || 0;
    const kw_difference = calculateDifference(kw_start_value, kw_end_value);

    setData({
      ...data,
      kw_end_value: kw_end_value,
      kw_difference: kw_difference,
    });
  };

  const handleEndHourChange = (e) => {
    const hour_end_value = parseFloat(e.target.value) || 0;
    const hour_start_value = parseFloat(data.hour_start_value) || 0;
    const hour_difference = calculateDifference(
      hour_start_value,
      hour_end_value
    );

    setData({
      ...data,
      hour_end_value: hour_end_value,
      hour_difference: hour_difference,
    });
  };

  const handlePlantChange = async (e) => {
    const selectedPlantId = e.target.value;

    const filteredEquipments = allEquipments.filter(
      (equipment) => equipment.plant_id === parseInt(selectedPlantId, 10)
    );

    setFilteredEquipments(filteredEquipments);

    setSelectedEquipment({});

    setData({
      ...data,
      plant_id: selectedPlantId,
      fuel_equipment_id: "",
    });
  };

  const handleEquipment = async (e) => {
    const selectedEquipmentId = e.target.value;

    const foundEquipment = filteredEquipments.find(
      (equipment) => equipment.id === parseInt(selectedEquipmentId, 10)
    );
    setSelectedEquipment(foundEquipment || {});

    setData({
      ...data,
      fuel_equipment_id: selectedEquipmentId,
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value + "T00:00:00");

    selectedDate.setDate(selectedDate.getDate() - 1);

    setDateMeasureBefore(selectedDate.toISOString().split("T")[0]);

    const dateAux = new Date(selectedDate);
    dateAux.setDate(dateAux.getDate() - 1);

    setData({
      ...data,
      plant_id: "",
      fuel_equipment_id: "",
      dateInput: e.target.value,
      dateAux: dateAux.toISOString().split("T")[0],
      date: selectedDate.toISOString().split("T")[0],
    });
  };

  useEffect(() => {
    if (data.plant_id) {
      const fuelEquipmentArray = allEquipments.filter(
        (item) => item.plant_id === parseInt(data.plant_id, 10)
      );
      setFilteredEquipments(fuelEquipmentArray);
    }
  }, [data.plant_id, data.dateInput, allEquipments, dateMeasureBefore]);

  // Este useEffect depende de selectedEquipment y se ejecuta cada vez que cambia
  useEffect(() => {
    if (selectedEquipment && selectedEquipment.id) {
      // Lógica cuando selectedEquipment ha sido actualizado
      if (
        parseInt(selectedEquipment.enabled_kw) === 0 &&
        parseInt(selectedEquipment.enabled_hour) === 0
      ) {
        setData({
          ...data,
          kw_start_value: 0,
          kw_end_value: 0,
          kw_difference: 0,
          hour_start_value: 0,
          hour_end_value: 0,
          hour_difference: 0,
        });
      } else if (parseInt(selectedEquipment.enabled_kw) === 0) {
        setData({
          ...data,
          kw_start_value: 0,
          kw_end_value: 0,
          kw_difference: 0,
        });
      } else if (parseInt(selectedEquipment.enabled_hour) === 0) {
        setData({
          ...data,
          hour_start_value: 0,
          hour_end_value: 0,
          hour_difference: 0,
        });
      }
    }
  }, [selectedEquipment]); // Este useEffect se ejecuta cada vez que selectedEquipment cambia

  useEffect(() => {
    setData({
      ...data,
      // plant_id: "",
      fuel_equipment_id: "",
      start_value: "",
      end_value: "",
      difference: "",
      kw_start_value: "",
      kw_end_value: "",
      kw_difference: "",
      hour_start_value: "",
      hour_end_value: "",
      hour_difference: "",
    });

    const fetchData = async () => {
      try {
        // console.log(data.dateInput);
        const response = await fetch(`/api/fuel-equipment?date=${data.date}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meters");
        }
        const { equipments } = await response.json();
        // console.log("Updated equipments new:", equipments);
        // console.log("data.plant_id", data.plant_id);
        const allMetersArray = Object.values(equipments);
        setAllEquipments(allMetersArray);

        if (data.plant_id) {
          const filteredMeters = allEquipments.filter(
            (item) => item.plant_id === parseInt(data.plant_id, 10)
          );
          setFilteredEquipments(filteredMeters);
        }
      } catch (error) {
        console.error("Error fetching meters:", error);
      }
    };

    fetchData();
  }, [data.dateInput, dateMeasureBefore, data.fuel_equipment_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsEnabled(true);

        setData({
          ...data,
          start_value: "0",
          hour_start_value: "0",
          kw_start_value: "0",
          kw_end_value: "0",
          kw_difference: "0",
          hour_end_value: "0",
          hour_difference: "0",
        });

        const prevDate = new Date(dateMeasureBefore + "T00:00:00");
        prevDate.setDate(prevDate.getDate() - 1);
        const formattedDate = prevDate.toISOString().split("T")[0];

        const response = await fetch(
          `/api/fuel-lastvalue?date=${formattedDate}&equipment=${data.fuel_equipment_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch measurement");
        }
        const { measurement } = await response.json();

        let hour_end_value = 0;
        let end_value = 0;
        let kw_end_value = 0;

        if (measurement.length > 0) {
          end_value = measurement[0]["end_value"];
          hour_end_value = measurement[0]["hour_end_value"];
          kw_end_value = measurement[0]["kw_end_value"];

          // console.log(measurement);
        }

        setData({
          ...data,
          start_value: end_value,
          hour_start_value: hour_end_value,
          kw_start_value: kw_end_value,
          hour_end_value: selectedEquipment.enabled_hour === 0 ? 0 : "",
          kw_end_value: selectedEquipment.enabled_kw === 0 ? 0 : "",
          kw_difference: selectedEquipment.enabled_kw === 0 ? 0 : "",
          hour_difference: selectedEquipment.enabled_hour === 0 ? 0 : "",
        });
      } catch (error) {
        console.error("Error fetching measurement:", error);
      } finally {
        setIsEnabled(false); // Desactiva siempre, ya sea en éxito o en error
      }
    };

    const fetchDataAsync = async () => {
      await fetchData();
    };

    if (data.fuel_equipment_id) {
      fetchDataAsync();
    }
  }, [data.fuel_equipment_id, data.dateInput]);

  const dateFormat = (originalDate) => {
    const dateObject = new Date(originalDate + "T00:00:00");

    const month = dateObject.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();

    const formattedDate = `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;

    return formattedDate;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("fuel.store"), {
      onSuccess: (response) => {
        // console.log("Respuesta exitosa:", response);

        setData({
          ...data,
          fuel_equipment_id: "",
          start_value: "",
          end_value: "",
          difference: "",
          kw_start_value: 0,
          kw_end_value: 0,
          kw_difference: 0,
          hour_start_value: 0,
          hour_end_value: 0,
          hour_difference: 0,
        });

        setSelectedEquipment({});

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      },
      onError: (errors) => {
        console.error("Errores:", errors);
        // Opcional: mostrar errores en la interfaz de usuario
      },
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg p-6 bg-gradient-to-r from-blue-50 to-gray-200">
      {showSuccess && (
        <div className="mt-20 fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center shadow-md">
          <div className="relative">
            <strong className="font-bold block">Success!</strong>
            <span className="block sm:inline">Data stored successfully.</span>
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

      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white pb-6 text-center">
            <h2 className="font-semibold leading-7 text-gray-900 text-xl">
              Measurement fuel
            </h2>
          </div>

          <div className="border-b border-white pb-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="plant_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Plant
                </label>
                <div className="mt-2">
                  <select
                    onChange={handlePlantChange}
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
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.plant_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="fuel_equipment_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Equipment
                </label>
                <div className="mt-2">
                  <select
                    onChange={handleEquipment}
                    value={data.fuel_equipment_id}
                    id="fuel_equipment_id"
                    name="fuel_equipment_id"
                    autoComplete="fuel_equipment_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Meter --
                    </option>
                    {filteredEquipments.map((meter) => (
                      <option key={meter.id} value={meter.id}>
                        {meter.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.fuel_equipment_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900 flex items-center"
                >
                  <span>Date</span>
                  <span className="bg-red-200 ml-2 rounded-sm p-1">
                    {dateFormat(dateMeasureBefore)}
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleDateChange}
                    value={data.dateInput}
                    type="date"
                    ref={dateInputRef}
                    name="date"
                    id="date"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.date}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="start_value"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {`Start Value${
                    selectedEquipment.units
                      ? ` [${selectedEquipment.units}]`
                      : ""
                  }`}
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleStartChange}
                    value={data.start_value}
                    type="number"
                    name="start_value"
                    min={0}
                    step="0.001"
                    id="start_value"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.start_value}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="end_value"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {`Final Value${
                    selectedEquipment.units
                      ? ` [${selectedEquipment.units}]`
                      : ""
                  }`}
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleEndChange}
                    value={data.end_value}
                    min={0}
                    step="0.001"
                    type="number"
                    name="end_value"
                    id="end_value"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.end_value}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="difference"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {`Difference${
                    selectedEquipment.units
                      ? ` [${selectedEquipment.units}]`
                      : ""
                  }`}
                </label>
                <div className="mt-2">
                  <input
                    value={data.difference >= 0 ? data.difference : ""}
                    type="text"
                    name="difference"
                    id="difference"
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 disabled:bg-gray-500 bg-red-200 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.difference}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
              {parseInt(selectedEquipment.enabled_kw) == 1 && (
                <>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="kw_start_value"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Start Value KW/h
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleStartKWChange}
                        value={data.kw_start_value}
                        type="number"
                        name="kw_start_value"
                        min={0}
                        step="0.001"
                        id="kw_start_value"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <InputError
                        message={errors.kw_start_value}
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="kw_end_value"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Final Value KW/h
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleEndKWChange}
                        value={data.kw_end_value}
                        min={0}
                        step="0.001"
                        type="number"
                        name="kw_end_value"
                        id="kw_end_value"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <InputError
                        message={errors.kw_end_value}
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="kw_difference"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Difference KW/h
                    </label>
                    <div className="mt-2">
                      <input
                        value={
                          data.kw_difference >= 0 ? data.kw_difference : ""
                        }
                        type="text"
                        name="kw_difference"
                        id="kw_difference"
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 disabled:bg-gray-500 bg-red-200 sm:text-sm sm:leading-6"
                      />
                      <InputError
                        message={errors.kw_difference}
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {parseInt(selectedEquipment.enabled_hour) == 1 && (
                <>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="hour_start_value"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Start Value Hour
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleStartHourChange}
                        value={data.hour_start_value}
                        type="number"
                        name="hour_start_value"
                        min={0}
                        step="0.001"
                        id="hour_start_value"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <InputError
                        message={errors.hour_start_value}
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="hour_end_value"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Final Value Hour
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleEndHourChange}
                        value={data.hour_end_value}
                        min={0}
                        step="0.001"
                        type="number"
                        name="hour_end_value"
                        id="hour_end_value"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <InputError
                        message={errors.hour_end_value}
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="hour_difference"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Difference Hour
                    </label>
                    <div className="mt-2">
                      <input
                        value={
                          data.hour_difference >= 0 ? data.hour_difference : ""
                        }
                        type="text"
                        name="hour_difference"
                        id="hour_difference"
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 disabled:bg-gray-500 bg-red-200 sm:text-sm sm:leading-6"
                      />
                      <InputError
                        message={errors.hour_difference}
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={route("measurement.index")}
            className="rounded-md bg-amber-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Cancel
          </Link>

          <button
            disabled={isEnabled}
            type="submit"
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm
          ${
            isEnabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
          >
            Create
          </button>
        </div>
      </form>
      {/* <pre>{JSON.stringify(selectedEquipment, undefined, 2)}</pre> */}
      {/* <pre>{JSON.stringify(filteredEquipments, undefined, 2)}</pre> */}

      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
      {/* <pre>{JSON.stringify(allEquipments, undefined, 2)}</pre> */}
    </div>
  );
}
