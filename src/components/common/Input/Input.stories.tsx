import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Input } from '@/components/index';

export default {
  title: 'Common/Input',
  component: Input,
  argTypes: {
    isEditable: { control: 'boolean' },
    placeholder: { control: 'text' },
    disablePointerEvents: { control: 'boolean', defaultValue: false },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Editable = Template.bind({});
Editable.args = {
  isEditable: true,
  placeholder: 'Editable Input',
  label: 'Editable Input',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  isEditable: false,
  placeholder: 'Read-Only Input',
  label: 'Read-Only Input',
  disablePointerEvents: true,
};

export const Required = Template.bind({});
Required.args = {
  isEditable: true,
  placeholder: 'Required Input',
  label: 'Required Input',
  required: true,
};
