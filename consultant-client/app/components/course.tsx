"use client";
import Image from "next/image";
import { AppImages, AppPages } from "../assets";
import { Font } from "./font";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../lib/redux/controls";
import { setSingleCourseDetail } from "../lib/redux/slices/courses";

export const CourseCard = ({ data, key }: any) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const goToDetails = () => {
        dispatch(setSingleCourseDetail(data));
        router.push(AppPages.home.courses.courseDetails);
    }

    const goToEdit = () => {
        dispatch(setSingleCourseDetail(data));
        router.push(AppPages.home.courses.edit.info);
    }

    return(
        <div key={key} className='col-span-4 shadow-sm bg-[#fff] md:col-span-2 lg:col-span-1 overflow-hidden border border-[#DDDDDD] rounded-[5px] flex flex-col justify-start relative'>
            <div 
                style={{backgroundImage: `url(${data?.courseBanner?.publicUrl})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}} 
                className='w-full relative h-[150px] bg-black'>
            </div>
            <div className='px-[15px] py-[15px]'>
                <div className='flex flex-row justify-between items-center'>
                    <Font style='text-[12px] font-[600]'>{data?.courseName}</Font>
                    <Badge 
                        className='text-[10px] rounded-[20px] font-[500] bg-[#DFF1FF] shadow-[0px] text-[#000] border border-[#DBDBDB]'>{data?.courseType}</Badge>
                </div>
                <Font style='text-[12px] font-[400] mt-[15px] text-[#727272]'>
                    {data?.description}
                </Font>
                <div className='mt-[15px] flex flex-row space-x-[10px] items-center'>
                    <Image src={AppImages.clock} width={18} height={18} alt='icon' />
                    <Font style='text-[12px] font-[400]'>{data?.duration.concat(" ", data?.durationType)}</Font>
                </div>
                <div className='mt-[20px] flex flex-row space-x-[10px] items-center'>
                    <Image src={AppImages.hat} width={18} height={18} alt='icon' />
                    <Font style='text-[11px] font-[400]'>{data?.school?.schoolName}</Font>
                </div>
            </div>
            <div className="absolute w-full flex flex-row justify-end px-[10px] py-[10px]">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <MenuIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="text-[12px]" onClick={goToDetails}>View</DropdownMenuItem>
                        <DropdownMenuItem className="text-[12px]" onClick={goToEdit}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-[12px]">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export const LandingCourseCard = ({ data }: any) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const goToCourseDetails = () => {
        dispatch(setSingleCourseDetail(data));
        router.push(AppPages.landing.courseDetails);
    }

    return(
        <div onClick={goToCourseDetails} className='col-span-3 md:col-span-2 lg:col-span-1 shadow-sm bg-[#FFFCF7] overflow-hidden border border-[#DDDDDD] rounded-[5px] flex flex-col justify-start'>
            <div 
                style={{backgroundImage: `url(${data?.courseBanner?.publicUrl})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}} 
                className='w-full relative h-[150px] bg-black'>
            </div>
            <div className='px-[15px] py-[15px]'>
                <div className='flex flex-row justify-between items-center'>
                    <Font style='text-[12px] font-[600]'>{data?.courseName}</Font>
                    <Badge 
                        className='text-[10px] rounded-[20px] font-[500] bg-[#DFF1FF] shadow-[0px] text-[#000] border border-[#DBDBDB]'>{data?.courseType}</Badge>
                </div>
                <Font style='text-[12px] font-[400] mt-[15px] text-[#727272]'>
                    {data?.description} 
                </Font>
                <div className='mt-[15px] flex flex-row space-x-[10px] items-center'>
                    <Image src={AppImages.clock} width={18} height={18} alt='icon' />
                    <Font style='text-[12px] font-[400]'>{data?.duration?.concat(" ", data?.durationType)}</Font>
                </div>
                <div className='mt-[20px] flex flex-row space-x-[10px] items-center'>
                    <Image src={AppImages.hat} width={18} height={18} alt='icon' />
                    <Font style='text-[11px] font-[400]'>{data?.school?.schoolName}</Font>
                </div>
            </div>
        </div>
    )
}

const MenuIcon = () => {
    return(
        <svg width="28" height="28" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.19048" y="1.19048" width="35.619" height="35.619" rx="17.8095" fill="#F5F5F5"/>
            <rect x="1.19048" y="1.19048" width="35.619" height="35.619" rx="17.8095" stroke="#B4B4B4" stroke-width="1.61905"/>
            <circle cx="10.6978" cy="19.3955" r="2.37209" fill="#CACACA"/>
            <circle cx="19.3955" cy="19.3955" r="2.37209" fill="#CACACA"/>
            <circle cx="28.093" cy="19.3955" r="2.37209" fill="#CACACA"/>
        </svg>
    )
}