import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  label: string;
}

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <MuiButton {...props}>
      {label}
    </MuiButton>
  );
};

export default Button;
