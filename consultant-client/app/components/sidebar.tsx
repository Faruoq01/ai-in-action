"use client";
import Image from "next/image";
import { Font } from "./font";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppImages, AppPages } from "../assets";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-[200px] xl:w-[220px] h-screen hidden lg:flex flex-col items-center bg-[#071C23] py-[20px]">
      <div className="w-full flex flex-row px-[20px]">
        <Image src={AppImages.logo} width={130} height={60} alt="icon" />
      </div>
      <div className="w-full mt-[60px]">
        {sideItems.map((v: any, i: number) => {
          return (
            <div
              onClick={() => router.push(v.link[0])}
              key={i}
              className={cn(
                "w-full h-[40px] flex flex-row cursor-pointer items-center space-x-[10px] mb-[10px]",
                v.link?.includes(pathname) ? "bg-[#38494E] text-[#071C23]" : "bg-[#071C23] text-[#6A6A6A]"
              )}
            >
              <div className={`w-full h-[25px] px-[20px] flex flex-row items-center space-x-[11px] ${
                v.link?.includes(pathname)? "border-l-[4px] border-[#3FA46E]": ""
              }`}>
                <Image src={v.link?.includes(pathname)? v?.activeIcon: v.inactiveIcon} width={v?.width} height={v?.height} alt="icon" />
                <Font style={`text-[13px] ${v.link?.includes(pathname)? "text-[#fff]": "text-[#B0B0B0]"}`}>{v.name}</Font>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const sideItems = [
  {
    name: "Dashboard",
    width: 15,
    height: 15,
    activeIcon: AppImages.home.sidebar.activeDash,
    inactiveIcon: AppImages.home.sidebar.inactiveDash,
    link: [AppPages.home.dashboard.index],
  },
  {
    name: "Courses",
    width: 17,
    height: 17,
    activeIcon: AppImages.home.sidebar.activeCourse,
    inactiveIcon: AppImages.home.sidebar.inactiveCourse,
    link: [
      AppPages.home.courses.index,
    ],
  },
  {
    name: "Applications",
    width: 17,
    height: 17,
    activeIcon: AppImages.home.sidebar.activeApplication,
    inactiveIcon: AppImages.home.sidebar.inactiveApplication,
    link: [
      AppPages.home.applications.index,
    ],
  },
  {
    name: "E-Library",
    width: 18,
    height: 18,
    activeIcon: AppImages.home.sidebar.activeLibrary,
    inactiveIcon: AppImages.home.sidebar.inactiveLibrary,
    link: [
      AppPages.home.library.index,
    ],
  },
  {
    name: "Bundles",
    width: 19,
    height: 19,
    activeIcon: AppImages.home.sidebar.activeBundle,
    inactiveIcon: AppImages.home.sidebar.inactiveBundle,
    link: [
      AppPages.home.bundles.index
    ],
  },
  {
    name: "Users",
    width: 22,
    height: 22,
    activeIcon: AppImages.home.sidebar.activeUsers,
    inactiveIcon: AppImages.home.sidebar.inactiveUsers,
    link: [
      AppPages.home.users.index
    ],
  },
  {
    name: "Instructors",
    width: 16,
    height: 16,
    activeIcon: AppImages.home.sidebar.activeInstructors,
    inactiveIcon: AppImages.home.sidebar.inactiveInstructors,
    link: [
      AppPages.home.instructors.index,
    ],
  },
  {
    name: "Students",
    width: 17,
    height: 17,
    activeIcon: AppImages.home.sidebar.activeStudents,
    inactiveIcon: AppImages.home.sidebar.inactiveStudents,
    link: [
      AppPages.home.students.index
    ],
  },
  {
    name: "Settings",
    width: 18,
    height: 18,
    activeIcon: AppImages.home.sidebar.activeSettings,
    inactiveIcon: AppImages.home.sidebar.inactiveSettings,
    link: [
      AppPages.home.settings.index,
    ],
  },
];
