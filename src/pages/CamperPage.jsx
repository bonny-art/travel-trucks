import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCamperByIdThunk } from "../store/campers/campertThunks";

import Camper from "../components/Camper/Camper";
import {
  campersActions,
  selectCurrentCamper,
} from "../store/campers/campersSlice";

const CamperPage = () => {
  const camper = useSelector(selectCurrentCamper);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperByIdThunk(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(campersActions.resetCamperState());
    };
  }, [dispatch]);

  if (camper) return <Camper />;
};

export default CamperPage;
