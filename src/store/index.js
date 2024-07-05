import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import articlesSlice from "./articleSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        items: articlesSlice
    }
})