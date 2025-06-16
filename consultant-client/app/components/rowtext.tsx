"use client";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Font } from "@/app/components/font";
import Image from "next/image";
import { AppImages } from '@/app/assets';

export const RowText = ({ text, objKey, deleteHandler }: any) => {
    return(
        <div className="flex flex-row justify-between col-span-12 border-b pb-[10px] border-[#D4D4D4]">
            <Font style='text-[12px] flex flex-row space-x-[10px] text-[#868B93] items-start max-w-[330px]'>
                <FiberManualRecordIcon sx={{fontSize: "10px", marginTop: "5px"}}/>
                <span>
                    { text }
                </span>
            </Font>
            <div className='flex flex-row space-x-[10px] items-center'>
                <Image onClick={() => deleteHandler(objKey)} width={30} height={30} src={AppImages.delete} alt={"icon"} />
            </div>
        </div>
    )
}

export const RowTextCustom = ({ text, objKey, deleteHandler }: any) => {
    return(
        <div className="flex flex-row justify-between col-span-12 border-b pb-[10px] border-[#D4D4D4]">
            <Font style='text-[12px] flex flex-row space-x-[10px] text-[#868B93] items-start max-w-[330px]'>
                <FiberManualRecordIcon sx={{fontSize: "10px", marginTop: "5px"}}/>
                <span>
                    {text}
                </span>
            </Font>
            <div className='flex flex-row space-x-[10px] items-center'>
                <Image onClick={() => deleteHandler(objKey)} width={30} height={30} src={AppImages.delete} alt={"icon"} />
            </div>
        </div>
    )
}