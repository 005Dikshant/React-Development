const initalState = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/loan":
      if (state.loan > 0) {
        return state;
      }
      return { ...state, loan: action.payload };

    case "accout/payloan":
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
