import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Font } from './font';

export default function VerticalLinearStepper({steps}: any) {
  const pathname = usePathname();
  const [filteredSteps, setFilteredSteps] = React.useState<any>([]);
  
  React.useEffect(() => {
    const copy = JSON.parse(JSON.stringify(steps));
    const index = copy.findIndex((item: any) => item.link === pathname);
    const filtered = copy?.slice(0, index);
    setFilteredSteps(filtered.map((v: any) => v?.link));
  }, [pathname])

  return (
    <div>
      {
        steps.map((v: any, i: number) => {
          return(
            <div key={i} className='min-h-[90px] relative border-l border-[#EAECF0]'>
              <div className='w-[20px] h-[20px] rounded-[20px] border-[2px] border-[#DDDDDD] absolute left-[-10px]'>
                <div className={`w-full h-full border-[5px] ${
                  (filteredSteps.includes(v?.link) || v?.link === pathname)? 'border-[#071C23]': 'border-[#f7f7f7] bg-[#D0D5DD]'} rounded-[20px]`
                }></div>
              </div>
              <Font style='text-[12px] ml-[15px] font-[600] mt-[6px]'>{v?.label}</Font>
              <Font style='text-[12px] ml-[15px] mt-[5px]'>
                {v?.description}
              </Font>
            </div>
          )
        })
      }
    </div>
  );
}
