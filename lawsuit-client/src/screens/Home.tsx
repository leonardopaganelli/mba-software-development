import "../App.scss";

import {
  Container,
  Typography,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Avatar,
  Box
} from "@material-ui/core";

import { HomeRounded, PersonRounded, Add } from "@material-ui/icons";

import PremiumAccess from "../components/premiumAccess";
import LawsuitGrid from "../components/lawsuitsGrid";

function Home() {
  return (
    <Container
      maxWidth={"sm"}
      style={{
        border: "solid black 1px",
        height: "100vh",
        overflowY: "auto",
        paddingTop: "40px",
        position: "relative",
      }}
    >
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/1071625?v=4"
          style={{ borderRadius: "10px" }}
        />
        <Typography
          variant="h1"
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          Olá Douglas!
        </Typography>
      </Box>
      <Grid>
        <PremiumAccess customStyle={{ marginTop: "20px" }} />
        <LawsuitGrid customStyle={{ marginTop: "20px", maxHeight: "69vh", height: "69vh", alignContent: "baseline" }} />
      </Grid>
      <BottomNavigation showLabels style={{
            boxShadow: "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            borderRadius: "14px 14px 0 0",
            justifyContent: "space-around",
            position: "absolute",
            width: "100%",
            left: 0,
            bottom: 0
        }} >
        <BottomNavigationAction icon={<HomeRounded />} />
        <BottomNavigationAction icon={<PersonRounded />} />
      </BottomNavigation>
      <Fab
        style={{
          position: "absolute",
          bottom: "30px",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          backgroundColor: "black",
          color: "white",
          borderRadius: "14px",
        }}
      >
        <Add />
      </Fab>
    </Container>
  );
}

export default Home;
