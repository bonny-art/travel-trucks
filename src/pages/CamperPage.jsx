import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Camper from "../components/Camper/Camper";
import { campersActions } from "../store/campers/campersSlice";

const CamperPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(campersActions.setCamperId(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(campersActions.resetCamperState());
    };
  }, [dispatch]);

  return <Camper />;
};

export default CamperPage;
