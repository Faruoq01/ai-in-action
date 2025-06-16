"use client";
import Image from "next/image";
import { Font } from "./font";
import LineChart from "./linechart";
import { AppImages } from "../assets";
import { useCallback, useEffect, useState } from "react";
import { DashboardService } from "../lib/services/dashboard.service";
import { useAppDispatch } from "../lib/redux/controls";
import { setPaymentReport } from "../lib/redux/slices/dashboard";

const DashboardGraph = () => {
    const [date, setDate] = useState(getTodayDate());
    const dispatch = useAppDispatch();

    const getGraphDetails = useCallback(async() => {
        const year = date?.split("-")[0];
        const param = { year: parseInt(year)};
        const { error, payload } = await DashboardService.graph(param);
        if(!error && payload){
            const data = payload?.length > 0? payload[0]: null;
            if(data){
                const values = data?.payments?.map((item: any) => {
                    return item?.totalAmount?.totalAmount;
                });
                dispatch(setPaymentReport(values));
            }
        }
    }, [date])

    useEffect(() => {
        getGraphDetails()
    }, [getGraphDetails]);

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0'); 
        return `${year}-${month}-${day}`;
    }
    
    return(
        <div className="col-span-12 lg:col-span-8 rounded-[10px] border border-[#DDDDDD] shadow-sm bg-white px-[20px] py-[20px]">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center space-x-[10px]">
                    <Font style="text-[12px] font-[300] text-[#868686]">Payment Report</Font>
                    <Image src={AppImages.info} width={15} height={15} alt="icon" />
                </div>
                <input 
                    onChange={e => setDate(e.target.value)}
                    className="outline-none px-[10px] text-[12px] border py-[5px] rounded-[5px] focus:outline-none"
                    value={date} 
                    type="date"  
                />
            </div>
            <div className="w-full h-[350px] mt-[10px]">
                <LineChart />
            </div>
        </div>
    )
}

export default DashboardGraph;