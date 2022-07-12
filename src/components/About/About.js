import * as React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AvatarFarid from "../images/farid.png";
import ImageEvi from "../images/evi.jpg";
import ImageKarol from "../images/karol.jpg";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";
export default function About(props) {
  const { user, setUser } = useContext(MainContext);

  const styles = {
    card: {
      maxWidth: 345,
      margin: "0 auto",
      marginTop: "10%",
    },
    media: {
      height: "800",
      width: "200",
      margin: "0 auto",
    },
    container: {
      marginTop: "10%",
      marginBottom: "10%",
      height: "max-content",
      backgroundColor: "#eee",
      borderRadius: "1%",
    },
  };

  return (
    <>
      <Header />

      <Container
        className="container-farid"
        maxWidth="sm"
        style={styles.container}
      >
        <Card className="card-farid">
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
              motivated young programmer from hamburg.... motivated young
              programmer from hamburg.... motivated young programmer from
              hamburg....
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <a href="https://github.com/FaridTvK" target="_blank">
              <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png"/>
              </a>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Container
        className="container-evi"
        maxWidth="sm"
        style={styles.container}
      >
        <Card className="card-evi">
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
              motivated programmer from munich.... motivated programmer from
              munich.... motivated programmer from munich....
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <a href="https://github.com/EveKlieber" target="_blank">
              <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png"/>
              </a>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Container
        className="container-karol"
        maxWidth="sm"
        style={styles.container}
      >
        <Card className="card-karol">
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
              motivated young programmer from Berlin.... motivated young
              programmer from hamburg.... motivated young programmer from
              hamburg....
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
               <a href="https://github.com/karolwasemann" target="_blank">
               <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png"/>
              </a >
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Footer />
    </>
  );
}
