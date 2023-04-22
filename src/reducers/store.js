import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth-reducer";
import followReducer from "./follow-reducer";
import reviewReducer from "./review-reducer";

const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    user: userReducer,
    follows: followReducer,
  },
});

export default store;