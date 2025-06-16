"use client";
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Font } from "./font";

const Navigation = ({next, previous, count, page}: any) => {
    const nextPage = page * 30;
    const remaining = (nextPage + 30) > count? count: nextPage + 30;

    return(
        <div className="flex flex-row justify-between mt-[10px]">
            <Font style="text-[12px] text-[#666667]">{`Showing ${count === 0? 0: nextPage + 1} to ${remaining} of ${count} entries`}</Font>
            <div className="flex flex-row items-center space-x-[7px]">
                <div onClick={previous} className="w-[20px] h-[20px] flex justify-center items-center bg-[#CDCDCD]">
                    <ChevronLeftIcon className='bg-white text-[12px]' />
                </div>
                <div onClick={next} className="w-[20px] h-[20px] flex justify-center items-center bg-[#3FA46E]">
                    <ChevronRightIcon className='bg-white text-[12px]' />
                </div>
            </div>
        </div>
    )
}

export default Navigation;