// import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { getGridData } from "../services/dataService";
import { useStore } from "../stores";
import GridContent from "./GridContent";
import GridFooter from "./GridFooter";
import GridHeader from "./GridHeader";

const Grid = () => {
    const {gridStore} = useStore();

    useEffect(() => {
        let isPopulatedTimeout;
        const fetchData = async () => {
            const gridData = await getGridData();
            gridStore.setData(gridData);

            // isPopulatedTimeout = setTimeout(() => 
            //     runInAction(() => gridStore.setIsPopulated(true)), 2000);

            isPopulatedTimeout = setTimeout(
                () => gridStore.setIsPopulated(true), 2000);
        }

        fetchData();
        return () => isPopulatedTimeout && clearTimeout(isPopulatedTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                gridStore.isPopulated && 
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <GridHeader></GridHeader>
                        <GridContent></GridContent>
                    </table>
                    <GridFooter></GridFooter>
                </div>
            }
            {
                !gridStore.isPopulated && <p>Loading ...</p>
            }
        </>
    );
}

export default observer(Grid);