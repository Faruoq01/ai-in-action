"use client";
import { ReactNode } from "react";

interface FontType {
    children: ReactNode,
    style: string,
    callback?: () => void
}

export const Font: React.FC<FontType> = ({children, style, callback}) => {
    return(
        <div onClick={callback} className={`${style} redHatDisplay select-none`}>{children}</div>
    )
}