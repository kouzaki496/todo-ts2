//src/components/Button/Button.tsx

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  icon?: React.ReactElement<SvgIconProps>;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ label, icon, children, disabled, onClick, ...props }: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      disabled={disabled}
      onClick={onClick}
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
    >
      {icon}
      {label && <span>{label}</span>}
      {children}
    </MuiButton>
  );
};

export default Button;
