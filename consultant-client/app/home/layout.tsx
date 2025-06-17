"use client";
import Cookies from "js-cookie";
import { ReactNode, useCallback, useEffect } from "react";
import { AuthService } from "../lib/services/auth.service";
import { setLoggin, setUser } from "../lib/redux/slices/auth";
import { useAppDispatch } from "../lib/redux/controls";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    const userId = Cookies.get("consultant-key");
    const dispatch = useAppDispatch();

    const fetchUserData = useCallback(async() => {
        const { error, payload } = await AuthService.getAuthUser();
        if(!error && payload){
            dispatch(setUser(payload?.user));
            dispatch(setLoggin(true));
        }
    }, [])

    useEffect(() => {
        if(userId){
            fetchUserData();
        }
    }, [fetchUserData])

    return(
        <div className="w-full h-screen bg-gradient-to-r from-[#0098B9] to-[#003844]">
            { children }
        </div>
    )
}

export default HomeLayout;