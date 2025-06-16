"use client";
import { useCallback, useEffect } from "react";
import { AppImages } from "../assets";
import CardItem from "./card";
import { DashboardService } from "../lib/services/dashboard.service";
import { useAppDispatch, useAppSelector } from "../lib/redux/controls";
import { setCards } from "../lib/redux/slices/dashboard";

const DashboardCards = () => {
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.dashboard.cards);

    const getCardDetails = useCallback(async() => {
        const { error, payload } = await DashboardService.cards();
        if(!error && payload){
            dispatch(setCards(payload));
        }
    }, [])

    useEffect(() => {
        getCardDetails()
    }, [getCardDetails]);

    return(
        <div className="w-full grid grid-cols-4 gap-[15px] mt-[15px]">
            <CardItem title ={"Total Application"} value={cards?.applications} icon={AppImages.totalApplied} />
            <CardItem title ={"Total Students Admitted"} value={cards?.students} icon={AppImages.totalAdmitted} />
            <CardItem title ={"Schools Onboarded"} value={cards?.schools} icon={AppImages.totalOnboard} />
            <CardItem title ={"Total Payment Transactions"} value={`N${cards?.payments?.toLocaleString()}`} icon={AppImages.totalPayment} />
        </div>
    )
}

export default DashboardCards;