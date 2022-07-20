import { observer } from "mobx-react-lite";
import { useStore } from "../stores";

const GridContent = () => {
    const {gridStore} = useStore();

    return (
        <tbody>
            {
                gridStore.gridRows.map(row => (
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={row.docId}>
                        {gridStore.gridColsOrder.map(colKey => (
                            <td className="py-4 px-6" key={colKey}>
                                {row[colKey]}
                            </td>
                        ))}
                    </tr>
                ))
            }
        </tbody>
    )
}

export default observer(GridContent);