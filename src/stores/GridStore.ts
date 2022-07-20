import { action, computed, makeObservable, observable } from "mobx";
import { arrayMoveMutable } from 'array-move';

interface GridData {
    rows: Array<any>,
    columnsOrder: Array<string>,
    columns: {},
    pageTotal: number,
    total: number
}

const GridStore = () => {
    return makeObservable({
        data: {} as GridData,
        populated: false,

        setData(data: GridData) {
            this.data = data;
        },
    
        get gridRows() : Array<any>{
            return this.data.rows;
        },

        get gridColsOrder() {
            return [...this.data.columnsOrder];
        },

        get gridCols() {
            return this.data.columns;
        },

        get isPopulated() {
            return this.populated;
        },

        setIsPopulated(status) {
            this.populated = status;
        },

        updateGridColsOrder(insertBeforeColumnKey : string, moveFromIndex: number) {
            const moveToIndex = this.data.columnsOrder.indexOf(insertBeforeColumnKey);
            arrayMoveMutable(this.data.columnsOrder, moveFromIndex, moveToIndex);
        }

    }, {
        data: observable,
        populated: observable,
        
        setData: action,
        setIsPopulated: action,
        updateGridColsOrder: action,

        gridRows: computed,
        gridCols: computed,
        gridColsOrder: computed,
        isPopulated: computed
    })
}

export default GridStore;