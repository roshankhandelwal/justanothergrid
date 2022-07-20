import { createContext, useContext } from "react";
import GridStore from "./GridStore";

const store = {
    gridStore: GridStore()
}

export const GridStoreContext = createContext(store);

export const useStore = () => {
    return useContext(GridStoreContext) as typeof store;
}

export default store;