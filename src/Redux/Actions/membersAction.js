import { MEMBERS_DATA } from "../constants";
import axios from "axios";

export const MembersData = () => async (dispatch) => {
  const data = await axios.get("http://localhost:3004/payload");
  return dispatch({
    type: MEMBERS_DATA,
    payload: data.data,
  });
};
