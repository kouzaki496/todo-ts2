//src/components/Button/Button.tsx

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  icon?: React.ReactElement<SvgIconProps>;
  children?: React.ReactNode;
}

const Button = ({ label, icon, children, ...props }: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        paddingLeft: 1,
        paddingRight: 1,
        borderRadius: 2,
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
