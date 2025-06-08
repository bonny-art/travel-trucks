import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectIsLoading,
} from "../store/campers/campersSlice";

const useScrollToCamper = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;

  const hasScrolled = useRef(false);
  const scrollToCamperId = location.state?.scrollToId;

  const currentPage = useSelector(selectCurrentPage);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (
      scrollToCamperId &&
      !hasScrolled.current &&
      !isLoading &&
      currentPage >= page
    ) {
      const el = document.getElementById(`camper-${scrollToCamperId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        hasScrolled.current = true;
      }
    }
  }, [scrollToCamperId, currentPage, isLoading, page]);
};

export default useScrollToCamper;
