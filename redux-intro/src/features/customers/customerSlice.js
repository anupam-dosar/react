import { createSlice } from "@reduxjs/toolkit";

const initialCustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const ACTION_CREATECUST = "customer/create";
const ACTION_UPDATE_CUSTNM = "customer/updateName";

const customerSlice = createSlice({
  name: "customer",
  initialState: initialCustomerState,
  reducers: {
    create: {
      prepare(fullName, nationalId) {
        return {
          payload: { fullName, nationalId, createdAt: new Date().toISOString() },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { create, updateName } = customerSlice.actions;

export default customerSlice.reducer;

/*export default function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case ACTION_CREATECUST:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createAt,
      };

    case ACTION_UPDATE_CUSTNM:
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return {
    type: ACTION_CREATECUST,
    payload: {
      fullName,
      nationalId,
      createAt: new Date().toISOString(),
    },
  };
}

export function updateCustomerName(fullName) {
  return {
    type: ACTION_UPDATE_CUSTNM,
    payLoad: fullName,
  };
}
*/
