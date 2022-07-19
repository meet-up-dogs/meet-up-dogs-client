import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Container from '@mui/material/Container';
import "@fontsource/shrikhand";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    color: "white"
  },
});


const Imprint = () => {

  const styles = {

    container: {
      marginTop: "20vh",
      marginBottom: "20vh",
      height: "max-content",
      width: "70vw",
      backgroundColor: "#eee",
      color: '#2b2b2b',
      fontFamily: "system-ui",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontFamily: 'system-ui',
      color: '#2B2B2B',
      marginBottom: '2rem',
      textAlign: 'center',

    }
  }

  return (

    <>

      <ThemeProvider theme={darkTheme}>
      <Header />
      <br></br>

        <Container maxWidth="sm" classList="imprint-container" style={styles.container}>

          <h4 classList="imprint-header" style={styles.header} >Impressum für private Homepage </h4>
          <p>Anbieter dieser Internetseite ist:</p>
          <p>Eveline Klieber</p>
          <p>St. Valentin 12</p>
          <p>83324 Ruhpolding</p>
          <p>Telefon:(0151)59496927</p>
          <p>Email:meetupdogs@gmail.com</p>
          <p>Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV: Eveline Klieber</p>
        </Container>

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Imprint;