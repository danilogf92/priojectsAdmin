// components/project/EditProjectForm.jsx
import React from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function EditProjectForm({
  project,
  plants,
  currentUser,
  states,
  justifications,
  investments,
  classifications,
}) {
  const { data, setData, put, processing, errors } = useForm({
    name: project.name,
    pda_code: project.pda_code,
    data_uploaded: project.data_uploaded,
    rate: project.rate,
    plant_id: project.plant_id,
    user_id: currentUser.id, // Usuario actual
    state_id: project.state_id,
    justification_id: project.justification_id,
    investment_id: project.investment_id,
    classification_id: project.classification_id,
    start_date: project.start_date,
    finish_date: project.finish_date,
  });

  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("projects.update", project.id), {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      },
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg p-6 bg-gradient-to-r from-blue-50 to-gray-200">
      {showSuccess && (
        <div className="mt-20 fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center shadow-md">
          <div className="relative">
            <strong className="font-bold block">Success!</strong>
            <span className="block sm:inline">
              Project updated successfully.
            </span>
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

      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white pb-6 text-center">
            <h2 className="font-semibold leading-7 text-gray-900 text-xl">
              Edit Project
            </h2>
          </div>

          <div className="border-b border-white pb-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              {/* Name */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.name}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* PDA Code */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="pda_code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  PDA Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pda_code"
                    id="pda_code"
                    value={data.pda_code}
                    onChange={(e) => setData("pda_code", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.pda_code}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Data Uploaded */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="data_uploaded"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data Uploaded
                </label>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="data_uploaded"
                    id="data_uploaded"
                    checked={data.data_uploaded || false}
                    onChange={(e) => setData("data_uploaded", e.target.checked)}
                    disabled
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <InputError
                    message={errors.data_uploaded}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Rate */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rate
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="rate"
                    min={0}
                    max={5}
                    step={0.1}
                    id="rate"
                    value={data.rate}
                    onChange={(e) => setData("rate", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.rate}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Plant */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="plant_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Plant
                </label>
                <div className="mt-2">
                  <select
                    name="plant_id"
                    id="plant_id"
                    value={data.plant_id}
                    onChange={(e) => setData("plant_id", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

              {/* User */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="user_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    disabled
                    name="user_id"
                    min={0}
                    max={5}
                    step={0.1}
                    id="user_id"
                    value={data.user_id}
                    onChange={(e) => setData("user_id", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.user_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* State */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="state_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                </label>
                <div className="mt-2">
                  <select
                    name="state_id"
                    id="state_id"
                    value={data.state_id}
                    onChange={(e) => setData("state_id", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select State --
                    </option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.state_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Justification */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="justification_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Justification
                </label>
                <div className="mt-2">
                  <select
                    name="justification_id"
                    id="justification_id"
                    value={data.justification_id}
                    onChange={(e) =>
                      setData("justification_id", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Justification --
                    </option>
                    {justifications.map((justification) => (
                      <option key={justification.id} value={justification.id}>
                        {justification.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.justification_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Investment */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="investment_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Investment
                </label>
                <div className="mt-2">
                  <select
                    name="investment_id"
                    id="investment_id"
                    value={data.investment_id}
                    onChange={(e) => setData("investment_id", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Investment --
                    </option>
                    {investments.map((investment) => (
                      <option key={investment.id} value={investment.id}>
                        {investment.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.investment_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Classification */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="classification_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Classification
                </label>
                <div className="mt-2">
                  <select
                    name="classification_id"
                    id="classification_id"
                    value={data.classification_id}
                    onChange={(e) =>
                      setData("classification_id", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      -- Select Classification --
                    </option>
                    {classifications.map((classification) => (
                      <option key={classification.id} value={classification.id}>
                        {classification.name}
                      </option>
                    ))}
                  </select>
                  <InputError
                    message={errors.classification_id}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={data.start_date}
                    onChange={(e) => setData("start_date", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.start_date}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              {/* Finish Date */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="finish_date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Finish Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="finish_date"
                    id="finish_date"
                    value={data.finish_date}
                    onChange={(e) => setData("finish_date", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.finish_date}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={processing}
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            {processing ? "Updating..." : "Update Project"}
          </button>
        </div>
      </form>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
}
