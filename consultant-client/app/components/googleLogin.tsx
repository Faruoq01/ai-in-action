"use client"
import React, { ReactNode } from 'react';
import { GoogleLogin, googleLogout, CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
const client_id: any = process.env.NEXT_PUBLIC_APP_CLIENT_ID;

interface GoogleLoginButtonProps {
  onSuccess: (response: CredentialResponse) => void;
}

interface GoogleLogoutButtonProps {
  children: ReactNode
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
    return (
        <GoogleOAuthProvider clientId={client_id}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    );
};

export const GoogleLogoutButton: React.FC<GoogleLogoutButtonProps> = ({ children }) => {
  const router = useRouter();
  
  const onLogout = () => {
    googleLogout();
    Cookies.remove("consultant-key");
    Cookies.remove("auth-key");
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent 
        className='text-[12px] select-none' 
        onClick={onLogout}>Logout</PopoverContent>
    </Popover>
  );
};
