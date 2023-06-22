import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../features/userRegisterSlice";
import userLoginReducer from "../features/userLoginSlice";
import userDetailsReducer from "../features/userDetailsSlice";
import userUpdateReducer from "../features/userUpdateSlice";
import userDeleteReducer from "../features/userDeleteSlice";
import contactAddReducer from "../features/contactAddSlice";
import contactByUserReducer from "../features/contactByUserSlice";
import contactByIdReducer from "../features/contactByIdSlice";
import contactUpdateReducer from "../features/contactUpdateSlice";
import contactdeleteReducer from "../features/contactDeleteSlice";

export const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    contactAdd: contactAddReducer,
    contactByUser: contactByUserReducer,
    contactById: contactByIdReducer,
    contactUpdate: contactUpdateReducer,
    contactDelete: contactdeleteReducer,
  },
});
