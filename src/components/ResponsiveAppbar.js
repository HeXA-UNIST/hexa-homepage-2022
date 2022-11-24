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
import 'pages/Home/home.css';
import Link from '@mui/material/Link';
import Icon2 from 'assets/img/logo2.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, registerAuthStateChangedObserver } from 'features/auth/auth';
import { loginSlice, selectIsLoggedIn, setIsLoggedIn } from 'features/auth/login_reducer';
import { loadUserPersonalData, selectIsPersonalDataLoaded, selectPersonalName,selectPersonalUid } from "features/personal/personal_reducer";

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const pages = [{url:"/",name:'동아리 소개'}, {url:"/Activity",name:'활동'}, {url:"/",name:'sns'}];
const settings = ['프로필', 'Account', 'Dashboard'];

const ResponsiveAppBar = (props) => {
    // const store = configureStore({
    //   reducer:{
    //     f:loginSlice.reducer
    //   }
    // });
    const dispatch = useDispatch()
    const PersonalName = useSelector(selectPersonalName);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const personalUid = useSelector(selectPersonalUid);
    //console.log(personalUid)
    useEffect(() => {
        dispatch(loadUserPersonalData);
    }, [isLoggedIn]);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [appbarcolor, setappbarcolor] = useState(props.bgcolor);
    const handleScroll = () => {
        const position = window.pageYOffset;
        if (props.bgcolor == "transparent") setappbarcolor(position == 0 ? 'transparent' : 'rgba(0, 0, 0, 0.8)');
        
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isPersonalDataLoaded = useSelector(selectIsPersonalDataLoaded);
    useEffect(()=>{
        if(isLoggedIn) dispatch(loadUserPersonalData);
    },[isLoggedIn])
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
    const navigate = useNavigate();
    return (
        <AppBar className='Barcontainer' component="nav"  color='transparent' elevation={0} >
            <div style={{ backgroundColor: appbarcolor }}>
                <Toolbar style={{ boxShadow: 'none' }} sx={{minHeight:'70px', maxHeight: '70px'}}>
                    <Button onClick={()=>navigate('/')} sx = {{textTransform: 'none', minWidth: '150px'}}>
                        <Avatar alt="Hexa_logo" variant="square" sx={{
                            fontStyle: "normal",
                            width: '40px',
                            minWidth: '40px',
                            height: '45px',
                            display: { xs: 'none', md: 'flex' }
                        }} src={Icon2} />
                    
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            fontStyle: "normal",
                            left: "30px",
                            mr: 1,
                            ml: 1,
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
                    </Button>
                    {isLoggedIn ?
                        (<Button onClick={logout} key = {isLoggedIn} underline="none"><Avatar className="Loginbutton" sx={{ fontFamily: "'NanumGothic'", fontStyle: "normal", fontWeight: "800", fontSize: "12px", textAlign: "center", bgcolor: 'white', mr: 30, width: 60, height: 24, color: '#0A0A50' }} variant="rounded">
                            로그아웃</Avatar></Button>) : <></>}
                    {!isLoggedIn ?
                        (<Button href="/login" key = {isLoggedIn} underline="none"><Avatar className="Loginbutton" sx={{ fontFamily: "'NanumGothic'", fontStyle: "normal", fontWeight: "800", fontSize: "12px", textAlign: "center", bgcolor: 'white', mr: 30, width: 48, height: 24, color: '#0A0A50' }} variant="rounded">
                            로그인</Avatar></Button>) : <></>}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{color:"white"}}/>
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
                                display: { xs: 'white', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} >
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={()=>navigate(page.url)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                        <Avatar className="Loginbutton" sx={{ my: 3, ml: 1, fontFamily: 'Roboto', fontStyle: "normal", fontWeight: "600", fontSize: "12px", textAlign: "center", bgcolor: 'white', mr: 3, width: 56, height: '1.2rem', color: '#0A0A50' }} variant="rounded">
                            지원하기
                        </Avatar>
                    </Box>

                    <IconButton sx={{ ml: 4, mr: 4, bgcolor: 'background.default', color: 'text.primary' }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={isLoggedIn?"메뉴 열기":"로그인 필요"}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={PersonalName} src="/static/images/avatar/2.jpg" sx={{ fontSize: "13px", fontWeight: '900' }}>{isPersonalDataLoaded&&isLoggedIn?PersonalName:""}</Avatar>
                            </IconButton>
                        </Tooltip>
                        {isLoggedIn?<Menu
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
                            {settings.map((setting) => {
                                if (setting == "프로필") {
                                    return (
                                        <Link onClick={()=>navigate(`/Profile?uid=${personalUid}`, { replace: true })} key={setting} underline="none">
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        </Link>)
                                } else {
                                    return (<MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>)
                                }
                            })}
                        </Menu>:<></>}
                    </Box>
                </Toolbar>
            </div>
        </AppBar>)
}

export default ResponsiveAppBar;