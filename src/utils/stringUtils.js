export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const replaceUnits = (value) =>
  value.replace(/(\d)([a-zA-Z])/g, "$1 $2");
