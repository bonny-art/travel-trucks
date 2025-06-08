import axios from "axios";
import { ITEMS_PER_PAGE } from "../constants/ui";
import { MOCKAPI } from "../constants/mockapi";

axios.defaults.baseURL = MOCKAPI.BASE_URL;

export const getCampers = async (params = {}) => {
  params.limit = ITEMS_PER_PAGE;

  const { data } = await axios.get(MOCKAPI.CAMPERS_ENDPOINT, {
    params,
  });

  return { ...data, page: params.page };
};

export const getCamperById = async (id) => {
  const { data } = await axios.get(MOCKAPI.CAMPER_BY_ID_ENDPOINT(id));
  return data;
};
