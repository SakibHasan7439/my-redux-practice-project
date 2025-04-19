import { configureStore } from "@reduxjs/toolkit";
import gadgetSlice from "../features/gadgetSlice";

const store = configureStore({
    // add reducer 
    reducer: {
        gadgetR: gadgetSlice
    }
});

export default store;