const initialCustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const ACTION_CREATECUST = "customer/create";
const ACTION_UPDATE_CUSTNM = "customer/update/name";

export default function customerReducer(state = initialCustomerState, action) {
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
