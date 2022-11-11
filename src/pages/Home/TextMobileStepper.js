import { Component } from "react";
import * as React from 'react';
import { useEffect, useRef, useState } from "react";

import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


import Box from '@mui/material/Box';
import ResponsiveAppBar from './Appbar';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


import background1 from '../../img/background1.jpg';
import background2 from '../../img/background2.jpg';
import background3 from '../../img/background3.jpg';


const steps = [
    {
      label: 'HeXA에서 UNIST학우를 위한\n웹/앱 서비스를 만들어갑니다',
      description: `HeXA는 2011년부터 시작된 UNIST 종합 프로그래밍 동아리입니다.\nUNIST 학우의 생활을 개선하기 위한 많은 서비스를 개발하고 있습니다.`,
      background: background1,
    },
    {
      label: 'HeXA에서 함께\n보안전문가로 성장해갑니다.',
      description:
        `HeXA는 2011년부터 시작된 UNIST 종합 프로그래밍 동아리입니다.\nCTF팀을 운영하고 있으며 초심자와 함께 매년 STTF도 참가하고 있습니다. `,
      background: background2,
    },
    {
      label: 'HeXA에서 함께\n게임개발자로 성장해갑니다.',
      description: `HeXA는 2011년부터 시작된 UNIST 종합 프로그래밍 동아리입니다.\n프로젝트를 통해 인디게임 개발 경험을 쌓을 수 있습니다.`,
      background: background3,
    },
  ];
  const styles = {
    backbutton: { "position": "absolute", "width": "50px", "height": "100px", "left": "0px", "top": "250px" },
    nextbutton: { "position": "absolute", "width": "50px", "height": "100px", "right": "0px", "top": "250px" },
    newstitle: { "fontFamily": "'Noto Sans KR'", "fontStyle": "normal", "fontWeight": "500", "fontSize": "48px", "lineHeight": "120%" },
    news: { "fontFamily": "'Noto Sans KR'", "fontStyle": "normal", "fontWeight": "500", "fontSize": "12px", "textAlign": "center", "whiteSpace": "pre-wrap" },
    stepper: { "color": 'transparent' }
  }
const TextMobileStepper = () => {
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
      <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${steps[activeStep].background})` }} >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ResponsiveAppBar />
          <Box sx={{ p: 6 }}>
            <Box className='Introtitle'>{steps[activeStep].label}</Box>
            <Box className='Introdescription'>{steps[activeStep].description}</Box>
            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
  
              sx={{ maxWidth: 100, flexGrow: 1, margin: "auto", backgroundColor: "transparent" }}
              nextButton={
                <Button
                  size='large'
                  sx={styles.nextbutton}
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
  
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft className="ArrowLeft" fontSize='large' />
                  ) : (
                    <KeyboardArrowRight className="ArrowRight" fontSize='large' />
                  )}
                </Button>
              }
  
              backButton={
                <Button sx={styles.backbutton} size='200' onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight className="ArrowRight" fontSize='large' />
                  ) : (
                    <KeyboardArrowLeft className="ArrowLeft" fontSize='large' />
                  )}
  
                </Button>
              }
            />
          </Box></div></div>
    );
  }
export default TextMobileStepper;