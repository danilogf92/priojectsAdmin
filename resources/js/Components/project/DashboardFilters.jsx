import React, { useEffect } from "react";

const investmentMapping = {
  global_price_euros: "global_price",
  real_value_euros: "real_value",
  booked_euros: "booked",
  executed_euros: "executed_dollars",

  global_price: "global_price_euros",
  real_value: "real_value_euros",
  booked: "booked_euros",
  executed_dollars: "executed_euros",
};

const DashboardFilters = ({ filters, handleFilterChange, clearFilter }) => {
  useEffect(() => {
    // Cuando cambia la moneda, actualizar automáticamente la inversión seleccionada
    if (filters.investments && investmentMapping[filters.investments]) {
      handleFilterChange({
        target: {
          name: "investments",
          value: investmentMapping[filters.investments],
        },
      });
    }
  }, [filters.currency]); // Se ejecuta cuando cambia la moneda

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
        {/* Filtro por tipo */}
        <div className="col-span-1">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="area">Area</option>
            <option value="general_classification">
              General Classification
            </option>
            <option value="group_1">Group 1</option>
            <option value="group_2">Group 2</option>
            <option value="item_type">Item Type</option>
            <option value="stage">Stage</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>

        {/* Filtro por tipo de inversión */}
        <div className="col-span-1">
          <label
            htmlFor="investments"
            className="block text-sm font-medium text-gray-700"
          >
            Investments
          </label>
          <select
            name="investments"
            value={filters.investments}
            onChange={handleFilterChange}
            className="text-center px-7 py-2 w-full border rounded"
          >
            {filters.currency === "euro" ? (
              <>
                <option value="global_price_euros">Global Price</option>
                <option value="real_value_euros">Real Value</option>
                <option value="booked_euros">Booked</option>
                <option value="executed_euros">Executed</option>
              </>
            ) : (
              <>
                <option value="global_price">Global Price</option>
                <option value="real_value">Real Value</option>
                <option value="booked">Booked</option>
                <option value="executed_dollars">Executed</option>
              </>
            )}
          </select>
        </div>

        {/* Filtro por moneda */}
        <div className="col-span-1">
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Currency
          </label>
          <select
            name="currency"
            value={filters.currency}
            onChange={handleFilterChange}
            className="text-center px-7 py-2 w-full border rounded"
          >
            <option value="dollar">Dollar</option>
            <option value="euro">Euro</option>
          </select>
        </div>

        {/* Botón para limpiar filtros */}
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
  );
};

export default DashboardFilters;
