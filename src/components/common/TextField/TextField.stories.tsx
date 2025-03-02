import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { TextField } from '@/components/index';

export default {
  title: 'Common/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    isEditable: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    disablePointerEvents: { control: 'boolean', defaultValue: false },
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
      defaultValue: 'both',
    },
  },
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => <TextField {...args} />;

export const Editable = Template.bind({});
Editable.args = {
  isEditable: true,
  label: 'Editable TextField',
  placeholder: 'Enter text...',
  helperText: 'This field is editable',
  resize: 'both',
  value: '編集可能なテキストフィールドです。',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  isEditable: false,
  label: 'Read-Only TextField',
  placeholder: 'Cannot edit',
  helperText: 'This field is read-only',
  disablePointerEvents: true,
  resize: 'none',
  value: '編集不可なテキストフィールドです。',
};

export const Required = Template.bind({});
Required.args = {
  isEditable: true,
  label: 'Required TextField',
  placeholder: 'Enter text...',
  required: true,
  resize: 'both',
};

