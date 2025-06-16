"use client";
import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Image from "next/image";
import { AppImages } from "../assets";

interface FormEvent {
    register?: UseFormRegister<any>,
    name: string,
    formErrors: any,
    style: string,
    type: string,
    label: string,
    isPassword?: boolean,
    disabled?: boolean,
    custom?: string,
    max?: string,
    duration?: any,
    placeholder?: string,
    inputStyle?: string,
    minDate?: string
}

const TextInput: FC<FormEvent> = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return(
        <div className={`${props.style} text-[11px] flex flex-col items-start cursor-pointer`}>
            <div className="flex flex-row space-x-[10px]">
                <label className={`${props.inputStyle? 'text-[#CECFD2]': 'text-[#000]'}`}>{props.label}</label>
                {props.duration}
            </div>
            <div className="w-full relative">
                {props.type === "daterange" || <input 
                    min={props.minDate}
                    max={100}
                    disabled = {props.disabled? true: false}
                    className={`border w-[100%] rounded-[5px] py-2 ${
                        props.custom? props.custom: "px-[10px]"
                    } text-[12px] outline-none mt-[5px] mb-[5px] ${
                        props?.formErrors[props.name] ? "border-red-600" : ""
                    } ${props.inputStyle? props.inputStyle: "border border-[#BDBCBC]"}`}
                    placeholder= { props.placeholder }
                    {...(props.register && props.register(props.name))} type={!showPassword? props.type: "text"} 
                />}
                {props.isPassword ? (
                    <Image
                        className={`absolute inset-y-0 right-0 flex items-center mr-3 mt-[15px]`}
                        onClick={() => setShowPassword(!showPassword)}
                        src={showPassword ? AppImages.show : AppImages.hide}
                        width={18}
                        height={18}
                        priority
                        alt={"icon"}
                    />
                    ) : null
                }
            </div>
            {props.formErrors[props.name] && <p className="text-red-600">{props.formErrors[props.name]['message']}</p>}
        </div>
    )
}

export default TextInput;

