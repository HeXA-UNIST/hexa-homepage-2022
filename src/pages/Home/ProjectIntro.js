import { Component } from "react";
import * as React from 'react';


import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import Link from '@mui/material/Link';

import Icon1 from '../../img/logo1.png';

import Icon7 from '../../img/github1.png';

class BusHexaInfo extends Component{
    render(){
        return(
            <div>
        <Box className='BusHexaTitle'>BUS HeXA</Box>
        <Box className='BusHexaDescription' sx={{ mb: 1 }}>BUS HeXA는 UNIST에 도착하는 버스 시간과 배차 간격을 확인하는 서비스입니다.</Box>
        <Stack direction="row" spacing={2}>
          <Link href="https://bus.hexa.pro/" underline="none">
            <Avatar className="HexaBusButton" sx={{ fontFamily: "'NanumGothic'", fontStyle: "normal", fontWeight: "800", fontSize: "16px", lineHeight: "1px", textAlign: "center", bgcolor: '#666666', color: 'white', width: 160, height: 40 }} variant="rounded">
              바로가기→
            </Avatar>
          </Link>
          <Link href="https://github.com/Raon1123/bus-hexa" underline="none">
            <Avatar className="HexBusGithubButton" sx={{ width: 40, height: 40 }} src={Icon7} variant="rounded" /></Link>
        </Stack>
      </div>
        )
    }
}
class BBextensionInfo extends Component{
    render(){
        return(
            <div className= 'BBextension'>
        <Box className='BusHexaTitle'>BlackBoard Extension</Box>
        <Box className='BusHexaDescription' sx={{ mb: 1 }}>BlackBoard Extension은 BlackBoard에서 다양한 추가 기능을 제공하는 서비스입니다.</Box>
        <Stack direction="row" spacing={2}>
          <Link href="https://chrome.google.com/webstore/detail/blackboard-extension/pbpldnhboapmjkbgakkkgefgkkdajfnc/related?hl=ko" underline="none">
            <Avatar className="HexaBusButton" sx={{ fontFamily: "'NanumGothic'", fontStyle: "normal", fontWeight: "800", fontSize: "16px", lineHeight: "1px", textAlign: "center", bgcolor: '#666666', color: 'white', width: 160, height: 40 }} variant="rounded">
              바로가기→
            </Avatar>
          </Link>
          <Link href="https://github.com/See-Y/blackboard-extension" underline="none">
            <Avatar className="HexBusGithubButton" sx={{ width: 40, height: 40 }} src={Icon7} variant="rounded" /></Link>
        </Stack>
      </div>
        )
    }
}
class ProjectIntro extends Component{
    render() {
        return (
        <div className='ServiceTitle'>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50px">
        <Typography variant="h6" noWrap component="a" href="/" sx={{
          fontStyle: "normal",
          mt: 2,
          mb: 3,
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
          sx={{
            fontStyle: "normal",
            width: '90px',
            height: '105px',
            mr: 3,
            ml: 5,
            mb: 2,
            display: { xs: 'none', md: 'flex' }
          }} src={Icon1} />
          <Stack spacing={2}><BusHexaInfo></BusHexaInfo>
        <BBextensionInfo></BBextensionInfo></Stack>
      </Stack>
    </div>
        )
    }
}
export default ProjectIntro;