"use client";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface FormEvent {
    register?: UseFormRegister<any>,
    name: string,
    formErrors: any,
    style: string,
    type: string,
    label: string,
    disabled?: boolean,
    custom?: string,
    max?: string,
    duration?: any,
    placeholder?: string,
    inputStyle?: string
}

const TextInputArea: FC<FormEvent> = (props) => {

    return(
        <div className={`${props.style} text-[11px] text-[#6E6E6E] flex flex-col items-start cursor-pointer`}>
            <div className="flex flex-row space-x-[10px]">
                <label className={`${props.inputStyle? 'text-[#ccc]': 'text-[#000]'}`}>{props.label}</label>
                {props.duration}
            </div>
            <div className="w-full relative">
                {props.type === "daterange" || <textarea 
                    min={"1"}
                    max={"100"}
                    disabled = {props.disabled? true: false}
                    className={`${props.inputStyle? props.inputStyle: 'border border-[#BDBCBC]'} border w-[100%] h-[90px] rounded-[5px] py-2 ${
                        props.custom? props.custom: "px-[10px]"
                    } text-[12px] outline-none mt-[5px] mb-[5px] ${
                        props?.formErrors[props.name] ? "border-red-600" : ""
                    }`}
                    placeholder= { props.placeholder }
                    {...(props.register && props.register(props.name))}
                />}
            </div>
            {props.formErrors[props.name] && <p className="text-red-600">{props.formErrors[props.name]['message']}</p>}
        </div>
    )
}

export default TextInputArea;

