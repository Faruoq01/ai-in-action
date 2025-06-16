"use client";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const Search = () => {
    return(
        <div className="flex flex-row items-center rounded-[5px] border border-[#BDBCBC] py-[5px] px-[7px] bg-white w-full max-w-[250px]">
            <MagnifyingGlassIcon />
            <input placeholder="Search" className="outline-none bg-transparent text-[12px]" />
        </div>
    )
}

export const StudentSearch = () => {
    return(
        <div className="flex flex-row items-center rounded-[20px] border  bg-[#0E262E] border-[#A8A8A8] py-[5px] px-[7px] w-full max-w-[300px]">
            <MagnifyingGlassIcon />
            <input placeholder="Search" className="outline-none bg-transparent text-[12px] text-[#ccc]" />
        </div>
    )
}

export default Search;