"use client";
import { FC, Fragment, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Image from "next/image";
import { AppImages } from "../assets";

interface FormEvent {
    register?: UseFormRegister<any>,
    name: string,
    formErrors?: any,
    style: string,
    type: string,
    label: string,
    isPassword?: boolean,
    disabled?: boolean,
    custom?: string,
    max?: string,
    duration?: any,
    placeholder?: string
}

const InputField: FC<FormEvent> = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return(
        <Fragment>
            <div className={`${props.style} border rounded-[5px] ${
                props?.formErrors[props.name] ? "border border-red-600" : "border border-transparent"
            }`}>
                <div className={`text-[11px] flex flex-col items-start cursor-pointer rounded-[5px]`}>
                    <div className="flex flex-row space-x-[10px]">
                        <label className="text-[12px] text-[#fff]">{props.label}</label>
                        {props.duration}
                    </div>
                    <div className="w-full relative">
                        {props.type === "daterange" || <input 
                            min={"1"}
                            max={"100"}
                            disabled = {props.disabled? true: false}
                            className={`w-[100%]  text-[11px] text-[#989898] outline-none mt-[4px]`}
                            placeholder= { `Enter ${props.placeholder}` }
                            {...(props.register && props.register(props.name))} type={!showPassword? props.type: "text"} 
                        />}
                        {props.isPassword ? (
                            <Image
                                className={`absolute inset-y-0 right-0 flex items-center`}
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
                </div>
            </div>
            {props.formErrors[props.name] && <p className="text-red-600 text-[12px] mt-[5px]">{props.formErrors[props.name]['message']}</p>}
        </Fragment>
    )
}

export default InputField;

