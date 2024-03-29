import { configureStore } from "@reduxjs/toolkit";
import { tempApi } from "./tempApi";


const reduxStore = configureStore({
    reducer: {
        [tempApi.reducerPath]: tempApi.reducer,
    },
    middleware: def => [...def(), tempApi.middleware]
})

export default reduxStore