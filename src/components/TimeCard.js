import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReactCardFlip from "react-card-flip";

const Style = {
  cardfront: {
    height: "100%",
    minHeight: 330,
    width: "100%",
    minWidth: 240,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardback: {
    height: "100%",
    minHeight: 330,
    width: "100%",
    minWidth: 240,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardmedia: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  cardcontent: {
    position: "relative",
    backgroundColor: "transparent",
  },
};

export default function TimeCard(props) {
  const [isFlipped, setFlipped] = React.useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card
        style={Style.cardfront}
        onMouseOver={() => setFlipped((prev) => !prev)}
      >
        <CardMedia
          component="img"
          height="250"
          image={props.img}
          alt="time card img"
        />
        <CardContent>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            {props.motto}
          </Typography>
        </CardContent>
      </Card>
      <Card style={Style.cardback} onClick={() => setFlipped((prev) => !prev)}>
        <CardMedia
          style={Style.cardmedia}
          component="img"
          height="250"
          image={props.imgb}
          alt="time card img"
        />
        <CardContent style={Style.cardcontent}>
          <Typography paragraph></Typography>
          <Typography
            paragraph
            variant="body2"
            align="left"
            sx={{ fontWeight: "bold" }}
          >
            {props.paragraph1}
          </Typography>
          <Typography variant="body2" align="left" sx={{ fontWeight: "bold" }}>
            {props.paragraph2}
          </Typography>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
}
