"use client";
import { MixerHorizontalIcon } from '@radix-ui/react-icons';

const Filter = () => {
    return(
        <div className="flex flex-row items-center rounded-[5px] border border-[#BDBCBC] py-[5px] px-[7px] bg-white w-full max-w-[114px]">
            <input placeholder="Filter" disabled className="outline-none bg-transparent text-[12px] w-[80px]" />
            <MixerHorizontalIcon />
        </div>
    )
}

export default Filter;