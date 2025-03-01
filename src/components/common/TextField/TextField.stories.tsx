import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TextField from './TextField';

export default {
  title: 'Common/TextField',
  component: TextField,
  argTypes: {
    isEditable: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    disablePointerEvents: { control: 'boolean', defaultValue: false },
  },
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => <TextField {...args} />;

export const Editable = Template.bind({});
Editable.args = {
  isEditable: true,
  label: 'Editable TextField',
  placeholder: 'Enter text...',
  helperText: 'This field is editable',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  isEditable: false,
  label: 'Read-Only TextField',
  placeholder: 'Cannot edit',
  helperText: 'This field is read-only',
  disablePointerEvents: true,
};

export const Required = Template.bind({});
Required.args = {
  isEditable: true,
  label: 'Required TextField',
  placeholder: 'Enter text...',
  required: true,
};