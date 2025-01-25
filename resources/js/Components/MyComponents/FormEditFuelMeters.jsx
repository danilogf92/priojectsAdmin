import { Link, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import InputError from "../InputError";

export default function FormEditFuelMeters({
  fuel,
  plants,
  fuelEquipment,
  equipment,
}) {
  const { data, setData, put, errors } = useForm({
    plant_id: fuel.plant_id || "",
    fuel_equipment_id: fuel.fuel_equipment_id || "",
    start_value: fuel.start_value * 1 || "0",
    end_value: fuel.end_value * 1 || "0",
    difference: fuel.difference * 1 || "0",

    kw_start_value: fuel.kw_start_value * 1 || "0",
    kw_end_value: fuel.kw_end_value * 1 || "0",
    kw_difference: fuel.kw_difference * 1 || "0",
    hour_start_value: fuel.hour_start_value * 1 || "0",
    hour_end_value: fuel.hour_end_value * 1 || "0",
    hour_difference: fuel.hour_difference * 1 || "0",
    date: fuel.date || "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [allEquipments, setAllEquipments] = useState([]);

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

    setData({
      ...data,
      plant_id: selectedPlantId,
      fuel_equipment_id: "",
    });
  };

  const handleDateChange = (e) => {
    setData({
      ...data,
      date: e.target.value,
    });
  };

  useEffect(() => {
    if (data.plant_id) {
      const fuelEquipmentArray = fuelEquipment.filter(
        (item) => item.plant_id === parseInt(data.plant_id, 10)
      );
      setAllEquipments(fuelEquipmentArray);
    }
  }, [data.plant_id]);

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("fuel.update", fuel.id), {
      onSuccess: (response) => {
        // console.log(response); // AQUI GENERA EL showSuccess
      },
      onError: (errors) => {
        // console.log(errors);
      },
    });
  };

  return (
    // <div className="relative overflow-x-auto shadow-md rounded-lg p-4 bg-gray-200">
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
              Update Measurement fuel
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
                    onChange={(e) =>
                      setData("fuel_equipment_id", e.target.value)
                    }
                    value={data.fuel_equipment_id}
                    id="fuel_equipment_id"
                    name="fuel_equipment_id"
                    autoComplete="fuel_equipment_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Meter --
                    </option>
                    {allEquipments.map((meter) => (
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
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleDateChange}
                    value={data.date}
                    type="date"
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
                  Start Value
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
                    autoComplete="address-level2"
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
                  Final Value
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
                    autoComplete="address-level1"
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
                  Difference
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

              {parseInt(equipment.enabled_kw) == 1 && (
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

              {parseInt(equipment.enabled_hour) == 1 && (
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
            href={route("fuel.index")}
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
      </form>
      {/* <pre>{JSON.stringify(fuel, undefined, 2)}</pre> */}
      {/* <pre>{JSON.stringify(equipment, undefined, 2)}</pre> */}
    </div>
  );
}
