import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import colors from '@/theme/colors';

export type CustomInputProps = MuiTextFieldProps & {
  isEditable: boolean;
  disablePointerEvents?: boolean;
};

const Input = ({ isEditable, disablePointerEvents = false, ...props }: CustomInputProps) => {
  return (
    <MuiTextField
      {...props}
      variant="outlined"
      label={props.label}
      required={props.required}
      error={props.error}
      helperText={props.helperText}
      slotProps={{
        input: {
          readOnly: !isEditable,
          style: {
            pointerEvents: disablePointerEvents && !isEditable ? 'none' : 'auto',
          },
        },
        inputLabel: {
          shrink: true,
          style: {
            pointerEvents: disablePointerEvents && !isEditable ? 'none' : 'auto',
          },
        },
      }}
      sx={{
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

export default Input;