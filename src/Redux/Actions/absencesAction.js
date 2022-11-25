import { ABSENCES_DATA } from "../constants";
import absences from "../../json/absences.json";
export const AbsencesData = () => async (dispatch) => {
  return dispatch({
    type: ABSENCES_DATA,
    payload: absences.payload,
  });
};
