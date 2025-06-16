"use client";
import Image  from "next/image";
import { Badge } from "@/components/ui/badge";
import { Font } from "./font";
import { AppImages } from "../assets";
import { CustomButton } from "./button";
import { getLocalTime } from "../lib/utils/time.local";

const StudentScholarshipCard = ({ data, key }: any) => {
    return(
        <div key={key} className='col-span-12 md:col-span-6 lg:col-span-4 w-full rounded-[10px] overflow-hidden bg-transparent border-[0.1px] border-[#ccc] text-[#fff]'>
            <div className='w-full py-[15px] px-[20px] bg-[#072E39]'>
                <Font style='font-[600] text-[12px] mt-[5px] text-[#fff]'>{data?.title.concat(" ", data?.scholarshipValue)+ " Scholarship"}</Font>
                <div className='flex flex-row justify-between mt-[20px]'> 
                    <Badge className={'rounded-[20px] bg-[#205161] shadow-[0px] hover:bg-[#205161] text-[#fff] font-[300] text-[11px]'}>Application Open</Badge>
                    {/* <Image src={AppImages.dots} width={25} height={25} alt={'icon'} /> */}
                </div>
            </div>
            <div className='px-[20px] py-[20px] w-full grid grid-cols-2 gap-[20px] min-h-[130px]'>
                <div className='flex flex-row justify-start items-start'>
                    <Image src={AppImages.edu} width={20} height={20} alt={'icon'} />
                    <div className='ml-[10px] flex flex-col'>
                        <Font style='font-[300] text-[10px]'>PROGRAM</Font>
                        <Font style='font-[600] text-[10px]'>{data?.programType}</Font>
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
                        <Font style='font-[600] text-[10px]'>{getLocalTime(data?.deadline)}</Font>
                    </div>
                </div>
                <div className='flex flex-row justify-start items-start'>
                    <Image src={AppImages.val} width={20} height={20} alt={'icon'} />
                    <div className='ml-[10px] flex flex-col'>
                        <Font style='font-[300] text-[10px]'>Value</Font>
                        <Font style='font-[600] text-[10px]'>{data?.scholarshipValue}% Tuition</Font>
                    </div>
                </div>
                <CustomButton 
                    callback={() => {}}
                    frontIcon={
                        <Image src={AppImages.more} width={20} height={20} alt={'icon'} className='ml-[10px]' />
                    }
                    variant={'default'}
                    style="text-[12px] bg-[#41A36E] hover:bg-[#41A36E] px-[12px] col-span-2 mt-[20px]"
                    title="View more"
                />
            </div>
        </div>
    )
}

export default StudentScholarshipCard;