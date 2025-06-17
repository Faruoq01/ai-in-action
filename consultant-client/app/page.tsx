"use client";
import Image from "next/image";
import { AppImages } from "./asset/appImages";
import { Font } from "./components/font";
import { GoogleLoginButton } from "./components/googleLogin";
import { CredentialResponse } from "@react-oauth/google";
import { AuthService } from "./lib/services/auth.service";
import { useAppDispatch } from "./lib/redux/controls";
import { setLoggin, setUser } from "./lib/redux/slices/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Loader } from "./components/loader";

const Landing = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSuccess = async(data: CredentialResponse) => {
    const param = {
      token: data?.credential
    }

    try{
      const { error, payload } = await AuthService.login(param);
      if(!error && payload){
        dispatch(setUser(payload));
        dispatch(setLoggin(true));
        Cookies.set("consultant-key", payload.id);
        router.push("/home");
      }
    }catch(error){
      console.log(error);
    }
  }

  return(
    <Fragment>
      {loading || 
        <div className="w-full h-screen bg-gradient-to-r from-[#0B9CBC] to-[#FFFFFF] grid grid-cols-12">
          <div className="col-span-5 flex flex-col items-start justify-center w-full h-full px-[40px] py-[30px]">
            <div className="w-full flex flex-row items-start">
              <Image width={80} height={80} src={AppImages.logo} alt="icon" />
            </div>
            <div className="w-full h-full flex-1 flex flex-col justify-center items-start">
              <Font style="font-[600] text-[16px] text-left text-[#333333] leading-loose">
                ❝Welcome to <span className="text-white font-[800]">Smart Health Consultant</span>, 
                your secure, AI‑powered medical advisor. Simply describe your symptoms or questions, 
                and our system will retrieve relevant real‑world health records, run specialized medical “tools” 
                (cardiology, neurology, pharmacology, and more), and deliver clear, personalized 
                insights. Whether you need diagnostic reasoning, medication audits, or patient‑friendly 
                explanations, Smart Health Consultant brings expert‑level guidance right to your 
                fingertips—anytime, anywhere.❞
              </Font>
              <div className="mt-[30px]">
                <GoogleLoginButton onSuccess={onSuccess} />
              </div>
            </div>
          </div>
          <div className="col-span-7 flex justify-center items-center">
            <div className="w-[500px] h-[500px] relative">
              <Image fill src={AppImages.loglogo} alt="icon" />
            </div>
          </div>
        </div>
      }
      {loading &&
        <Loader />
      }
    </Fragment>
  )
}

export default Landing;