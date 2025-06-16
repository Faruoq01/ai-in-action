"use client";
import Image from "next/image";
import { Font } from "./font";
import { AppImages, AppPages } from "../assets";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "../lib/redux/controls";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export const TopNavBar = () => {
    const dispatch = useAppDispatch();
    const path = usePathname();
    
    const getName = (name: string) => {
        const [first, ...remaining] = name?.split("");
        return first.toLocaleUpperCase().concat(remaining?.join(''));
    }

    const logout = async () => {
        // const { error, payload } = await AuthService.logout();
        // if(!error && payload){
        //     toast.success(payload?.message);
        // }
        // Cookies.remove("edu-admin-login-status");
        // Cookies.remove("edu-admin-signer");
        // dispatch(setAdminLoggin(false));
    }

    return (
        <div className="w-full h-[60px] flex flex-row bg-white px-[20px] py-[10px] items-center justify-between border-b border-[#DADADA]">
            <Font style="text-[16px] font-[600]">{getName(path?.split("/")[2])}</Font>
            <div className="flex flex-row space-x-[15px]">
                <Image src={AppImages.note} width={35} height={35} alt="icon" />
                <Popover>
                    <PopoverTrigger>
                        <Image src={AppImages.profile} width={35} height={35} alt="icon" className="border rounded-[35px]" />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[200px] mr-[20px]">
                        <Font callback={logout} style="text-[12px]">Logout</Font>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
  );
};

export function DrawerBar() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                // onClick={() => ()}
                // disabled={goal <= 200}
              >
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  hello
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// const DrawerBar = ({ state, setState}: any) => {
//     const router = useRouter();
//     const pathname = usePathname();

//     return(
//         <SwipeableDrawer
//             anchor={"left"}
//             open={state}
//             onClose={() => setState(false)}
//             onOpen={() => setState(true)}
//         >
//             <div className="w-[270px] h-screen lg:flex flex-col items-center bg-[#071C23] border-r border-[#0A323F] px-[20px] py-[20px]">
//                 <Image src={AppImages.logo} width={130} height={60} alt="icon" />
//                 <div className="w-full mt-[60px]">
//                     {sideItems.map((v: any, i: number) => {
//                     return (
//                         <div
//                         onClick={() => router.push(v.link[0])}
//                         key={i}
//                         className={cn(
//                             "h-[40px] px-[10px] rounded-[5px] flex flex-row cursor-pointer items-center space-x-[10px] mb-[10px]",
//                             v.link?.includes(pathname) ? "bg-[#fff] text-[#071C23]" : "bg-[#071C23] text-[#6A6A6A]"
//                         )}
//                         >
//                         <Image src={v.link?.includes(pathname)? v?.activeIcon: v.inactiveIcon} width={v?.name === 'Scholarships'? 20: 15} height={v?.name === 'Scholarships'? 20: 15} alt="icon" />
//                         <Font style="text-[14px]">{v.name}</Font>
//                         </div>
//                     );
//                     })}
//                 </div>
//             </div>
//         </SwipeableDrawer>
//     )
// }

export const sideItems = [
    {
      name: "Home",
      activeIcon: AppImages.home.sidebar.activeDash,
      inactiveIcon: AppImages.home.sidebar.inactiveDash,
      link: [AppPages.home.dashboard.index],
    },
    {
      name: "Courses",
      activeIcon: AppImages.home.sidebar.activeCourse,
      inactiveIcon: AppImages.home.sidebar.inactiveCourse,
      link: [
        AppPages.home.courses.index,
      ],
    },
    {
      name: "Applications",
      activeIcon: AppImages.home.sidebar.activeApplication,
      inactiveIcon: AppImages.home.sidebar.inactiveApplication,
      link: [
        AppPages.home.applications.index,
      ],
    },
    {
      name: "E-Library",
      activeIcon: AppImages.home.sidebar.activeLibrary,
      inactiveIcon: AppImages.home.sidebar.inactiveLibrary,
      link: [
        AppPages.home.library.index,
      ],
    },
    {
      name: "Bundles",
      activeIcon: AppImages.home.sidebar.activeBundle,
      inactiveIcon: AppImages.home.sidebar.inactiveBundle,
      link: [
        AppPages.home.bundles.index
      ],
    },
    {
      name: "Users",
      activeIcon: AppImages.home.sidebar.activeUsers,
      inactiveIcon: AppImages.home.sidebar.inactiveUsers,
      link: [
        AppPages.home.users.index
      ],
    },
    {
      name: "Instructors",
      activeIcon: AppImages.home.sidebar.activeInstructors,
      inactiveIcon: AppImages.home.sidebar.inactiveInstructors,
      link: [
        AppPages.home.instructors.index,
      ],
    },
    {
      name: "Students",
      activeIcon: AppImages.home.sidebar.activeStudents,
      inactiveIcon: AppImages.home.sidebar.inactiveStudents,
      link: [
        AppPages.home.students.index
      ],
    },
    {
      name: "Settings",
      activeIcon: AppImages.home.sidebar.activeSettings,
      inactiveIcon: AppImages.home.sidebar.inactiveSettings,
      link: [
        AppPages.home.settings.index,
      ],
    },
  ];
