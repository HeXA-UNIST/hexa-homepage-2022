import * as React from 'react';



import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';




import './home.css';

import HeXAInfo from './HexaInfo';
import Sponsor from './Sponsor';
import ProjectIntro from './ProjectIntro';
import TextMobileStepper from './TextMobileStepper';
import HexaIntro from './HexaIntro';
import News from './news';
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });





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
          <TextMobileStepper />
          <News />
          <HexaIntro />
          <ProjectIntro />
          <Sponsor />
          <HeXAInfo />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Home;