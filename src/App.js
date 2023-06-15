import { ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchName from './components/SearchName';
import TableData from './components/TableData';
import ToolBar from './components/Toolbar';
import { PlanetsArea } from './context/PlanetsContext';
import { playSong } from './helpers/playAudio';
import gif from './media/images/loading.gif';


const theme = createTheme({
  typography: {
    fontFamily: 'NK57 Monospace',
  },
  palette: {
    common: {
      main: '#fff',
      light: 'white'
    },
    primary: {
      light: '#ffe81f',
      main: '#ffe81f',
    },
    secondary: {
      light: '#000',
      main: '#000',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.85)',
      secondary: '#ffe91fa7',
    },
    background: {
      paper: 'rgba(0,0,0,0.75)',
    },

  },
});

function App() {
  useEffect(()=> {
    const initializeSound = async () => {
      const response = await Swal.fire({
        title: 'Welcome to StarWars Search Planets',
        // icon: 'info',
        iconHtml: `<img src="${gif}" alt="loading" />`,
        text: 'Discover more about your homeland!',
        iconColor: 'var(--themeYellow)',
        customClass: 'glass',
        width: '550px',
        // timer: 5000,
        // timerProgressBar: true,
        color: 'white',
        footer: '<p style="text-align: center;">Please give the credits to <a href="https://linkedin.com/in/jhonatec/" target="_blank">@jhonatec</a> on Linkedin if you use this code!</p>',
        confirmButtonColor: 'var(--secondaryTextColor)',
        
      });

      playSong(response);

    }
   initializeSound();
  }, []);
  return (
    <div>
      <PlanetsArea>
        <ThemeProvider theme={ theme }>
          <div className="main--container glass">
            <Header/>
            <SearchName />
            <ToolBar />
            <TableData />
            <Footer/>
          </div>
        </ThemeProvider>

      </PlanetsArea>
    </div>
  );
}

export default App;
