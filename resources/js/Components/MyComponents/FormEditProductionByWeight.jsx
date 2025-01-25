import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import InputError from "../InputError";

export default function FormEditProductionByWeight({ production }) {
  const { data, setData, put, errors } = useForm({
    date: production?.date || "",
    net: production?.net || "",
    total_boxes: production?.total_boxes || "",
    pn_per_box: production?.pn_per_box || "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("production-by-weight.update", production.id), {
      onSuccess: (response) => {
        // console.log(response); // AQUI GENERA EL showSuccess
      },
      onError: (errors) => {
        // console.log(errors);
      },
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg p-4 bg-blue-100">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white pb-6 text-center">
            <h2 className="font-semibold leading-7 text-gray-900 text-xl">
              Production data
            </h2>
          </div>

          <div className="border-b border-white pb-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
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

              {/* <div className="sm:col-span-2">
                <label
                  htmlFor="net"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Net
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setData("net", e.target.value)}
                    value={data.net}
                    type="number"
                    name="net"
                    min={0}
                    step="0.001"
                    id="net"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.net}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="total_boxes"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Total boxes
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setData("total_boxes", e.target.value)}
                    value={data.total_boxes}
                    min={0}
                    step="0.001"
                    type="number"
                    name="total_boxes"
                    id="total_boxes"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.total_boxes}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div> */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="pn_per_box"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pn per box
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setData("pn_per_box", e.target.value)}
                    value={data.pn_per_box}
                    min={0}
                    step="0.001"
                    type="number"
                    name="pn_per_box"
                    id="pn_per_box"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <InputError
                    message={errors.pn_per_box}
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={route("production-by-weight.index")}
            className="rounded-md bg-amber-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
