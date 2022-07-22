import Pagination from "./Pagination";

const GridFooter = () => {
    return (
        <>
            <hr className="border-.5 border-gray-300"/>
            <div className="my-6 px-6">
                <Pagination></Pagination>
            </div>
        </>

    )
}

export default GridFooter;