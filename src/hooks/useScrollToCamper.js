import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useScrollToCamper = () => {
  const location = useLocation();
  const hasScrolled = useRef(false);

  useEffect(() => {
    const scrollToCamperId = location.state?.scrollToId;
    console.log("🚀 ~ scrollToCamperId:", scrollToCamperId);
    console.log("🚀 ~ hasScrolled.current:", hasScrolled.current);
    if (scrollToCamperId && !hasScrolled.current) {
      setTimeout(() => {
        const el = document.getElementById(`camper-${scrollToCamperId}`);
        if (el) {
          console.log("🚀 ~ el:", el);
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        hasScrolled.current = true;
      }, 300);
    }
  }, [location.state?.scrollToId]);
};

export default useScrollToCamper;
