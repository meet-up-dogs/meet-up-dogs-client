import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Container from '@mui/material/Container';
import "@fontsource/shrikhand";


const Imprint = () => {

  const styles = {

    container: {
      marginTop: "20vh",
      marginBottom: "20vh",
      height: "max-content",
      backgroundColor: "#eee",
      color: '#2b2b2b'
    },
    header: {
      fontFamily: 'shrikhand',
      marginBottom: '1rem',
      textAlign: 'left',

    }
  }

  return (

    <>

      <Header />

      <Container maxWidth="sm" style={styles.container}>

        <h2 style={styles.header}>Impressung für private Homepage</h2>

        <p>Anbieter dieser Internetseite ist:</p>
        <p>Eveline Klieber</p>
        <p>St. Valentin 12</p>
        <p>83324 Ruhpolding</p>
        <p>Telefon:(0151)59496927</p>
        <p>Email:meetupdogs@gmail.com</p>
        <p>Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV: Eveline Klieber</p>
      </Container>

      <Footer />
    </>
  );
};

export default Imprint;