"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex-grow overflow-auto px-[20px] lg:px-[50px] py-[20px] text-[#fff] wrap">
      <Skeleton className="w-full h-full bg-[#cceef5]" />
    </div>
  )
}
