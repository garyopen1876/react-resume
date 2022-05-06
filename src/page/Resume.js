import "./Resume.css";
import SkillBox from "../components/SkillBox.js";
import MyselfCard from "../components/MyselfCard.js";
import Timeline from "../components/Timeline.js";
import Collections from "../components/Collections.js";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Resume() {
  return (
    <div>
      <div className="Basic">
        <header className="Header"></header>
        <body>
          <div className="Body">
            <div className="Body-border">
              <Grid container justifyContent="center">
                <MyselfCard />
              </Grid>
              <Typography
                variant="h5"
                sx={{ p: 5, mb: -5, fontWeight: "bold" }}
                color="#B5B5B5"
              >
                學經歷 Education & Experience
              </Typography>
              <Grid container justifyContent="center">
                <hr
                  style={{
                    width: "90%",
                    height: 3,
                    backgroundColor: "#C9C9C9",
                    borderColor: "#FFF3DE",
                  }}
                />
                <Timeline />
              </Grid>
              <Typography
                variant="h5"
                sx={{ p: 5, mb: -5, fontWeight: "bold" }}
                color="#B5B5B5"
              >
                專長 Skills
              </Typography>
              <Grid container spacing={1} columns={{ xs: 3, sm: 6, md: 12 }}>
                <hr
                  style={{
                    width: "90%",
                    height: 3,
                    backgroundColor: "#C9C9C9",
                    borderColor: "#FFF3DE",
                  }}
                />
                <Grid item xs={3}>
                  <SkillBox title="Front-end" color="#DABEA7" />
                </Grid>
                <Grid item xs={3}>
                  <SkillBox title="Back-end" color="#A98B73" />
                </Grid>
                <Grid item xs={3}>
                  <SkillBox title="Database" color="#9D7553" />
                </Grid>
                <Grid item xs={3}>
                  <SkillBox title="More" color="#876D5A" />
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                sx={{ p: 5, mb: -5, fontWeight: "bold" }}
                color="#B5B5B5"
              >
                作品集 Collections
              </Typography>
              <Grid container justifyContent="center" alignItems="center">
                <hr
                  style={{
                    width: "90%",
                    height: 3,
                    backgroundColor: "#C9C9C9",
                    borderColor: "#FFF3DE",
                  }}
                />
                <Collections />
              </Grid>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
}

export default Resume;
