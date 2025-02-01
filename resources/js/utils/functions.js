const setAllFieldsToNull = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = null;
  });
};

export { setAllFieldsToNull };
