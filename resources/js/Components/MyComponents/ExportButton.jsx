import React from "react";

const ExportButton = ({ link, documentName }) => {
  const handleExport = () => {
    fetch(`${link}`, {
      method: "GET",
    })
      .then((response) => {
        // Verificar el tipo de contenido de la respuesta
        const contentType = response.headers.get("content-type");
        if (
          contentType &&
          contentType.includes(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          )
        ) {
          // Convertir la respuesta en un blob y crear un enlace para descargar el archivo
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${documentName}.xlsx`); // Nombre del archivo
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
        } else {
          console.error("Error: La respuesta no es un archivo Excel.");
        }
      })
      .catch((error) => {
        console.error("Error al exportar datos:", error);
      });
  };

  return (
    <button
      onClick={handleExport}
      className=" bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
    >
      Export all Data
    </button>
  );
};

export default ExportButton;
