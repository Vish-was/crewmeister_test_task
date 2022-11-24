import { MEMBERS_DATA } from "../constants";
const InitialState = {
  data: [],
};
const Member_Data = (state = InitialState, action) => {
  switch (action.type) {
    case MEMBERS_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default Member_Data;
