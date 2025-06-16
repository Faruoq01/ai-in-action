"use client";
import Image from "next/image";
import { Font } from "./font";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const CardItem = ({ title, value, icon }: any) => {
    return(
        <div className="border border-[#DDDDDD] rounded-[10px] bg-[#fff] col-span-4 md:col-span-2 lg:col-span-1 px-[15px] pt-[25px] shadow-sm">
            <div className="flex flex-row space-x-[15px]">
                <Image src={icon} width={45} height={45} alt="icon" />
                <div className="flex flex-col items-start">
                    <Font style="text-[12px] font-[300] text-[#868686]">{title}</Font>
                    <Font style="text-[15px] font-[600] mt-[1px]">{value}</Font>
                </div>
            </div>
            <div className="w-full flex flex-row justify-end mb-[5px]">
                <TrendingFlatIcon sx={{color: "#868686"}} />
            </div>
        </div>
    )
}

export default CardItem;