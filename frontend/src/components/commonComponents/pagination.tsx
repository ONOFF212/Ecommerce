
import { useEffect, useState } from "react";

interface paginationProps {
    page:number;
    totalPages:number;
    onPageChange:(page:number) => void;
}

export default function Pagination({page,totalPages,onPageChange}:paginationProps) {

    return(
           <div className="flex items-center  p-1 justify-evenly mx-auto min-w-0 w-70 mt-auto  border-1 outline-none rounded-lg ">
                <button
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className=" text-center bg-[#4F46E5] text-white font-bold rounded-xl px-4 hover:bg-red-900 "
                >
                    Previous
                </button>

                <span className="px-2"> Page {page} of {totalPages} </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="text-center bg-[#4F46E5] text-white font-bold rounded-xl px-4 hover:bg-red-900"
                >
                    Next
                </button>
            </div>
    );
};