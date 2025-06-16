"use client";
import Image from "next/image";
import DoughnutChart from "./donutchart";
import { Font } from "./font";
import { AppImages } from "../assets";
import SquareIcon from '@mui/icons-material/Square';
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/controls";
import { DashboardService } from "../lib/services/dashboard.service";
import { setStudentStats } from "../lib/redux/slices/dashboard";

const Statistics = () => {
    const dispatch = useAppDispatch();
    const studentstats = useAppSelector(state => state.dashboard.studentstats);
    console.log(studentstats, "studentstats")

    const getStatsDetails = useCallback(async() => {
        const { error, payload } = await DashboardService.stats();
        if(!error && payload){
            dispatch(setStudentStats(payload));
        }
    }, [])

    useEffect(() => {
        getStatsDetails()
    }, [getStatsDetails]);

    const process = () => {
        const copy = JSON.parse(JSON.stringify(studentstats));
        const total = copy.reduce((accum: any, current: any) => {
            return accum + current?.applicationCount
        }, 0);

        if(total === 0) return copy;
        const updated = copy?.map((item: any) => {
            return {
                courseType: item?.courseType,
                applicationCount: (item?.applicationCount/total) * 100
            }
        })
        return updated;
    }

    const data = process();

    return(
        <div className="col-span-12 lg:col-span-4 rounded-[10px] border border-[#DDDDDD] shadow-sm bg-white px-[15px] py-[15px]">
            <div className="flex flex-row items-center space-x-[10px]">
                <Font style="text-[12px] font-[300] text-[#868686]">Student Statistics</Font>
                <Image src={AppImages.info} width={15} height={15} alt="icon" />
            </div>
            <div className="w-full h-[350px] flex flex-col items-center">
                <div className="mt-[30px]">
                    <DoughnutChart />
                </div>
                <div className="grid grid-cols-2 gap-x-[35px] gap-y-[20px] mt-[50px]">
                    {
                        data?.map((v: any, index: number) => {
                            return(
                                <div key={index} className="col-span-1 flex flex-row items-center space-x-[10px]">
                                    <SquareIcon sx={{color: Colors[index], fontSize: "20px"}} />
                                    <Font style="text-[12px] text-[#505F79]">{`${v?.courseType} - ${v?.applicationCount?.toFixed(1)}%`}</Font>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const Colors = ["#75a39b", "#d0aef2", "#22c7a4", "#319cb9", "#95b736", "#1f31d0"];

export default Statistics;