import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Style = {
  card: {
    height: "100%",
    minHeight: 400,
    width: "100%",
    minWidth: 150,
    maxWidth: 500,
  },
};

export default function MultiActionAreaCard(props) {
  return (
    <Card style={Style.card}>
      <CardMedia
        component="img"
        alt="project img"
        height="270"
        image={props.img}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {props.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          sx={{ fontWeight: "bold" }}
        >
          {props.introduce}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="flex-end">
          <Button
            size="small"
            href={props.link}
            underline="none"
            target="_blank"
            rel="noreferrer noopenner"
          >
            了解更多
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
