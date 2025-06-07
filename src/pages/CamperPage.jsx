import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCamperByIdThunk } from "../store/campers/campertThunks";

import Camper from "../components/Camper/Camper";

const CamperPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperByIdThunk(id));
    }
  }, [dispatch, id]);

  return <Camper />;
};

export default CamperPage;
