import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import HeaderCard from "../img/header_card_img.jpg";
import Me from "../img/me.jpg";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import EmailIcon from "@mui/icons-material/Email";

const Style = {
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    height: 150,
    width: 150,
    marginTop: -10,
  },
  parentFlexRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MyselfCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={Style.card}>
      <CardMedia
        component="img"
        height="200"
        image={HeaderCard}
        alt="header_card"
      />
      <Avatar sx={Style.avatar} src={Me} alt="me" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          鈕臻昱
        </Typography>
        <Typography variant="body2" color="text.secondary">
          一個不是在製造bug，就是在製造更多bugs的工程師。
        </Typography>
        <Typography paragraph></Typography>
        <Typography
          paragraph
          align="left"
          sx={{ p: 5, mb: -5, fontWeight: "bold" }}
        >
          本人畢業於逢甲大學資工系，擅長且喜愛後端相關工程（如：演算法、資料庫），
          目前也在努力熟悉前端套件（React、Vue）希望能夠朝著全端之路邁進，
          平時會透過 Leetcode、Zerojudge
          等練習網站來維持並持續提升自己的程式設計能力。
        </Typography>
        <Typography
          paragraph
          align="left"
          sx={{ p: 5, mb: -5, fontWeight: "bold" }}
        >
          我是一位樂於溝通且細心的人，凡是我負責的事情一定會盡全力做好並避免任何錯誤發生。
          閒暇之餘我會去思考有沒有什麼程式是能夠在日常生活中幫助到我的，然後嘗試將其變成我的
          Side Project ， 因為對我來說能將程式融入生活是展現科技最直接的表現。
          雖然失敗往往比能用的多很多，但仍不減我對程式開發的熱忱。
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography sx={{ fontWeight: "bold" }}>聯絡資訊</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box>
            <Grid container spacing={4} columns={{ xs: 4, sm: 4, md: 12 }}>
              <Grid item xs={4}>
                <Link href="tel:+886-919612283" underline="none">
                  <LocalPhoneIcon sx={{ fontSize: 25 }} />
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link href="mailto:garyopen1876@gmail.com" underline="none">
                  <EmailIcon sx={{ fontSize: 25 }} />
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link
                  href="https://github.com/garyopen1876"
                  underline="none"
                  target="_blank"
                  rel="noreferrer noopenner"
                >
                  <GitHubIcon sx={{ fontSize: 25 }} />
                </Link>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
