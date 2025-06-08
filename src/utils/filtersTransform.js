export const mapFilterFormToApiParams = (filters = {}) => {
  const { location, form, equipment = [] } = filters;

  const equipmentMap = equipment.reduce((acc, key) => {
    if (key === "Automatic") {
      acc.transmission = "automatic";
    } else if (["AC", "TV"].includes(key)) {
      acc[key] = true;
    } else if (["Kitchen", "Bathroom"].includes(key)) {
      acc[key.toLowerCase()] = true;
    }
    return acc;
  }, {});

  return {
    ...(location && { location }),
    ...(form && { form }),
    ...equipmentMap,
  };
};

export const mapApiParamsToFilterFormWithPage = (allParams) => {
  const filters = {
    location: allParams.location || "",
    form: allParams.form || "",
    equipment: [],
  };

  const equipmentFlags = {
    AC: "AC",
    TV: "TV",
    kitchen: "Kitchen",
    bathroom: "Bathroom",
    transmission: "Automatic",
  };

  for (const [key, value] of Object.entries(equipmentFlags)) {
    if (allParams[key]) {
      filters.equipment.push(value);
    }
  }

  const page = parseInt(allParams.page, 10) || 1;

  return { filters, page };
};
