import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link,Grid, styled, Card, Divider} from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginWithEmail, registerWithEmail, registerWithGithub, registerWithGoogle } from "../../features/auth/auth";
import HeXAInfo from '../Home/HexaInfo';
// import { useHistory } from "react-router-dom";
import '../Home/home.css';
import { useDispatch } from 'react-redux';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router';
import { loadPersonalDataFirebase } from 'features/personal/personal';





export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginWithEmail(data.get('email'),data.get('password')).then((err)=>{

        navigate('/home');
    });
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  const signupWithGoogle = () => {
    registerWithGoogle().then((result)=>{
      const uid = result.user.reloadUserInfo.localId
      
      loadPersonalDataFirebase(uid).then((data)=>{
         if(data.email == "" || data.name ==""|| data.studentId==""){
            navigate('/editProfile');
         }else{
            navigate('/home');
         }
      })
    })
  }
  const signupWithGithub = () => {
    registerWithGithub().then((result)=>{
      const uid = result.user.reloadUserInfo.localId
      loadPersonalDataFirebase(uid).then((data)=>{
        if(data.email == "" || data.name ==""|| data.studentId==""){
           navigate('/editProfile');
        }else{
           navigate('/home');
        }
     })
    })  
  }
  // const SignupWithGoogleButton = styled(Button)({
  //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //   border: 0,
  //   borderRadius: 3,
  //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   color: 'white',
  //   height: 48,
  //   padding: '0 30px',
  //   '&$hover:hover': {
  //     // Set hover color
  //     backgroundColor: '#49bb7b',
  //   },
  // });
  return (
    <>
      <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)"/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Card sx={{paddingLeft:4, paddingRight:4}}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="로그인 유지"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              로그인
            </Button >

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item sx={{mb:1}}>
                <Link href="/Signup" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
  
          </Box>
          </Card>
          <Divider/>

          <Button fullWidth
              variant="contained"
              sx={{ mt:3, mb: 1, backgroundColor: '#4285F4', textTransform: 'none'}}
              onClick={signupWithGoogle}><GoogleIcon sx={{mr:1}}/>Google 로그인 </Button>
            <Button fullWidth
              variant="contained"
              sx={{ mb: 2, backgroundColor: '#24292E', textTransform: 'none'}}
              onClick={signupWithGithub}><GitHubIcon sx={{mr:1}}/>Github 로그인 
              </Button>

        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      <HeXAInfo/>
      </>
  );
}

