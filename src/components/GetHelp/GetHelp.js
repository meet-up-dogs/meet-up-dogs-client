import * as React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Container from "@mui/material/Container";
import "@fontsource/shrikhand";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    color: "white"
  },
});

const getHelp = () => {

  const styles = {

    container: {
      marginTop: "10vh",
      marginBottom: "10vh",
      height: "max-content",
      width: "70vw",
      color: '#2b2b2b',
      fontFamily: "system-ui",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontFamily: 'shrikhand',
      color: '#2B2B2B',
      marginTop: '0.5rem',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    useCase: {
      fontFamily: 'shrikhand',
      color: '#2B2B2B',
    }
  }

  return (

    <>

      <ThemeProvider theme={darkTheme}>
      <Header />
      <br></br>

        <Container maxWidth="sm" classList="imprint-container" style={styles.container}>

          <h4 style={styles.header} > Use case:</h4>
          <p >With this app you can find other dog owners in your area for walking together. Then the dogs can play and you have entertainment too :-D</p>
          <p></p>
          <AddCircleIcon />   
          <h4 style={styles.header}> complete your profil:</h4>
          <p>Create a user profil and draw a rectangle on the map for the area where you are walking your dog.</p>

          <AddCircleIcon />   
          <h4 style={styles.header}>find matches:</h4>
          <p>click on "Match" to find users whose area overlaps with the area you entered in your profile. If you don't get any matches, you have to define a bigger area in your profile to get matches</p>

          <AddCircleIcon />   
          <h4 style={styles.header}>contact your matches:</h4>
          <p>In the match list you will get more information about the other users. You can mark them as a favorite and start a real-time conversation by clicking on "Chat". Even if the other user is not logged in, he / she will receive a notification the next time he / she logs in.</p>

          <AddCircleIcon />   
          <h4 style={styles.header}>go out with your dog(s) and have fun!</h4>
          <p></p>



        </Container>

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default getHelp;