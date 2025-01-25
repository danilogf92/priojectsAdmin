import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import InputError from "./InputError";
import Modal from "./Modal";

export default function FormMetersEdit({ plants, meters, measurement }) {
  const { data, setData, put, errors } = useForm({
    plant_id: measurement?.plant_id || "",
    meter_id: measurement?.meter_id || "",
    start_value: measurement?.start_value || "0",
    end_value: measurement?.end_value || "",
    difference: measurement?.difference || "",
    date: measurement?.date || "",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filteredMeters, setFilteredMeters] = useState([]);

  // const calculateDifference = (start, end) => {
  //   return end - start;
  // };

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

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("measurement.update", measurement.id), {
      onSuccess: (response) => {
        // console.log(response); // AQUI GENERA EL showSuccess
      },
      onError: (errors) => {
        // console.log(errors);
      },
    });
  };

  const handlePlantChange = (e) => {
    const selectedPlantId = e.target.value;

    const filteredMeters = meters.filter(
      (meter) => meter.plant_id === parseInt(selectedPlantId, 10)
    );
    setFilteredMeters(filteredMeters);

    setData({
      ...data,
      plant_id: selectedPlantId,
      meter_id: "",
    });
  };

  useEffect(() => {
    if (data.plant_id) {
      const filteredMeters = meters.filter(
        (meter) => meter.plant_id === parseInt(data.plant_id, 10)
      );
      setFilteredMeters(filteredMeters);
    }
  }, [data.plant_id]);

  const onDeleteMeasurement = () => {
    console.log("Borrando medición...");
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-blue-100">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white pb-6 text-center">
            <h2 className="font-semibold leading-7 text-gray-900 text-xl">
              Update Measurement water data
            </h2>
          </div>

          <div className="border-b border-white pb-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="plant_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Plant
                </label>
                <div className="mt-2">
                  <select
                    // onChange={(e) => setData("plant_id", e.target.value)}
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
                  htmlFor="meter_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Meter
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setData("meter_id", e.target.value)}
                    value={data.meter_id}
                    id="meter_id"
                    name="meter_id"
                    autoComplete="meter_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Meter --
                    </option>

                    {filteredMeters.map((meter) => (
                      <option key={meter.id} value={meter.id}>
                        {meter.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.meter_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setData("date", e.target.value)}
                    value={data.date || measurement.date}
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
                  Start Value [m³]
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleStartChange}
                    value={data.start_value}
                    type="number"
                    name="start_value"
                    min={0}
                    step="0.01"
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
                  Final Value [m³]
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleEndChange}
                    value={data.end_value}
                    min={0}
                    step="0.01"
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
                  Difference [m³]
                </label>
                <div className="mt-2">
                  <input
                    value={data.difference}
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
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={route("measurement.index")}
            className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>

      <Modal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        maxWidth="sm"
      >
        <div className="p-6 bg-slate-500 text-white">
          <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
          <p className="text-sm text-white mb-8">
            Are you sure you want to delete this measurement? This action cannot
            be undone.
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

      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
    </div>
  );
}
