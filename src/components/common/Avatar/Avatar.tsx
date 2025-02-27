//src/components/Header/Header.tsx
import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';
import { SxProps } from '@mui/system';

// AvatarPropsの定義
export interface AvatarProps extends MuiAvatarProps {
  src: string;
  alt: string;
  size?: number;
  sx?: SxProps;
}

const CustomAvatar = ({ src, alt, size = 40, sx, ...props }: AvatarProps) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{ width: size, height: size, ...sx }}
      {...props}
    />
  );
};

export default CustomAvatar;


