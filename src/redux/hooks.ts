import { createSelectorHook, useDispatch } from "react-redux";
import { AppDispatch } from "./store";

export const useAppSelector = createSelectorHook();
export const useAppDispatch = () => useDispatch<AppDispatch>();
