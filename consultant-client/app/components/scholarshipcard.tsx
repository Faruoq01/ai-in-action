"use client";
import Image  from "next/image";
import { Badge } from "@/components/ui/badge";
import { Font } from "./font";
import { AppImages } from "../assets";

const ScholarshipCard = ({ data, key }: any) => {
    return(
        <div key={key} className='col-span-12 md:col-span-6 lg:col-span-4 w-full rounded-[10px] overflow-hidden bg-white border border-[#DDDDDD]'>
            <div className='w-full py-[15px] px-[20px] bg-[#ECEDF1]'>
                <Font style='font-[600] text-[12px] mt-[5px]'>{data?.title.concat(" ", data?.scholarshipValue)+ " Scholarship"}</Font>
                <div className='flex flex-row justify-between mt-[20px]'> 
                    <Badge className={'rounded-[20px] bg-[#E5F5FF] shadow-[0px] hover:bg-[#E5F5FF] border text-[#2C3A50] border-[#DBDBDB] font-[300] text-[11px]'}>Application Open</Badge>
                    <Image src={AppImages.dots} width={25} height={25} alt={'icon'} />
                </div>
            </div>
            <div className='px-[20px] py-[25px] w-full grid grid-cols-2 gap-[20px] min-h-[130px]'>
                <div className='flex flex-row justify-start items-start'>
                    <Image src={AppImages.edu} width={20} height={20} alt={'icon'} />
                    <div className='ml-[10px] flex flex-col'>
                        <Font style='font-[300] text-[10px]'>PROGRAM</Font>
                        <Font style='font-[600] text-[10px]'>Diploma</Font>
                    </div>
                </div>
                <div className='flex flex-row justify-start items-start'>
                    <Image src={AppImages.hat} width={20} height={20} alt={'icon'} />
                    <div className='ml-[10px] flex flex-col'>
                        <Font style='font-[300] text-[10px]'>SCHOOL APPLICABLE</Font>
                        <Font style='font-[600] text-[10px]'>ABU, Institute of ICT</Font>
                    </div>
                </div>
                <div className='flex flex-row justify-start items-start'>
                    <Image src={AppImages.clock} width={20} height={20} alt={'icon'} />
                    <div className='ml-[10px] flex flex-col'>
                        <Font style='font-[300] text-[10px]'>Deadline</Font>
                        <Font style='font-[600] text-[10px]'>23-04-2024</Font>
                    </div>
                </div>
                <div className='flex flex-row justify-start items-start'>
                    <Image src={AppImages.val} width={20} height={20} alt={'icon'} />
                    <div className='ml-[10px] flex flex-col'>
                        <Font style='font-[300] text-[10px]'>Value</Font>
                        <Font style='font-[600] text-[10px]'>30% Tuition</Font>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScholarshipCard;