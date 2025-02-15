import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { PopoverOrigin } from '@mui/material';

interface MenuListProps {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

function MenuList({ position }: MenuListProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const anchorOrigin: PopoverOrigin = {
        'top-left': { vertical: 'top', horizontal: 'left' },
        'top-right': { vertical: 'top', horizontal: 'right' },
        'bottom-left': { vertical: 'bottom', horizontal: 'left' },
        'bottom-right': { vertical: 'bottom', horizontal: 'right' },
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
                <MenuItem onClick={handleClose}>設定</MenuItem>
                <MenuItem onClick={handleClose}>ログアウト</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuList;
