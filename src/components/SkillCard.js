import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Style = {
  card: {
    width: "80%",
  },
};

export default function SkillCard(props) {
  return (
    <Card style={Style.card}>
      <Avatar src={props.img} alt="skill_img" />
      <CardContent alignItems="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
