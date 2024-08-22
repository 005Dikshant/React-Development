import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  createdAt: "",
  nationalID: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            createdAt: new Date().toISOString(),
            nationalID,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.createdAt = action.payload.createdAt;
        state.nationalID = action.payload.nationalID;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;

// export default function customerReducer(state = initalStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         createdAt: action.payload.createdAt,
//         nationalID: action.payload.nationalID,
//       };

//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };

//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName,
//       nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }
