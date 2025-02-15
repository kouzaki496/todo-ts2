// メニューを開くボタンをクリックしたらメニューが表示される
// メニューを開いた状態でボタンをクリックするとメニューが閉じる
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MenuList from './MenuList';
import { Settings, Logout } from '@mui/icons-material';

const meta: Meta<typeof MenuList> = {
  title: 'Components/MenuList',
  component: MenuList,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      defaultValue: 'bottom-right',
    },
    menuItems: {
      control: 'object',
      defaultValue: [
        { label: '設定', icon: <Settings /> },
        { label: 'ログアウト', icon: <Logout /> }
      ],
    },
  },
};

export default meta;

export const Default: StoryObj<typeof MenuList> = {
  args: {
    position: 'bottom-right',
    menuItems: [
      { label: '設定', icon: <Settings /> },
      { label: 'ログアウト', icon: <Logout /> }
    ],
  },
  render: (args) => <MenuList position={args.position} menuItems={args.menuItems} />,
};