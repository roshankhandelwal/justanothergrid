// import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../stores";
import GridContent from "./GridContent";
import GridFooter from "./GridFooter";
import GridHeader from "./GridHeader";

const Grid = () => {
    const {gridStore} = useStore();

    useEffect(() => {
        gridStore.getData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                gridStore.isPopulated && 
                <div className="oveflow-hidden overflow-y-auto overflow-x-auto relative shadow-md sm:rounded-lg h-screen max-h-screen">
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