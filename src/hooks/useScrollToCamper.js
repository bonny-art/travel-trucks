import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectIsLoading,
} from "../store/campers/campersSlice";
import { scrollToCamperById, scrollToTop } from "../utils/scroll";

const useScrollToCamper = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page")) || 1;

  const hasScrolled = useRef(false);
  const scrollToCamperId = location.state?.scrollToId;

  const currentPage = useSelector(selectCurrentPage);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!hasScrolled.current && !isLoading && currentPage >= page) {
      if (scrollToCamperId) {
        const success = scrollToCamperById(scrollToCamperId);
        if (success) hasScrolled.current = true;
      } else {
        scrollToTop();
        hasScrolled.current = true;
      }
    }
  }, [scrollToCamperId, currentPage, isLoading, page]);
};

export default useScrollToCamper;
