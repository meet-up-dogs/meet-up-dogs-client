import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function About(props) {

  const margin = { m: 1 };


  return (
    <>
      <Header
        login={props.login}
        handleChange={props.handleChange}
        margin={margin}
        user={props.user}
      />


    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="./images/farid.png"
        alt="avatar farid"
      />
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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

      <Footer />
    </>

  )
}