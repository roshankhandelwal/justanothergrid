import { observer } from "mobx-react-lite";
import IconHoc from "../atoms/Icon.hoc";
import { useStore } from "../stores";

import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

const GridHeader = () => {
    const {gridStore} = useStore();

    const dragStartHandler = (ev, index) => {
        ev.dataTransfer.setData("text/plain", index);
        ev.dataTransfer.dropEffect = "move";
    }
    
    // Handling when the element was dropped.
    const dropHandler = (ev) => {
        ev.preventDefault();
        const moveFromIndex = ev.dataTransfer.getData("text/plain");
        const insertBeforeCol = ev.target.dataset.key;

        gridStore.updateGridColsOrder(insertBeforeCol, moveFromIndex);
    }

    const dragOverHandler = (ev) => {
        ev.preventDefault();
    }

    const toggleSort = (colKey) => {
        gridStore.updateSortOrders(colKey);
    }

    return (
        <thead className="text-xs bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            onDrop={dropHandler} onDragOver={dragOverHandler}
        >
            <tr className="items-center">
                {gridStore.gridColsOrder?.map((colKey: string, index: number) => (
                    <th scope="col" 
                        className="py-3 px-6" 
                        key={colKey} data-key={colKey}
                        draggable onDragStart={ev => dragStartHandler(ev, index)}
                        onClick = {() => toggleSort(colKey)}
                    >
                        <div className="flex grow flex-row items-center">
                            <span className="text-gray-700 uppercase mr-2 cursor-pointer">{gridStore.gridCols[colKey].label}</span>
                            <>
                                {gridStore.gridSortOrder.colKey === colKey && gridStore.gridSortOrder.order > 0 && 
                                    <IconHoc icon={<FaLongArrowAltUp />} fontSize="14"></IconHoc>
                                }
                                {gridStore.gridSortOrder.colKey === colKey && gridStore.gridSortOrder.order < 0 && 
                                    <IconHoc icon={<FaLongArrowAltDown />} fontSize="14"></IconHoc>
                                }
                            </>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default observer(GridHeader);