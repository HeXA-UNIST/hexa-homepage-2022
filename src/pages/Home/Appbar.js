import { Component } from "react";
import { useEffect, useRef, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Link from '@mui/material/Link';

import Icon2 from '../../img/logo2.png';
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const pages = ['동아리 소개', '활동', 'SNS'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const ResponsiveAppBar =()=> {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [appbarcolor, setappbarcolor] = useState('transparent');
    const handleScroll = () => {
        const position = window.pageYOffset;
        setappbarcolor(position == 0 ? 'transparent' : 'rgba(0, 0, 0, 0.8)');
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    //   
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return(
        <AppBar className='Barcontainer' component="nav" color='transparent' elevation={0} >
    <div style={{ backgroundColor: appbarcolor }}>
    <Toolbar style={{ boxShadow: 'none' }}>
        <Button>
        <Avatar alt="Hexa_logo" variant="square" sx={{
            fontStyle: "normal",
            left: "100px",
            width: '40px',
            height: '45px',
            mr: 15,
            ml: 1,
            display: { xs: 'none', md: 'flex' }
        }} src={Icon2} />
        </Button>
        <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
            fontStyle: "normal",
            left: "100px",
            mr: 2,
            ml: 0,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Orbitron',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            lineHeight: "60px"
        }}
        >
        HeXA
        </Typography>
        <Link href="/login" underline="none"><Avatar className="Loginbutton" sx={{ fontFamily: "'NanumGothic'", fontStyle: "normal", fontWeight: "800", fontSize: "12px", lineHeight: "18px", textAlign: "center", bgcolor: 'white', mr: 10, width: 48, height: 24, color: '#0A0A50' }} variant="rounded">
        로그인
        </Avatar></Link>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
        >
            <MenuIcon />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
            display: { xs: 'block', md: 'none' },
            }}
        >
            {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
            </MenuItem>
            ))}
        </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
            <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
            >
            {page}
            </Button>
        ))}
        </Box>
        <Avatar className="Loginbutton" sx={{ fontFamily: "'NanumGothic'", fontStyle: "normal", fontWeight: "800", fontSize: "12px", lineHeight: "18px", textAlign: "center", bgcolor: 'white', mr: 10, width: 56, height: 24, color: '#0A0A50' }} variant="rounded">
        지원하기
        </Avatar>
        <IconButton sx={{ ml: 4, mr: 4, bgcolor: 'background.default', color: 'text.primary' }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="HEXA" src="/static/images/avatar/2.jpg" />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
            ))}
        </Menu>
        </Box>
    </Toolbar>
    </div>
</AppBar>)
}

export default ResponsiveAppBar;