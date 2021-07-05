import { useContext } from "react";
import { store } from "../state";

const useAppState = () => useContext(store);

export default useAppState;
