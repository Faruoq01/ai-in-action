"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoogleLogoutButton } from "../components/googleLogin";
import { CustomButton } from "../components/button";
import { useAppDispatch, useAppSelector } from "../lib/redux/controls";
import { AuthService } from "../lib/services/auth.service";
import { AppImages } from "../asset/appImages";
import { setQueryResponse } from "../lib/redux/slices/auth";
import { SkeletonCard } from "../components/skeleton";
import toast from "react-hot-toast";
import remarkGfm from 'remark-gfm';

const Home = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const queryResponse = useAppSelector((state) => state.auth.queryResponse);

  const handleQuerySearch = async () => {
    if (!query.trim()) return toast.error("Text query is empty");
    setLoading(true);
    const { error, payload } = await AuthService.searchQuery({ query });
    setLoading(false);
    if (!error && payload) {
      dispatch(setQueryResponse(payload?.result));
      setQuery("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#003844] text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-[22px] py-[12px]">
        <Avatar>
          <AvatarImage
            src={user?.picture || "https://github.com/shadcn.png"}
            alt="@user"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <GoogleLogoutButton>
          <Image width={15} height={15} src={AppImages.logout} alt="logout" />
        </GoogleLogoutButton>
      </div>
      <Separator />

      {/* Chat Display */}
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="flex-grow overflow-auto px-[50px] py-[20px]">
          {queryResponse ||
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-center text-gray-400 italic">
                Your smart health assistant is standing by. Ask anything to get started.
              </p>
            </div>
          }
          {queryResponse &&
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{queryResponse}</ReactMarkdown>
          }
        </div>
      )}

      {/* Input Area */}
      <div className="bg-[#003844] p-3 flex items-end gap-2">
        <textarea
          rows={1}
          className="w-full max-h-[200px] resize-none px-[15px] py-[12px] text-white bg-transparent outline-none border border-gray-600 rounded-md overflow-auto"
          placeholder="Please type your search here."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);

            // Auto-expand up to 200px
            const el = e.target;
            el.style.height = "auto";
            const newHeight = Math.min(el.scrollHeight, 200);
            el.style.height = `${newHeight}px`;
          }}
        />
        <CustomButton
          variant="default"
          title="Send"
          style="px-4 py-2 bg-[#00C2CB] hover:bg-[#00aeb5] text-[#003844] font-semibold rounded-md transition"
          isLoading={loading}
          callback={handleQuerySearch}
        />
      </div>
    </div>
  );
};

export default Home;
