import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TextField from './TextField';

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
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  isEditable: false,
  label: 'Read-Only TextField',
  placeholder: 'Cannot edit',
  helperText: 'This field is read-only',
  disablePointerEvents: true,
  resize: 'none',
};

export const Required = Template.bind({});
Required.args = {
  isEditable: true,
  label: 'Required TextField',
  placeholder: 'Enter text...',
  required: true,
  resize: 'both',
};

export const AutoResize = Template.bind({});
AutoResize.args = {
  isEditable: false,
  label: 'Auto-Resizing TextField',
  placeholder: 'This field resizes based on content...',
  helperText: 'This field adjusts its height automatically based on the content.',
  resize: 'none',
  multiline: true,
  value: 'このテキストフィールドは、内容に応じて高さが自動的に調整されます。複数行のテキストを入力してみてください。このテキストフィールドは、内容に応じて高さが自動的に調整されます。複数行のテキストを入力してみてください。このテキストフィールドは、内容に応じて高さが自動的に調整されます。複数行のテキストを入力してみてください。このテキストフィールドは、内容に応じて高さが自動的に調整されます。複数行のテキストを入力してみてください。このテキストフィールドは、内容に応じて高さが自動的に調整されます。複数行のテキストを入力してみてください。このテキストフィールドは、内容に応じて高さが自動的に調整されます。複数行のテキストを入力してみてください。',
  rows: undefined, // 閲覧モードでは自動調整
};