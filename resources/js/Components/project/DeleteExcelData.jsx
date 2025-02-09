import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const DeleteExcelData = ({ project }) => {
  const { delete: destroy, processing } = useForm();
  const [showSuccess, setShowSuccess] = useState(false);

  // Maneja la eliminación de datos
  const handleDelete = () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar todos los datos?")
    ) {
      destroy(route("import.delete", { project: project.id }), {
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={processing}
        className={`px-4 py-2 rounded-md text-white font-semibold ${
          processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        } transition-colors duration-200`}
      >
        {processing ? "Eliminando..." : "Delete Data"}
      </button>

      {/* Mensaje de éxito si se completa la eliminación */}
      {showSuccess && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
          <p>¡Datos eliminados exitosamente!</p>
        </div>
      )}
    </div>
  );
};

export default DeleteExcelData;
