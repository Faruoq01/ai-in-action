"use client";
import React from "react";
import Image from "next/image";
import { Font } from "./font";
import { AppImages } from "../assets";

interface EmptyScreenType {
  btnText?: string;
  callback?: () => void;
  page?: string;
}

const EmptyScreen: React.FC<EmptyScreenType> = () => {
  return (
    <div className="flex flex-col w-[50%] items-center justify-center">
      <Image
        src={AppImages.empty}
        alt="image"
        width={100}
        height={100}
        className="mb-[30px]"
      />
      <Font style="mb-[5px] text-[#434343] text-[14px] font-[600]">
        {`No data for now`}
      </Font>
      <Font style="pb-2 w-[250px] mb-5 text-[#707070] text-[12px] text-center">
        {`You have no data in your listing. Click on the add button to
                start listing your info.`}
      </Font>
    </div>
  );
};

export default EmptyScreen;
