"use client";
import Image from "next/image";
import { Font } from "./font";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppImages, AppPages } from "../assets";
import { useAppSelector } from "../lib/redux/controls";
import toast from "react-hot-toast";

export const PortalSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector(state => state.auth.user);

  const handlePageClick = (v: any) => {
    if(!user?.student) return toast.success("Please complete your profile first");
    router.push(v.link[0])
  }

  return (
    <div className="w-[270px] h-screen hidden lg:flex flex-col items-center bg-[#071C23] border-r border-[#0A323F] px-[20px] py-[20px]">
      <Image src={AppImages.logo} width={130} height={60} alt="icon" />
      <div className="w-full mt-[60px]">
        {sideItems.map((v: any, i: number) => {
          return (
            <div
              onClick={() => handlePageClick(v)}
              key={i}
              className={cn(
                "h-[40px] px-[10px] rounded-[5px] flex flex-row cursor-pointer items-center space-x-[10px] mb-[10px]",
                v.link?.includes(pathname) ? "bg-[#fff] text-[#071C23]" : "bg-[#071C23] text-[#6A6A6A]"
              )}
            >
              <Image src={v.link?.includes(pathname)? v?.activeIcon: v.inactiveIcon} width={v?.name === 'Scholarships'? 20: 15} height={v?.name === 'Scholarships'? 20: 15} alt="icon" />
              <Font style="text-[14px]">{v.name}</Font>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const sideItems = [
  {
    name: "Profile",
    activeIcon: AppImages.portal.sidebar.activeprof,
    inactiveIcon: AppImages.portal.sidebar.inactiveProf,
    link: [AppPages.portal.home.info],
  },
  {
    name: "Course Application",
    activeIcon: AppImages.portal.sidebar.activecourse,
    inactiveIcon: AppImages.portal.sidebar.inactivecourse,
    link: [
      AppPages.portal.home.application,
      AppPages.portal.home.apply
    ],
  },
  {
    name: "Application History",
    activeIcon: AppImages.portal.sidebar.activehistory,
    inactiveIcon: AppImages.portal.sidebar.inactivehistory,
    link: [
      AppPages.portal.home.history,
    ],
  },
  {
    name: "Payments",
    activeIcon: AppImages.portal.sidebar.activepayment,
    inactiveIcon: AppImages.portal.sidebar.inactivepayment,
    link: [
      AppPages.portal.home.payment
    ],
  },
  {
    name: "Scholarship",
    activeIcon: AppImages.portal.sidebar.activeschol,
    inactiveIcon: AppImages.portal.sidebar.inactiveschol,
    link: [
      AppPages.portal.home.scholarship
    ],
  },
  {
    name: "Settings",
    activeIcon: AppImages.portal.sidebar.activesettings,
    inactiveIcon: AppImages.portal.sidebar.inactivesettings,
    link: [
      AppPages.portal.home.settings.profile,
      AppPages.portal.home.settings.notifiation,
      AppPages.portal.home.settings.reset
    ],
  },
];
