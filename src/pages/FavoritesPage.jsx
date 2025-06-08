import { useEffect } from "react";
import Favorites from "../components/Favorites/Favorites";
import useScrollToCamper from "../hooks/useScrollToCamper";
import { useDispatch } from "react-redux";
import { campersActions } from "../store/campers/campersSlice";

const FavoritesPage = () => {
  const dispatch = useDispatch();

  useScrollToCamper();

  useEffect(() => {
    return () => {
      dispatch(campersActions.setCurrentPageAction(1));
    };
  }, [dispatch]);

  return <Favorites />;
};

export default FavoritesPage;
