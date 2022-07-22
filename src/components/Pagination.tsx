import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { autorun, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { ReactNode, useEffect } from "react";
import {MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight} from 'react-icons/md';
import Icon from "../atoms/Icon";
import { useStore } from "../stores";


interface PaginationBtnObj {
    value: number; 
    isEnabled?: boolean; 
    isActive?: boolean;
    children? : ReactNode;
    changePage: (pageNum: number) => void 
}

export const PaginationButton : React.FC<PaginationBtnObj> = 
        ({value, isEnabled, isActive, children, changePage}) => {
    return (
        <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-4  mt-2 cursor-pointer
            ${isActive ? 'bg-white text-sky-500 border border-sky-500' : 
                isEnabled ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-400 border border-gray-200 cursor-not-allowed'}`}
            onClick = {e => isEnabled && changePage(value)}
        >
            {children ? children : value}
        </div>
    )
}

const Pagination = () => {
    const {gridStore} = useStore();

    const pageDetails = useLocalObservable(() => ({
        pageNum: 0,
        countPerPage: 10,
        totalCount: 0,
        pagesCount: 0,
        pagesList: [] as Array<any>,

        changePage(pageNum) {
            // Call an action on gridStore - to get new records
            gridStore.getData({pageNumber: pageNum})
        },
        
        changeRecordsCount(event) {
            // Call an action on gridStore - to get new records
            console.log(event.target.value);
            gridStore.getData({recordsPerPage: event.target.value})   
        }
    }));


    useEffect(() => {
        const disposeAutorun = autorun(() => {
            // const itemsList= gridStore.rows.length;
            const paginationObj= gridStore.paginationObj;
            // console.log(itemsList, paginationObj);

            runInAction(() => {
                pageDetails.pageNum = paginationObj.pageNum ?? 0;
                pageDetails.countPerPage = paginationObj.countPerPage ?? 10;
                pageDetails.totalCount = paginationObj.totalCount;
                pageDetails.pagesCount = Math.ceil(pageDetails.totalCount / pageDetails.countPerPage) ?? 0;
            });
            
            // console.log(pageDetails);

            const btnList : Array<any> = [];
            
            // Move to first page Btn
            btnList.push(<PaginationButton value={1} isEnabled={pageDetails.pageNum > 1} key="firstPage" changePage={pageDetails.changePage}><Icon icon={<MdFirstPage/>}></Icon></PaginationButton>);

            // Move to a before page Btn
            btnList.push(<PaginationButton value={pageDetails.pageNum - 1} isEnabled={pageDetails.pageNum > 1} key="previousPage" changePage={pageDetails.changePage}><Icon icon={<MdChevronLeft/>}></Icon></PaginationButton>);

            for (let i = 0; i < pageDetails.pagesCount; i++) {
                btnList.push(<PaginationButton value={i+1} isEnabled={true} isActive={pageDetails.pageNum === (i + 1)} key={i} changePage={pageDetails.changePage}></PaginationButton>) 
            }

            // Move to Next page Btn
            btnList.push(<PaginationButton value={pageDetails.pageNum + 1} isEnabled={pageDetails.pageNum < pageDetails.pagesCount} key="nextPage" changePage={pageDetails.changePage}><Icon icon={<MdChevronRight/>}></Icon></PaginationButton>);

            // Move to Last page Btn
            btnList.push(<PaginationButton value={pageDetails.pagesCount} isEnabled={pageDetails.pageNum < pageDetails.pagesCount} key="lastPage" changePage={pageDetails.changePage}><Icon icon={<MdLastPage/>}></Icon></PaginationButton>);

            runInAction(() => {
                pageDetails.pagesList = btnList;
            });
        });
        return () => disposeAutorun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-row items-center">
            {pageDetails.pagesList.length > 0 && 
                <div className="flex flex-row items-center gap-x-0.5 flex-wrap mr-16">
                    {pageDetails.pagesList.map(page => page)}
                </div>
            }
            <FormControl className="w-48">
                <InputLabel id="records-per-page">Items per Page</InputLabel>
                <Select
                    labelId="records-per-page"
                    value={pageDetails.countPerPage}
                    label="Items per Page"
                    onChange={pageDetails.changeRecordsCount}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
        </div>
       
        
    )
}

export default observer(Pagination);