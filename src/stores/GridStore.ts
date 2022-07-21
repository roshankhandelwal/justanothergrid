import { action, computed, makeObservable, observable } from "mobx";
import { arrayMoveMutable } from 'array-move';

interface GridData {
    rows: Array<any>,
    columnsOrder: Array<string>,
    columns: {},
    pageTotal: number,
    total: number
}

interface SortOrder {
    colKey: string,
    order: number
}

const GridStore = () => {
    return makeObservable({
        rows: [] as Array<any>,
        columnsOrder: [] as Array<string>,
        columns: {},
        pageTotal: 0,
        total: 0,
        populated: false,
        // sortOrders: [] as Array<SortOrder>,
        sortOrder: {} as SortOrder,

        setData(data: GridData) {
            this.rows = data.rows;
            this.columnsOrder = data.columnsOrder;
            this.columns = data.columns;
            this.pageTotal = data.pageTotal;
            this.total = data.total;
        },
    
        get gridRows() : Array<any>{
            return this.rows;
        },

        get gridColsOrder() {
            return [...this.columnsOrder];
        },

        get gridCols() {
            return this.columns;
        },

        get isPopulated() {
            return this.populated;
        },

        setIsPopulated(status) {
            this.populated = status;
        },

        updateGridColsOrder(insertBeforeColumnKey : string, moveFromIndex: number) {
            const moveToIndex = this.columnsOrder.indexOf(insertBeforeColumnKey);
            arrayMoveMutable(this.columnsOrder, moveFromIndex, moveToIndex);
        },

        updateSortOrders(colKey) {
            let newOrder;
            if (this.sortOrder.colKey === colKey) {
                let currentSortOrder = this.sortOrder.order || 1;
                newOrder = currentSortOrder > 0 ? -1 : 1;
            } else {
                newOrder = 1;
            }
            this.sortOrder = {colKey, order : newOrder};
            this.sortData(this.sortOrder.colKey, newOrder);
        },

        get gridSortOrder() {
            return this.sortOrder ?? {};
        },

        sortData(colKey: string, order: number) {
            this.rows = this.rows.sort((row1, row2) => {
                let val1 = row1[colKey];
                let val2 = row2[colKey];

                // Number Comparison
                if (typeof val1 === 'number' || typeof val2 === 'number') {
                    return order > 0 ? val1 - val2 : val2 - val1;
                }

                // String comparison
                if(typeof val1 === 'string' || typeof val2 === 'string') {
                    val1 = val1.toLocaleLowerCase();
                    val2 = val2.toLocaleLowerCase();
                    return order > 0 ? val1.localeCompare(val2) : val2.localeCompare(val1)
                }

                return order > 0 ? val1.localeCompare(val2) : val2.localeCompare(val1);
            })
        }

    }, {
        rows: observable,
        columnsOrder: observable,
        populated: observable,
        sortOrder: observable,
        
        setData: action,
        setIsPopulated: action,
        updateGridColsOrder: action,
        updateSortOrders: action,
        sortData: action,

        gridRows: computed,
        gridCols: computed,
        gridColsOrder: computed,
        isPopulated: computed,
        gridSortOrder: computed
    })
}

export default GridStore;