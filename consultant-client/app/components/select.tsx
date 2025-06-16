"use client";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
interface FormEvent {
    register?: UseFormRegister<any>,
    name: string,
    formErrors: any,
    style?: string,
    label: string,
    multiselect?: boolean,
    options: any[],
    disabled?: boolean,
    inputStyle?: string,
    mode?: boolean
}

const SelectField: FC<FormEvent> = (props) => {

    return(
        <div className={`${props.style} text-[11px] text-left text-[#ccc] flex flex-col`}>
            <label>{props.label}</label>
            <div className="w-full relative">
                <select 
                    disabled={props.disabled}
                    multiple = {props.multiselect? true: false} 
                    className={`${props.inputStyle} border appearance-none w-[100%] rounded-md py-2 px-[10px] text-[12px] outline-none mt-[5px] mb-[5px] ${
                        props?.formErrors[props.name] ? "border-red-600" : "border-grey-dark-30"
                    }`}
                    {...(props.register && props.register(props.name))}>
                    <option value="">Select an option</option>
                    {props?.options?.map((v, i) => (
                        <option key={i} style={{ paddingRight: "5px" }} value={v.id}>
                            {v.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-0 top-[18px] flex items-center pr-[10px] border-grey-dark-30">
                    <svg className={`${props.mode? "fill-[#ccc]": 'fill-grey-dark-30'} h-[12px] w-[14px]`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-8-8-1 2 9 9 9-9-1-2-8 8z"/></svg>
                </div>
            </div>
            {props.formErrors[props.name] && <p className="text-red-600">{props.formErrors[props.name]['message']}</p>}
        </div>
    )
}

export const SelectAdminField: FC<FormEvent> = (props) => {

    return(
        <div className={`${props.style} text-[11px] text-left text-[#000] flex flex-col`}>
            <label>{props.label}</label>
            <div className="w-full relative">
                <select 
                    disabled={props.disabled}
                    multiple = {props.multiselect? true: false} 
                    className={`${props.inputStyle? props.inputStyle: 'border border-[#BDBCBC]'} border appearance-none w-[100%] rounded-md py-2 px-[10px] text-[12px] outline-none mt-[5px] mb-[5px] ${
                        props?.formErrors[props.name] ? "border-red-600" : "border-grey-dark-30"
                    }`}
                    {...(props.register && props.register(props.name))}>
                    <option value="">Select an option</option>
                    {props?.options?.map((v, i) => (
                        <option key={i} style={{ paddingRight: "5px" }} value={v.id}>
                            {v.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-0 top-[18px] flex items-center pr-[10px] border-grey-dark-30">
                    <svg className={`${props.mode? "fill-[#ccc]": 'fill-grey-dark-30'} h-[12px] w-[14px]`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-8-8-1 2 9 9 9-9-1-2-8 8z"/></svg>
                </div>
            </div>
            {props.formErrors[props.name] && <p className="text-red-600">{props.formErrors[props.name]['message']}</p>}
        </div>
    )
}

export default SelectField;

