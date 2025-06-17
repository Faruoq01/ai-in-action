"use client";

import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return(
        <div className="w-full h-screen bg-gradient-to-r from-[#0098B9] to-[#003844]">
            { children }
        </div>
    )
}

export default HomeLayout;