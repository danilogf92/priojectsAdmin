import React, { useState } from "react";

const TrabajoAlturaForm = () => {
  const [checkboxes, setCheckboxes] = useState({
    escalera: Array(6).fill(false),
    montacargas: Array(5).fill(false),
    andamios: Array(4).fill(false),
    techo: Array(4).fill(false),
  });

  const handleCheckboxChange = (category, index) => {
    const newCheckboxes = { ...checkboxes };

    if (category === "escalera") {
      if (index === -1) {
        const allChecked = !newCheckboxes.escalera.every(Boolean);
        newCheckboxes.escalera.fill(allChecked);
      } else {
        newCheckboxes.escalera[index] = !newCheckboxes.escalera[index];
      }
    } else if (category === "montacargas") {
      if (index === -1) {
        const allChecked = !newCheckboxes.montacargas.every(Boolean);
        newCheckboxes.montacargas.fill(allChecked);
      } else {
        newCheckboxes.montacargas[index] = !newCheckboxes.montacargas[index];
      }
    } else if (category === "andamios") {
      if (index === -1) {
        const allChecked = !newCheckboxes.andamios.every(Boolean);
        newCheckboxes.andamios.fill(allChecked);
      } else {
        newCheckboxes.andamios[index] = !newCheckboxes.andamios[index];
      }
    } else if (category === "techo") {
      if (index === -1) {
        const allChecked = !newCheckboxes.techo.every(Boolean);
        newCheckboxes.techo.fill(allChecked);
      } else {
        newCheckboxes.techo[index] = !newCheckboxes.techo[index];
      }
    }

    setCheckboxes(newCheckboxes);
  };

  return (
    <form className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center">
        TIPOS DE TRABAJO EN ALTURA
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {/* Escalera */}
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-center mb-2">ESCALERA</h3>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("escalera", -1)}
              className="mr-2"
              checked={checkboxes.escalera.every(Boolean)}
            />
            Seleccionar Todo
          </label>
          {[
            "Piso nivelado",
            "Escalera sujeta",
            "Persona sujetando base",
            "Punto de anclaje",
            "Cinturón de herramientas",
            "Personal que apoya",
          ].map((item, index) => (
            <label key={index} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={checkboxes.escalera[index]}
                onChange={() => handleCheckboxChange("escalera", index)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>

        {/* Montacargas */}
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-center mb-2">
            MONTACARGAS / CANASTILLA ÉLECTRICA
          </h3>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("montacargas", -1)}
              className="mr-2"
              checked={checkboxes.montacargas.every(Boolean)}
            />
            Seleccionar Todo
          </label>
          {[
            "Checklist de montacarga",
            "Luces intermitentes",
            "Acople y seguro",
            "Cinturón de herramientas",
            "Bloqueo de partes móviles",
          ].map((item, index) => (
            <label key={index} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={checkboxes.montacargas[index]}
                onChange={() => handleCheckboxChange("montacargas", index)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>

        {/* Andamios */}
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-center mb-2">ANDAMIOS</h3>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("andamios", -1)}
              className="mr-2"
              checked={checkboxes.andamios.every(Boolean)}
            />
            Seleccionar Todo
          </label>
          {[
            "Verificación de estado",
            "Verificación de acoples",
            "Cinturón de herramientas",
            "Personal que apoya",
          ].map((item, index) => (
            <label key={index} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={checkboxes.andamios[index]}
                onChange={() => handleCheckboxChange("andamios", index)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>

        {/* Techo */}
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-center mb-2">TECHO</h3>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("techo", -1)}
              className="mr-2"
              checked={checkboxes.techo.every(Boolean)}
            />
            Seleccionar Todo
          </label>
          {[
            "Acceder solo por escaleras",
            "Anclar eslingas a línea de vida",
            "Circular únicamente en la zona del trabajo",
            "Cinturón de herramientas",
          ].map((item, index) => (
            <label key={index} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={checkboxes.techo[index]}
                onChange={() => handleCheckboxChange("techo", index)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default TrabajoAlturaForm;
