import Box from '@mui/material/Box';
import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Icon2 from '../../img/logo2.png';
import Stack from '@mui/material/Stack';
import background8 from '../../img/background8.png';


class HeXAInfo extends Component
{
    render(){
        return(
            <div style={{ minHeight: "250px", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${background8})` }}>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Hexa_logo1" variant="square"
            sx={{
              fontStyle: "normal",
              width: '90px',
              height: '105px',
              mt: 5,
              mr: 3,
              ml: 5,
              mb: 2,
              display: { xs: 'none', md: 'flex' }
            }} src={Icon2} />
          <Box className='HexaLogo'>HeXA</Box>
        </Stack>
        <HeXAContactInfo />
      </div>
        )
    }
}
class HeXAContactInfo extends Component
{
    render() {
        return(
            <div>
          <Box className='HexaLocation'>(44919) 울산광역시 울주군 언양읍 유니스트길 50 (언양읍, 울산과학기술원) 203동(학생회관) 415호</Box>
          <Box className='HexaLicense' >Developed in HeXA, Licensed under MIT License</Box>
            </div>
        )
    }
}
export default HeXAInfo;