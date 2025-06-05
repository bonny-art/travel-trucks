import axios from "axios";
import { mockapiConstants } from "../constants/mockapiConstants";
import { ITEMS_PER_PAGE } from "../constants/uiConstants";

axios.defaults.baseURL = mockapiConstants.BASE_URL;

export const getCampers = async (params = {}) => {
  params.limit = ITEMS_PER_PAGE;

  const { data } = await axios.get(mockapiConstants.CAMPERS_ENDPOINT, {
    params,
  });

  return { ...data, page: params.page };
};
