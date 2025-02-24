//src/components/Button/Button.tsx

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../service/firebaseConfig';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  icon?: React.ReactElement<SvgIconProps>;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ label, icon, children, disabled, ...props }: ButtonProps) => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // ユーザー情報を取得
      const user = result.user;
      console.log('User Info:', user);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <MuiButton
      {...props}
      disabled={disabled}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        paddingLeft: 1,
        paddingRight: 1,
        borderRadius: 2,
        opacity: disabled ? 0.6 : 1,
        ...props.sx,
      }}
      onClick={handleGoogleSignIn}
    >
      {icon}
      {label && <span>{label}</span>}
      {children}
    </MuiButton>
  );
};

export default Button;
