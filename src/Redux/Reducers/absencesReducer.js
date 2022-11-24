import { ABSENCES_DATA } from "../constants";
const InitialState = {
  data: [],
};
const Absence_Data = (state = InitialState, action) => {
  switch (action.type) {
    case ABSENCES_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default Absence_Data;
