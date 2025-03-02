import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import colors from '@/theme/colors';

type ResizeDirection = 'none' | 'both' | 'horizontal' | 'vertical';

export type CustomTextFieldProps = MuiTextFieldProps & {
  isEditable: boolean;
  disablePointerEvents?: boolean;
  resize?: ResizeDirection;
};

const TextField = ({ isEditable, disablePointerEvents = false, resize = 'both', ...props }: CustomTextFieldProps) => {
  return (
    <MuiTextField
      {...props}
      required={props.required}
      error={props.error}
      helperText={props.helperText}
      multiline
      rows={4}
      slotProps={{
        input: {
          readOnly: !isEditable,
          style: {
            pointerEvents: disablePointerEvents && !isEditable ? 'none' : 'auto',
            resize: isEditable ? resize : 'none',
          },
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          padding: '2px',
          marginBottom: 0,
          height: !isEditable ? 'auto' : undefined,
          minHeight: !isEditable ? 'unset' : undefined,
        },
        '& .MuiOutlinedInput-root': {
          '& textarea': {
            resize: isEditable ? resize : 'none',
            padding: '8px 12px',
            marginBottom: 0,
            height: isEditable ? 'auto' : undefined,
            minHeight: isEditable ? 'unset' : undefined,
            overflow: 'hidden',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '4px',
          },
        },
        '& .MuiOutlinedInput-root.Mui-error': {
          borderColor: colors.error.main,
        },
        '& .MuiFormHelperText-root.Mui-error': {
          color: colors.error.main,
        },
      }}
    />
  );
};

export default TextField;