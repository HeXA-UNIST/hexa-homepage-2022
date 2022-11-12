import { Component } from "react";
import Typography from '@mui/material/Typography';


import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';


import Icon8 from '../../img/unist.png';
import './home.css';

class Sponsor extends Component{
    render(){
        return (
            <div className="SponsorBanner" style={{ background: 'linear-gradient(270deg, #110B29 0%, rgba(68, 34, 204, 0.7) 100%)' }}>
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="50px">
                <Typography variant="h6" noWrap component="a" href="/" sx={{
                  fontStyle: "normal",
                  mt: 3,
                  mb: 3,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Asap',
                  fontWeight: 700,
                  fontSize: "28px",
                  color: 'inherit',
                  textDecoration: 'none',
                  color: 'white',
                  textAlign: "center"
                }}>
                  HeXA 후원사
                </Typography>
              </Box>
              <Box className='SponsorDescription'>
                다양한 후원사와 멘토링 기회, 그리고 소통을 기다리고 있습니다 :)
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <div className='SponsorContact' style={{ background: 'linear-gradient(180deg, #0B0B60 0%, rgba(0, 0, 0, 0.7) 100%)' }}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Box className='SponsorContact' sx={{ mt: 1, mb: 1, ml: 2, mr: 2 }}>(Contact) hexa.unist@gmail.com</Box>
                  </Box>
                </div>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar className="UNISTIcon" sx={{ width: 120, height: 120, mt: 4, mb: 4 }} src={Icon8} variant="rounded" />
              </Box>
            </div>
          )
    }
}
export default Sponsor;