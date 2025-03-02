import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AddTodoButton } from '@/components/features';

export default {
  title: 'Components/AddTodoButton',
  component: AddTodoButton,
} as Meta<typeof AddTodoButton>;

const Template: StoryFn<typeof AddTodoButton> = (args) => <AddTodoButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert('Add Todo Button Clicked!'),
};