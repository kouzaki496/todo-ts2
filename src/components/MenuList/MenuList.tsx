import React, { useState, ReactNode } from 'react';
import { Menu, MenuItem, Button, ListItemIcon } from '@mui/material';
import { PopoverOrigin } from '@mui/material';

interface UserMenuProps {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    menuItems: {label: string; icon?: ReactNode }[];
}

function MenuList({ position, menuItems }: UserMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const anchorOrigin: PopoverOrigin = {
        'top-left': { vertical: 'bottom', horizontal: 'left' },
        'top-right': { vertical: 'bottom', horizontal: 'right' },
        'bottom-left': { vertical: 'top', horizontal: 'left' },
        'bottom-right': { vertical: 'top', horizontal: 'right' },
    }[position] as PopoverOrigin;

    const transformOrigin: PopoverOrigin = {
        'top-left': { vertical: 'top', horizontal: 'left' },
        'top-right': { vertical: 'top', horizontal: 'right' },
        'bottom-left': { vertical: 'bottom', horizontal: 'left' },
        'bottom-right': { vertical: 'bottom', horizontal: 'right' },
    }[position] as PopoverOrigin;

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                メニューを開く
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default MenuList;
