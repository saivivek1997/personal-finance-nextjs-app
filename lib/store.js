import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "@/lib/features/finance/financeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      finance: financeReducer,
    },
  });
};
