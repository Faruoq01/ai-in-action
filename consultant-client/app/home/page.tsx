"use client";

import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import Image from "next/image";
import { useAppSelector } from "../lib/redux/controls";
import { AppImages } from "../asset/appImages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SimpleChat from "../components/chat";
import { GoogleLogoutButton } from "../components/googleLogin";
import { useRouter } from "next/navigation";

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove("consultant-key");
    Cookies.remove("auth-key");
    router.push("/home");
  }

  return (
    <div className="flex flex-col h-screen"> 
      <div>
        <div className="flex flex-row justify-between px-[20px] py-[10px]">
          <Avatar>
            <AvatarImage src={user?.picture? user?.picture: "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <GoogleLogoutButton onLogout={onLogout}>
            <Image width={15} height={15} src={AppImages.logout} alt="icon" />
          </GoogleLogoutButton>
        </div>
        <Separator />
      </div>

      {/* chat container fills remaining space */}
      <div className="flex-grow overflow-auto mt-[20px]">
        <SimpleChat />
      </div>
    </div>
  );
};

export default Home;
