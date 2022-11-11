import * as React from 'react';
import { useEffect, useRef, useState } from "react";

import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import Link from '@mui/material/Link';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


import background1 from '../../img/background1.jpg';
import background2 from '../../img/background2.jpg';
import background3 from '../../img/background3.jpg';
import background4 from '../../img/background4.png';



import Icon3 from '../../img/f.png';
import Icon4 from '../../img/insta.png';
import Icon5 from '../../img/github.png';
import Icon6 from '../../img/blog.png';
const HexaIntro = () => {
    const title = '\n\nHACKERS eXCITING ACADEMY\n\n';
    const subTitle = 'HeXA는 2011년부터 시작된 UNIST 동아리연합회 소속의 종합 프로그래밍 동아리입니다. 매학기 프로젝트를 진행하며, 웹/앱, 정보보안, 게임 분야로 나누어 개발하고 있습니다. \n\n\n동아리에서는 각자 관심 분야에 따른 개발 역량을 늘리기 위해 지원하며, 개발자의 협업과 소통을 미리 경험하고 능력을 키울 수 있도록 돕고 있습니다. 또한, 매학기말에 프로젝트를 공유하는 시간을 통해 다양한 분야에 대한 관심을 키울 수 있도록 노력하고 있습니다.\n\n\n HeXA는 BUS HeXA와 같은 UNIST 학우를 위한 서비스를 개발해왔으며, 오랜 역사와 많은 인적 네트워크를 통해 구성원 모두가 함께 성장을 도모하고 있습니다.\n\n\n\n'
    const contactinfo = '$> 동아리 메일: hexa.unist@gmail.com\n$> 회장 메일(김선욱, 2022): d02reams@unist.ac.kr'
    const Contact = () => {
      return (
        <div>
          <Box className='ContactTitle'>Contact</Box>
          <Box className='ContactInfo'>{contactinfo}</Box>
        </div>
      )
    }
    return (
      <div className='hexaIntro' style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${background4})` }}>
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
          <Stack className='ExternalLink' direction="row" spacing={2}>
            <Contact />
            <Link href="https://ko-kr.facebook.com/unist.hexa/" underline="none">
              <Avatar alt="faceBook" src={Icon3} sx={{ width: "70px", height: "70px" }} variant="rounded" />
            </Link>
            <Link href="https://www.instagram.com/" underline="none">
              <Avatar alt="instrgram" src={Icon4} sx={{ width: "70px", height: "70px" }} variant="rounded" />
            </Link>
            <Link href="https://github.com/HeXA-UNIST" underline="none">
              <Avatar alt="github" src={Icon5} sx={{ width: "70px", height: "70px" }} variant="rounded" />
            </Link>
            <Link href="https://hexa-unist.github.io/" underline="none">
              <Avatar alt="blog" src={Icon6} sx={{ width: "70px", height: "70px" }} variant="rounded" />
            </Link>
          </Stack>
        </div>
      </div>
    )
  }
export default HexaIntro;