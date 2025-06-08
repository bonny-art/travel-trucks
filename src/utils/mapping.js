export const mapName = (value) => {
  const nameMapping = {
    AC: "ac",
    Automatic: "transmission",
    Kitchen: "kitchen",
    TV: "tv",
    Bathroom: "bathroom",
    Van: "panelTruck",
    Alcove: "alcove",
    "Fully Integrated": "fullyIntegrated",
  };

  return nameMapping[value] || value;
};

export const getType = (form) => {
  if (form === "alcove") {
    return "Alcove";
  } else if (form === "fullyIntegrated") {
    return "Fully Integrated";
  } else if (form === "panelTruck") {
    return "Van";
  }
};
