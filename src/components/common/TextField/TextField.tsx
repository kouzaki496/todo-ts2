import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import colors from '@/theme/colors';

export type CustomTextFieldProps = MuiTextFieldProps & {
  isEditable: boolean;
};

const TextField = ({ isEditable, ...props }: CustomTextFieldProps) => {
  return (
    <MuiTextField
      {...props}
      required={props.required}
      error={props.error}
      helperText={props.helperText}
      slotProps={{
        input: {
          readOnly: !isEditable,
          multiline: true,
          rows: 4,
          style: {
            resize: 'both',
            overflow: 'auto',
          },
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

export default TextField;