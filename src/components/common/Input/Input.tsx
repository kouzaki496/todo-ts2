import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import colors from '@/theme/colors';

export type CustomInputProps = MuiTextFieldProps & {
  isEditable: boolean;
};

const Input = ({ isEditable, ...props }: CustomInputProps) => {
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
        },
        inputLabel: {
          shrink: true,
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