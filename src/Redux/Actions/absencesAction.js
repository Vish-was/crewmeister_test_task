import { ABSENCES_DATA } from "../constants";
import axios from "axios";

export const AbsencesData = () => async (dispatch) => {
  const data = await axios.get("http://localhost:3005/payload");
  return dispatch({
    type: ABSENCES_DATA,
    payload: data.data,
  });
};
