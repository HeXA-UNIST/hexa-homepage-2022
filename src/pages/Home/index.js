import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


import background1 from '../../img/background1.jpg';
import background2 from '../../img/background2.jpg';
import background3 from '../../img/background3.jpg';
import background4 from '../../img/background4.png';
import background5 from '../../img/background5.png';
import background6 from '../../img/background6.png';
import background8 from '../../img/background8.png';
import Icon1 from '../../img/logo1.png';
import Icon2 from '../../img/logo2.png';
import Icon3 from '../../img/f.png';
import Icon4 from '../../img/insta.png';
import Icon5 from '../../img/github.png';
import Icon6 from '../../img/blog.png';
import Icon7 from '../../img/github1.png';
import Icon8 from '../../img/unist.png';
import './home.css';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const preventDefault = (event) => event.preventDefault();
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
  const [appbarcolor, setappbarcolor]= useState('transparent');
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
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <AppBar className = 'Barcontainer' component="nav" color='transparent' elevation={0} >
        <div style={{backgroundColor: appbarcolor}}>
        <Toolbar style={{ boxShadow: 'none'}}>
        <Button>
        <Avatar alt="Hexa_logo" variant="square" sx={{ fontStyle:"normal",
              left: "100px",
              width: '40px',
              height: '45px',
              mr: 15,
              ml: 1,
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
              mr: 2,
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
          <Avatar className = "Loginbutton" sx={{ fontFamily:"'NanumGothic'",fontStyle:"normal",fontWeight:"800",fontSize:"12px",lineHeight:"18px",textAlign:"center", bgcolor: 'white', mr: 10,  width: 48, height: 24, color: '#0A0A50'}}variant="rounded">
            로그인
          </Avatar>
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
          <Avatar className = "Loginbutton" sx={{ fontFamily:"'NanumGothic'",fontStyle:"normal",fontWeight:"800",fontSize:"12px",lineHeight:"18px",textAlign:"center", bgcolor: 'white', mr: 10,  width: 56, height: 24, color: '#0A0A50'}}variant="rounded">
            지원하기
          </Avatar>
          <IconButton sx={{ml:4, mr:4, bgcolor: 'background.default', color: 'text.primary'}} onClick={colorMode.toggleColorMode} color="inherit">
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
            <Typography variant="h6" className = 'newsTitle' noWrap component="a" href="/" sx={{ fontStyle:"normal",
              mt: 2,
              mb:3,
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
  const contactinfo = '$> 동아리 메일: hexa.unist@gmail.com\n$> 회장 메일(김선욱, 2022): d02reams@unist.ac.kr'
  const Contact = () =>{
    return(
      <div>
        <Box className='ContactTitle'>Contact</Box>
        <Box className='ContactInfo'>{contactinfo}</Box>
      </div>
    )
  }
  return(
      <div className='hexaIntro' style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${background4})`} }>
          {/* <Box className='hexaTitle'>
            {title}
            </Box> */}
          <Typography className='hexaTitle' component='div'>
          <Box sx={{ fontWeight: '900', fontSize: '32px' }} display='inline'>H</Box>ACKERS
          <Box sx={{ fontWeight: '900', fontSize: '32px' }} display='inline'> eX</Box>CXCITING
          <Box sx={{ fontWeight: '900', fontSize: '32px' }} display='inline'> A</Box>CADEMY
          </Typography>
          <Box className='hexadescription'>{subTitle}</Box>
          <div>
          <Stack className = 'ExternalLink' direction="row" spacing={2}>
            <Contact/>
            <Link href="https://ko-kr.facebook.com/unist.hexa/" underline="none">
            <Avatar alt ="faceBook" src = {Icon3} sx={{width:"70px", height: "70px"}} variant="rounded"/>
            </Link>
            <Link href="https://www.instagram.com/" underline="none">
            <Avatar alt ="instrgram" src = {Icon4} sx={{width:"70px", height: "70px"}} variant="rounded"/>
            </Link>
            <Link href="https://github.com/HeXA-UNIST" underline="none">
            <Avatar alt ="github" src = {Icon5} sx={{width:"70px", height: "70px"}} variant="rounded"/>
            </Link>
            <Link href="https://hexa-unist.github.io/" underline="none">
            <Avatar alt ="blog" src = {Icon6} sx={{width:"70px", height: "70px"}} variant="rounded"/>
            </Link>
      </Stack>
          </div>
      </div>
  )
}
const BusHexa = ()=>{
  const BusHexaInfo = () =>{
    return(
      <div>
        <Box className='BusHexaTitle'>BUS HeXA</Box>
        <Box className='BusHexaDescription' sx={{mb:1}}>BUS HeXA는 UNIST에 도착하는 버스 시간과 배차 간격을 확인하는 서비스입니다.</Box>
        <Stack direction="row" spacing={2}>
        <Link href="https://bus.hexa.pro/" underline="none">
        <Avatar className = "HexaBusButton" sx={{ fontFamily:"'NanumGothic'",fontStyle:"normal",fontWeight:"800",fontSize:"16px",lineHeight:"1px",textAlign:"center", bgcolor: '#666666',color:'white',  width: 160, height: 40}}variant="rounded">
            바로가기→
        </Avatar>
        </Link>
        <Link href="https://github.com/Raon1123/bus-hexa" underline="none">
        <Avatar className =  "HexBusGithubButton" sx={{ width: 40, height: 40}} src = {Icon7} variant="rounded"/></Link>
        </Stack>
      </div>
    )
  }
  return(
    <div className = 'ServiceTitle'>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50px">
        <Typography variant="h6" noWrap component="a" href="/" sx={{ fontStyle:"normal",
              mt: 2,
              mb:3,
              mr: 20,
              ml: 20,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Asap',
              fontWeight: 700,
              fontSize: "28px",
              color: 'inherit',
              textDecoration: 'none',
              color: 'white'
            }}>
            SERVICES
        </Typography>
      </Box>
      <Stack direction="row" spacing={2}>
      <Avatar alt="Hexa_logo2" variant="square" 
            sx={{ fontStyle:"normal",
              width:'90px',
              height: '105px',
              mr: 3,
              ml: 5,
              mb: 2,
              display: { xs: 'none', md: 'flex' }
            }} src={Icon1}/>
        <BusHexaInfo></BusHexaInfo>
        </Stack>
    </div>

  )
}
const Sponsor = ()=>{
   return(
      <div className = "SponsorBanner" style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${background5})`} }>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50px">
        <Typography variant="h6" noWrap component="a" href="/" sx={{ fontStyle:"normal",
              mt:3,
              mb:3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Asap',
              fontWeight: 700,
              fontSize: "28px",
              color: 'inherit',
              textDecoration: 'none',
              color: 'white',
              textAlign:"center"
            }}>
            HeXA 후원사
        </Typography>
        </Box>
        <Box className='SponsorDescription'>
          다양한 후원사와 멘토링 기회, 그리고 소통을 기다리고 있습니다 :) 
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
        <div className = 'SponsorContact' style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${background6})`} }>
          <Box display="flex" justifyContent="center" alignItems="center">
          <Box className='SponsorContact' sx={{mt:1, mb:1,ml:2,mr:2}}>(Contact) hexa.unist@gmail.com</Box>
          </Box>
        </div>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Avatar className =  "UNISTIcon" sx={{ width: 120, height: 120, mt:4, mb:4}} src = {Icon8} variant="rounded"/>
        </Box>
      </div>
   )
}
const HeXAInfo = () =>{
  const HeXAContactInfo = () =>{
    return(
      <div>
        <Box className='HexaLocation'>(44919) 울산광역시 울주군 언양읍 유니스트길 50 (언양읍, 울산과학기술원) 203동(학생회관) 415호</Box>
        <Box className='HexaLicense' >Developed in HeXA, Licensed under MIT License</Box>
      </div>
    )
  }
  return(
    <div style={{minHeight:"250px", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${background8})`} }>
      <Stack direction="row" spacing={2}>
      <Avatar alt="Hexa_logo1" variant="square" 
            sx={{ fontStyle:"normal",
              width:'90px',
              height: '105px',
              mt:5,
              mr: 3,
              ml: 5,
              mb: 2,
              display: { xs: 'none', md: 'flex' }
            }} src={Icon2}/>
        <Box className='HexaLogo'>HeXA</Box>
      </Stack>
      <HeXAContactInfo />
    </div>
  )
}
const Home = (props) => {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
    return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
    <div>
        <TextMobileStepper/>
        <News/>
        <HexaIntro/>
        <BusHexa/>
        <Sponsor/>
        <HeXAInfo/>
    </div>
      </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default Home;