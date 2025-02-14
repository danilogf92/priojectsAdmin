const setAllFieldsToNull = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = null;
  });
};

const colorPalette = [
  "#8884d8", // Violeta
  "#82ca9d", // Verde claro
  "#ffc658", // Amarillo
  "#ff8042", // Naranja
  "#ff00ff", // Magenta
  "#ff6347", // Rojo tomate
  "#8a2be2", // Azul violeta
  "#7fff00", // Verde limón
  "#d2691e", // Marrón
  "#ff1493", // Rosa fuerte
  "#dc143c", // Rojo oscuro
  "#ff4500", // Naranja oscuro
  "#2e8b57", // Verde bosque
  "#00bfff", // Azul claro
  "#4682b4", // Azul acero
  "#ff8c00", // Naranja oscuro
  "#32cd32", // Verde césped
  "#ff7f50", // Coral
  "#8b0000", // Rojo oscuro
  "#b22222", // Rojo ladrillo
  "#ff69b4", // Rosa fuerte
  "#8b008b", // Púrpura
  "#cd5c5c", // Rojo marrón
  "#f4a300", // Amarillo mostaza
  "#3b9b9b", // Verde azulado
  "#ff5e5b", // Rojo coral
  "#2a9d8f", // Verde agua
  "#ff9f00", // Naranja neón
  "#0066cc", // Azul brillante
  "#c71585", // Rosa oscuro
  "#9400d3", // Azul violeta oscuro
  "#adff2f", // Amarillo verdoso
  "#b22222", // Rojo ladrillo
  "#e91e63", // Rosa fuerte
];

export { setAllFieldsToNull, colorPalette };
