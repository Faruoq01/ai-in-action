import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ButtonType {
  style?: string,
  title: string,
  callback?: () => void,
  frontIcon?: any,
  rareIcon?: any,
  isLoading?: boolean,
  variant: any,
  disabled?: boolean,
  spinColor?: string
}
 
export function CustomButton({ 
    style, 
    title, 
    callback,
    frontIcon,
    rareIcon,
    isLoading,
    variant,
    disabled,
    spinColor
}: ButtonType) {
  return(
    <Button 
      disabled={disabled}
      variant={variant}
      onClick={callback} 
      className={`text-[13px] ${style} font-[300]`}>
      {isLoading && <Loader2 className={`mr-2 h-[20px] w-[20px] animate-spin ${
        spinColor? `text-${spinColor}`: 'text-[#fff]'
      }`} />}
      {!isLoading && rareIcon}
      {title}
      {frontIcon}
    </Button>
  ) 
}