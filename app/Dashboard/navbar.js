'use client'
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useMediaQuery, Drawer, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import '/app/style.css';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';



export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpen = () => setDrawerOpen(true);
    const handleClose = () => setDrawerOpen(false);

    const navItems = [
        { text: 'Home', href: '/' },
        { text: 'News', href: '/Blog/News' },
        { text: 'Popular Article', href: '/Blog/PopularArticles' },
        // { text: 'Books', href: '/Blog/Books' },
    ];

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky" color='inherit'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml:'4rem', mr: 4, fontSize:'24px', fontWeight: 'bold'}}>
                        News Api Blogsite
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpen}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={handleClose}
                                sx={{ width: 256 } }
                              
                            >
                                <List sx={{ width: 240 }}>
                                    {navItems.map((item, index) => (
                                        <ListItem button key={index} href={item.href} onClick={handleClose}>
                                            <ListItemText primary={item.text} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>
                        </>
                    ) : (
                        <div className='menuitem'>
                            {navItems.map((item) => (
                                <Button color="inherit" key={item.text} href={item.href} sx={{mx:'0.4rem'}}>
                                    {item.text}
                                </Button>
                            ))}
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
