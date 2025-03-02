// src/components/features/MenuList/MenuList.tsx
import React, { ReactNode } from 'react';
import { Menu, MenuItem, ListItemIcon } from '@mui/material';
import { PopoverOrigin } from '@mui/material';

export interface UserMenuProps {
    position: 'bottom-left' | 'bottom-right';
    menuItems: Array<{ label: string; icon?: ReactNode; onClick?: () => void }>;
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
}

const MenuList = ({ position, menuItems, anchorEl, open, onClose }: UserMenuProps) => {
    const anchorOrigin: PopoverOrigin = {
        'bottom-left': { vertical: 'bottom', horizontal: 'left' },
        'bottom-right': { vertical: 'bottom', horizontal: 'right' },
    }[position] as PopoverOrigin;

    const transformOrigin: PopoverOrigin = {
        'bottom-left': { vertical: 'top', horizontal: 'left' },
        'bottom-right': { vertical: 'top', horizontal: 'right' },
    }[position] as PopoverOrigin;

    return (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={() => { item.onClick?.(); onClose(); }}>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    {item.label}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default MenuList;
