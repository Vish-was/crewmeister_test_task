import { MEMBERS_DATA } from "../constants";
import members from "../../json/members.json";

export const MembersData = () => async (dispatch) => {
  return dispatch({
    type: MEMBERS_DATA,
    payload: members.payload,
  });
};
