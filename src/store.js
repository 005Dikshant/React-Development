import { createStore, combineReducers } from "redux";

const initalStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initalStateCustomer = {
  fullName: "",
  createdAt: "",
  nationalID: "",
};

function accountReducer(state = initalStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

function customerReducer(state = initalStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        createdAt: action.payload.createdAt,
        nationalID: action.payload.nationalID,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "to a buy car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Dikshant", 432432423));
console.log(store.getState());

store.dispatch(updateName("Dikshant Yadav"));
console.log(store.getState());
