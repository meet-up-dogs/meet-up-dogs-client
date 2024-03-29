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
import AvatarFarid from "../images/farid.jpeg";
import ImageEvi from "../images/evi.jpg";
import ImageKarol from "../images/karol.jpg";
export default function About(props) {
  const styles = {
    card: {
      maxWidth: 345,
      margin: "0 auto",
      marginTop: "10%",
    },
    media: {
      height: "400",
      width: "200",
      margin: "0 auto",
    },
    container: {
      marginTop: "15%",
      marginBottom: "20%",
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
        style={(styles.container, { paddingTop: "10vh" })}
      >
        <Card className="card-farid">
          <CardMedia
            style={styles.media}
            component="img"
            image={AvatarFarid}
            alt="avatar farid"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Farid Tavakoli Ghinani
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily="system-ui"
            >
              Full-stack Web Developer.
              Motivierter und lernfähiger Hamburger mit einem Jahr Erfahrung, auf der Suche nach neuen Herausforderungen.
              <br></br>HTML | CSS | JavaScript | React| ES6 | Node.js | Express.js | MongoDB
              
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <a href="https://github.com/FaridTvK" target="_blank">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontFamily="system-ui"
            >
              Eveline Klieber
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily="system-ui"
            >
              Full-stack junior web developer from Ruhpolding. This is situated between Munich
              and Salzburg. Before I specialized in supply chain management
              for 20 years and worked in some IT projects on this field. I am versatile and love to learn and develop - personally and professionally.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <a href="https://github.com/EveKlieber" target="_blank">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
              </a>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Container
        className="container-karol"
        maxWidth="sm"
        style={(styles.container, { paddingBottom: "10vh" })}
      >
        <Card className="card-karol">
          <CardMedia
            style={styles.media}
            component="img"
            image={ImageKarol}
            alt="image from karol"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontFamily="system-ui"
            >
              Karol Wasemann
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily="system-ui"
            >
              Full-Stack-Webentwickler mit einem Jahr Erfahrung in der
              Telekommunikationsbranche als Berater und Verkäufer. Zurzeit
              besuche ich einen einjährigen Kurs in Full-Stack-Entwicklung. Auf
              der Suche nach neuen Herausforderungen und Entwicklung im Bereich
              der Web-Entwicklung und Team-Management.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <a href="https://github.com/karolwasemann" target="_blank">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
              </a>
            </Button>
          </CardActions>
        </Card>
      </Container>

      <Footer />
    </>
  );
}
