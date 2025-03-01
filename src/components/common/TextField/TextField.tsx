import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import colors from '@/theme/colors';

export type CustomTextFieldProps = MuiTextFieldProps & {
  isEditable: boolean;
  disablePointerEvents?: boolean;
};

const TextField = ({ isEditable, disablePointerEvents = false, ...props }: CustomTextFieldProps) => {
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

export default TextField;