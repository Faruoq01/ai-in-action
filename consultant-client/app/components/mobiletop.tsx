"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FC, ReactNode } from "react";
import { sideItems } from "./sidebar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  children: ReactNode;
};

export const TopNavigationMobile: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className=" h-full" side="left">
        <SheetHeader>
          <div className="flex flex-row items-center gap-2 mt-5">
            
            <div className=" flex text-left flex-col ">
              <p className="text  font-semibold text-ellipsis overflow-hidden ...">
                {"Hi, Faruk"} 
              </p>
              <label className=" text-left text-xs">farukumar41@gmail.com</label>
            </div>
          </div>
        </SheetHeader>
        <ScrollArea className="grid h-[25rem] my-4 ">
          <div className="gap-4 py-4 flex flex-col">
            {sideItems.map((item, index) => (
              <SheetClose key={String(index)} asChild>
                <Button
                  onClick={() => router.push(item.link[0] as string)}
                  className={cn(
                    "flex flex-row w-full justify-start gap-5 h-[40px] px-[10px] rounded-[5px] items-center space-x-[10px] mb-[5px]",
                    item.link?.includes(pathname)
                      ? "bg-[#F36F2E]"
                      : "bg-[#2E2D2D]"
                  )}
                >
                  Aminu Faruk
                </Button>
              </SheetClose>
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
