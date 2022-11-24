import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerWithEmail, registerWithGoogle, registerWithGithub } from "../../features/auth/auth";
import { loadPersonalDataFirebase, postPersonalDataFirebase } from '../../features/personal/personal';
import HeXAInfo from '../Home/HexaInfo';
// import { useHistory } from "react-router-dom";
import { GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";
import '../Home/home.css';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import { useNavigate } from 'react-router';
import { Stack } from '@mui/system';

// const theme = createTheme();

function SignUp() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    registerWithEmail(data.get('email'), data.get('password')).then((result) => {
      if (typeof result == "string") return alert(result);
      postPersonalDataFirebase(result.user.uid, { name: data.get('Name') }).then((r) => {
        loadPersonalDataFirebase(result.user.uid).then((data) => {
          navigate('/editProfile');
        });
      })
    });
  };

  const SignupWithEmailandPassword = () => {
    return (
      <Container component="main" sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }} maxWidth="xs">
        <CssBaseline />
        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="이름"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="이메일 수신 동의"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                회원가입
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ mb: 4 }}>
                  <Link href="/Login" variant="body2">
                    이미 계정이 있나요? 로그인
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Stack sx = {{minWidth:'400px',  marginTop: 100}} >
          <GoogleLoginButton onClick={signupWithGoogle} />
          <GithubLoginButton onClick={signupWithGithub} />
          </Stack> */}
          
        </Stack>
      </Container>
    )
  }
  return (
    <div style={{}}>

      <ResponsiveAppBar bgcolor="rgba(0, 0, 0, 0.8)" />
      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        <SignupWithEmailandPassword />
      </Stack>
      {/* <Button
          onClick={signupWithGoogle}>
          <GoolgleLogin

          <Typography>Continue with Google</Typography>
        </Button> */}
      <HeXAInfo />
    </div>
  );
}
export default SignUp