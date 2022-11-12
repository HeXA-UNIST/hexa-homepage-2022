import * as React from 'react';



import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';




import './home.css';

import HeXAInfo from './HexaInfo';
import Sponsor from './Sponsor';
import ProjectIntro from './ProjectIntro';
import TextMobileStepper from './TextMobileStepper';
import HexaIntro from './HexaIntro';
import News from './news';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { registerAuthStateChangedObserver } from '../../features/auth/auth';
import {loadUserPersonalData, loadPersonalData} from '../../features/personal/personal_reducer.js'
import ResponsiveAppBar from './ResponsiveAppbar';
import { loginSlice, selectIsLoggedIn, setIsLoggedIn } from '../../features/auth/login_reducer';
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });



const Home = (props) => {
  const [mode, setMode] = React.useState('light');

  // Todo : 일단은 임시로 여기에 적어뒀는데, 나중에는 App.js쪽에서 최상위 단계에 적어놔야함.
  // const [state, dispatchstate] = React.useReducer

  const dispatch = useDispatch()
  useEffect(()=>{
    console.log(dispatch(registerAuthStateChangedObserver));
  }, []);

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
          <ResponsiveAppBar bgcolor = "transparent"/>
          <TextMobileStepper />
          <News />
          <HexaIntro/>
          <ProjectIntro />
          <Sponsor />
          <HeXAInfo />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Home;