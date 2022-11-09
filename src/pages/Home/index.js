import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



import background1 from '../../img/background1.jpg';
import background2 from '../../img/background2.jpg';
import background3 from '../../img/background3.jpg';
import Icon1 from '../../img/logo1.png';
import Icon2 from '../../img/logo2.png';

import './home.css';
const pages = ['동아리 소개', '활동', 'SNS'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const styles = {
    backbutton: {"position":"absolute","width":"50px","height":"100px","left":"0px","top":"250px"},
    nextbutton: {"position":"absolute","width":"50px","height":"100px","right":"0px","top":"250px"},
    newstitle: {"fontFamily":"'Noto Sans KR'","fontStyle":"normal","fontWeight":"500","fontSize":"48px","lineHeight":"120%"},
    news: {"fontFamily":"'Noto Sans KR'","fontStyle":"normal","fontWeight":"500","fontSize":"12px","textAlign":"center", "whiteSpace":"pre-wrap"},
    stepper: {"color": 'transparent'}
}
const ResponsiveAppBar=()=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [appbarcolor, setappbarcolor]= useState('white');
  const handleScroll = () => {
      const position = window.pageYOffset;
      setappbarcolor(position==0?'transparent':'rgba(0, 0, 0, 0.8)');
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
  return (
    <AppBar className = 'Barcontainer' component="nav" color='transparent' elevation={0} >
        <div style={{backgroundColor: appbarcolor}}>
        <Toolbar style={{ boxShadow: 'none'}}>
        <Button>
        <Avatar alt="Hexa_logo" sx={{ fontStyle:"normal",
              left: "100px",
              mr: 15,
              ml: 15,
              display: { xs: 'none', md: 'flex' }
            }} src={Icon2}/>
        </Button>
          <Typography 
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ fontStyle:"normal",
              left: "100px",
              mr: 20,
              ml: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Orbitron',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.9)',
              textDecoration: 'none',
              lineHeight:"60px"
            }}
          >
            HeXA
          </Typography>

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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
    </AppBar>
  );
}


const steps = [
  {
    label: 'HeXA에서 UNIST학우를 위한\n웹/앱 서비스를 만들어갑니다',
    description: `HeXA는 2011년부터 시작된 UNIST 종합 프로그래밍 동아리입니다.\nUNIST 학우의 생활을 개선하기 위한 많은 서비스를 개발하고 있습니다.`,
    background: background1 ,
  },
  {
    label: 'HeXA에서 함께\n보안전문가로 성장해갑니다.',
    description:
      `HeXA는 2011년부터 시작된 UNIST 종합 프로그래밍 동아리입니다.\nCTF팀을 운영하고 있으며 초심자와 함께 매년 STTF도 참가하고 있습니다. `,
      background: background2 ,
  },
  {
    label: 'HeXA에서 함께\n게임개발자로 성장해갑니다.',
    description: `HeXA는 2011년부터 시작된 UNIST 종합 프로그래밍 동아리입니다.\n프로젝트를 통해 인디게임 개발 경험을 쌓을 수 있습니다.`,
    background: background3 ,
  },
];

const TextMobileStepper= ()=> {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${steps[activeStep].background})`} } >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <ResponsiveAppBar/>
        <Box sx={{ p: 6 }}>
        <Box className = 'Introtitle'>{steps[activeStep].label}</Box>
        <Box className = 'Introdescription'>{steps[activeStep].description}</Box>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        
        sx = {{ maxWidth: 100, flexGrow: 1 , margin:"auto", backgroundColor: "transparent"}}
        nextButton={
          <Button
            size='large'
            sx = {styles.nextbutton}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft className= "ArrowLeft" fontSize= 'large'/>
            ) : (
              <KeyboardArrowRight className="ArrowRight" fontSize= 'large'/>
            )}
          </Button>
        }

        backButton={
          <Button sx = {styles.backbutton} size='200' onClick={handleBack} disabled={activeStep === 0 }>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight className="ArrowRight" fontSize= 'large'/>
            ) : (
              <KeyboardArrowLeft className= "ArrowLeft" fontSize= 'large'/>
            )}
            
          </Button>
        }
      />
    </Box></div></div>
  );
}
const News = ()=> {
    const news = ["[공지] HeXA 13기 모집 (2023.00.00 - 2023.00.00)", "[소식] HeXA 15대 회장에 20학번 김선욱(주전공: 산업공학, 복수전공: 디자인) 선출","[수상] 제1회 UNIST-POSTECH-KAIST 데이터 사이언스 경진대회 죠르디 팀 은상"]

    return (
        <div className= "newContainer">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50px">
            <Typography variant="h6" noWrap component="a" href="/" sx={{ fontStyle:"normal",
              mr: 20,
              ml: 20,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Noto Sans KR',
              fontWeight: 900,
              color: 'inherit',
              textDecoration: 'none',
              color: 'white'
            }}
          >
            최신 소식
          </Typography>
          </Box>
          <Box className ='newletter1'>{news[0]}</Box>
          <Box className ='newletter'>{news[1]}</Box>
          <Box className ='newletter'>{news[2]}</Box>
          </div>
          
    )
}
const HexaIntro = () =>{
    const title = '\n\nHACKERS eXCITING ACADEMY\n\n';
    const subTitle = 'HeXA는 2011년부터 시작된 UNIST 동아리연합회 소속의 종합 프로그래밍 동아리입니다. 매학기 프로젝트를 진행하며, 웹/앱, 정보보안, 게임 분야로 나누어 개발하고 있습니다. \n\n\n동아리에서는 각자 관심 분야에 따른 개발 역량을 늘리기 위해 지원하며, 개발자의 협업과 소통을 미리 경험하고 능력을 키울 수 있도록 돕고 있습니다. 또한, 매학기말에 프로젝트를 공유하는 시간을 통해 다양한 분야에 대한 관심을 키울 수 있도록 노력하고 있습니다.\n\n\n HeXA는 BUS HeXA와 같은 UNIST 학우를 위한 서비스를 개발해왔으며, 오랜 역사와 많은 인적 네트워크를 통해 구성원 모두가 함께 성장을 도모하고 있습니다.\n\n\n\n'
    return(
        <div className='hexaIntro'>
            <Box className='hexaTitle'>{title}</Box>
            <Box className='hexadescription'>{subTitle}</Box>
        </div>
    )
}
const Home = (props) => {
    return (
    <div>
        <TextMobileStepper/>
        <News/>
        <HexaIntro/>
    </div>
    );
}

export default Home;