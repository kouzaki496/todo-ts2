//src/components/MenuList/MenuList.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MenuList } from '@/components/features';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { UserMenuProps } from './MenuList';

const meta: Meta<typeof MenuList> = {
  title: 'Components/MenuList',
  component: MenuList,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-left', 'bottom-right'],
      defaultValue: 'bottom-right',
    },
    menuItems: {
      control: 'object',
      defaultValue: [
        { label: '設定', icon: <Settings /> },
        { label: 'ログアウト', icon: <Logout /> },
      ],
    },
  },
};

export default meta;


const MenuListStory: React.FC<UserMenuProps> = (args) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>Open Menu</button>
      <MenuList
        position={args.position}
        menuItems={args.menuItems}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export const Default: StoryObj<typeof MenuList> = {
  args: {
    position: 'bottom-right',
    menuItems: [
      { label: '設定', icon: <Settings /> },
      { label: 'ログアウト', icon: <Logout /> },
    ],
  },
  render: (args) => <MenuListStory {...args} />,
};