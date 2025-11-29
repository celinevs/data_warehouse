'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Box,
    Toolbar,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const bluePalette = {
    primary: '#4E73B9',
    primaryLight: '#7A9BD4',
    primaryLighter: '#E8EEF9',
    primaryDark: '#3A5A94',
    white: '#FFFFFF',
    text: '#2D3748',
    textLight: '#718096',
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    backgroundColor: bluePalette.white,
    color: bluePalette.text,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface SidebarItems {
    label: string;
    href: string;
}

interface SidebarProps {
    items: SidebarItems[];
    children?: React.ReactNode;
}

export default function Sidebar({ items, children }: SidebarProps) {
    const theme = useTheme();
    const pathname = usePathname();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Same active color for all items, different hover effects
    const getHoverStyle = (itemHref: string) => {
        const isActive = pathname === itemHref;

        return {
            backgroundColor: isActive ? bluePalette.primaryLighter : 'transparent',
            color: isActive ? bluePalette.primary : bluePalette.white,
            borderRight: isActive ? `4px solid ${bluePalette.primaryDark}` : '4px solid transparent',
            margin: '4px 8px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: bluePalette.primaryLighter,
                color: bluePalette.primary,
                transform: 'translateX(4px)',
            },
            '& .MuiListItemText-primary': {
                fontWeight: isActive ? '600' : '400',
                fontSize: '0.95rem',
            },
        };
    };

    return (
        <Box sx={{ display: "flex", width: '100%' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Data Warehouse
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: bluePalette.primary,
                        color: bluePalette.white,
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton sx={{color: '#FFFFFF'}} onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                href={item.href}
                                sx={getHoverStyle(item.href)}
                            >
                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontWeight: pathname === item.href ? 'bold' : 'normal',
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}