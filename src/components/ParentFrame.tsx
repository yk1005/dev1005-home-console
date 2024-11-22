'use client';
import { AppBar, Toolbar, Typography, Drawer, Box, IconButton, ListItem, ListItemButton, ListItemText, List, ListSubheader, ListItemIcon, Link } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
import { PathInfo, pathList } from '@/const/paths';
import NextLink from 'next/link';
import WidgetsIcon from '@mui/icons-material/Widgets';

export default function ParentFrame() {
    const [isOpenDrawer, setOpenDrawer] = useState<boolean>(false);
    return (
        <>
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { setOpenDrawer((prev) => !prev) }}
                    >
                        <Menu />
                    </IconButton>
                    <Link href='/' component={NextLink} underline='none' color='white'>
                        <Typography variant='h6'>Console</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Drawer open={isOpenDrawer} onClose={() => { setOpenDrawer(false) }}>
                <Box sx={{ width: { xs: "60vw", sm: "20vw" } }} >
                    <Toolbar />
                    <List component="nav" subheader={
                        <ListSubheader component="div">
                            Pages
                        </ListSubheader>
                    }>
                        {generatePathItemList(pathList)}
                    </List>
                </Box>
            </Drawer>
        </>)
}

const generatePathItemList = (list: Array<PathInfo>) => {
    return list.map((value) => (
        <ListItem key={value.name} disablePadding>
            <ListItemButton LinkComponent={NextLink} href={value.path}>
                <ListItemIcon>
                    <WidgetsIcon />
                </ListItemIcon>
                <ListItemText primary={value.name} />
            </ListItemButton>
        </ListItem>
    ))
}
