import * as React from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AvatarFarid from '../images/farid.png'
import ImageEvi from '../images/evi.jpg';
import ImageKarol from '../images/karol.jpg';

export default function About(props) {

  const margin = { m: 1 };

  const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: '600',
      width: '200',
    },
    container: {
      marginTop: '3rem',
      marginBottom: '3rem',
      backgroundColor: '#eee'
    }
  };


  return (

    <>
      <Header
        login={props.login}
        handleChange={props.handleChange}
        margin={margin}
        user={props.user}
      />

      <Container className="container-farid" maxWidth="sm"
        style={styles.container}
      >
        <Card className="card-farid" sx={{ maxWidth: 345 }}>
          <CardMedia
            // style={{paddingBottom: '5rem'}}
            style={styles.media}
            component="img"
            image={AvatarFarid}
            alt="avatar farid"
          />
          {/* < img src={AvatarFarid} alt="avatar farid" /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Farid Tavoli
            </Typography>
            <Typography variant="body2" color="text.secondary">
              motivated young programmer from hamburg....
              motivated young programmer from hamburg....
              motivated young programmer from hamburg....
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

      </Container >


      <Container className="container-evi" maxWidth="sm"
        style={styles.container}
      >

        <Card className="card-evi" sx={{ maxWidth: 345 }}>
          <CardMedia
            style={styles.media}
            component="img"
            image={ImageEvi}
            alt="image from evi"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Eveline Klieber
            </Typography>
            <Typography variant="body2" color="text.secondary">
              motivated programmer from munich....
              motivated programmer from munich....
              motivated programmer from munich....
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container >

      <Container className="container-karol" maxWidth="sm"
        style={styles.container}
      >
        <Card className="card-karol" sx={{ maxWidth: 345 }} >
          <CardMedia
            style={styles.media}
            component="img"
            image={ImageKarol}
            alt="image from karol"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Karol Wasemann
            </Typography>
            <Typography variant="body2" color="text.secondary">
              motivated young programmer from hamburg....
              motivated young programmer from hamburg....
              motivated young programmer from hamburg....
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

      </Container >



      <Footer />
    </>

  )
}