export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const scrollDown = () => {
  window.scroll({
    top: window.scrollY + (window.innerHeight - 352.5),
    behavior: "smooth",
  });
};

export const scrollUp = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

export const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1));
