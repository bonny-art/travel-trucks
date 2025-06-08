export const scrollToTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

export const scrollToCamperById = (id) => {
  const element = document.getElementById(`camper-${id}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }
  return false;
};
