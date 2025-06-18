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
        <div className="flex-grow overflow-auto px-[20px] lg:px-[50px] py-[20px] flex flex-col">
          {queryResponse ||
            <div className="w-full h-full flex flex-col justify-center items-center">
              <p className="text-[18px] mt-[20px] italic font-[600]">Your smart health assistant is standing by. Ask anything to get started.</p>
              <div className="text-center text-gray-400 italic mt-[30px]">
                {
                  suggestions?.map((v: string, index) => {
                    return(
                      <div 
                        onClick={() => setQuery(v)}
                        className="border-[1px] select-none italic border-[#d7d7d7] px-[10px] py-[5px] mb-[15px] rounded-[20px] text-left text-[12px]" 
                        key={index}>{v}</div>
                    )
                  })
                }
              </div>
            </div>
          }
          {queryResponse &&
            <MedicalSummary text={queryResponse} />
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

const suggestions = [
  "Experiencing persistent headaches accompanied by blurry vision and dizziness.",
  "Severe chest discomfort after climbing stairs; feels tightness and shortness of breath.",
  "Noticed swelling in both ankles with fatigue and shortness of breath in the evenings.",
  "Recurring abdominal cramps and diarrhea after eating dairy products.",
  "Pain and stiffness in fingers, especially in the morning; takes a while to loosen up.",
  "Tingling and numbness in the right hand that worsens at night.",
  "Episodes of fast heartbeat and lightheadedness when getting up from a sitting position.",
  "Chronic joint pain in knees and elbows, worsens during rainy weather.",
  "Sharp pain under the right rib cage after meals, sometimes with nausea.",
  "Experiencing fatigue and unexplained weight loss over the past month."
];

type MedicalSummary = {
  title?: string;
  concern?: string;
  analysis?: string;
  actions?: string[];
  tags?: string[];
};

function parseMedicalSummary(text: string): MedicalSummary {
  const lines = text.split(/\r?\n/);
  const result: MedicalSummary = {};

  let currentSection: keyof MedicalSummary | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line === 'Medical Records Analysis') {
      currentSection = 'title';
      result.title = '';
      continue;
    }

    if (line === 'Concern') {
      currentSection = 'concern';
      result.concern = '';
      continue;
    }

    if (line === 'Analysis') {
      currentSection = 'analysis';
      result.analysis = '';
      continue;
    }

    if (line === 'Suggested Action') {
      currentSection = 'actions';
      result.actions = [];
      continue;
    }

    if (line === 'Tags') {
      currentSection = 'tags';
      result.tags = [];
      continue;
    }

    // Add content based on section type
    switch (currentSection) {
      case 'title':
        result.title += (result.title ? ' ' : '') + line;
        break;
      case 'concern':
        result.concern += (result.concern ? ' ' : '') + line;
        break;
      case 'analysis':
        result.analysis += (result.analysis ? ' ' : '') + line;
        break;
      case 'actions':
        if (line.startsWith('-')) {
          result.actions?.push(line.slice(1).trim());
        } else {
          result.actions?.push(line); // In case bullet was omitted
        }
        break;
      case 'tags':
        const tags = line.split(',').map(tag => tag.trim());
        result.tags?.push(...tags);
        break;
    }
  }

  return result;
}

type MedicalSummaryProps = {
  text: string;
};

const MedicalSummary: React.FC<MedicalSummaryProps> = ({ text }) => {
  const data = parseMedicalSummary(text);
  console.log(data, "data")

  return (
    <div className="medical-summary space-y-6 text-gray-800">
      {data.title && <h2 className="text-2xl font-bold">{data.title}</h2>}

      {data.concern && (
        <section>
          <h3 className="text-lg font-semibold mb-1">Concern</h3>
          <p>{data.concern}</p>
        </section>
      )}

      {data.analysis && (
        <section>
          <h3 className="text-lg font-semibold mb-1">Analysis</h3>
          <p>{data.analysis}</p>
        </section>
      )}

      {data.actions && data.actions.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-1">Suggested Action</h3>
          <ul className="list-disc ml-5 space-y-1">
            {data.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </section>
      )}

      {data.tags && data.tags.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-1">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
