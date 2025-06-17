import React, { ReactNode } from 'react';
import { GoogleLogin, CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
const client_id: any = process.env.NEXT_PUBLIC_APP_CLIENT_ID;

interface GoogleLoginButtonProps {
  onSuccess: (response: CredentialResponse) => void;
}

interface GoogleLogoutButtonProps {
  onLogout: () => void;
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

export const GoogleLogoutButton: React.FC<GoogleLogoutButtonProps> = ({ onLogout, children }) => {
  return (
    <button onClick={onLogout}>{children}</button>
  );
};
