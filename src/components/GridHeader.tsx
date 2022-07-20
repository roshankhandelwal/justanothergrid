import { observer } from "mobx-react-lite";
import { useStore } from "../stores";

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

    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            onDrop={dropHandler} onDragOver={dragOverHandler}
        >
            <tr>
                {gridStore.gridColsOrder?.map((colKey: string, index: number) => (
                    <th scope="col" className="py-3 px-6" key={colKey} data-key={colKey}
                        draggable 
                        onDragStart={ev => dragStartHandler(ev, index)}
                    >
                        {gridStore.gridCols[colKey].label}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default observer(GridHeader);