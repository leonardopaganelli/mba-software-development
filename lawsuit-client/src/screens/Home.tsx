import "../App.scss";

import {
  Container,
  Typography,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Avatar,
  Box,
  Snackbar,
  Button,
} from "@material-ui/core";

import { Search } from "@material-ui/icons";

import { Alert } from "@material-ui/lab";

import { HomeRounded, PersonRounded, Add, QuestionAnswer } from "@material-ui/icons";

import PremiumAccess from "../components/premiumAccess";
import LawsuitGrid from "../components/lawsuitsGrid";
import AddLawsuitModal from "../components/addLawsuitModal";
import { useState } from "react";
import { connect } from "socket.io-client";
import { useNavigate } from "react-router-dom";

interface updateMessage {
  lawsuitId: string;
  description: string;
  date: string;
  status: string;
}

const socket = connect("http://localhost:3000")

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lawsuitUpdate, setLawsuitUpdate] = useState({} as updateMessage);
  const navigate = useNavigate();

  socket.on("lawsuit-update", (data: string) => {
    const formattedValue = JSON.parse(data);
    setLawsuitUpdate(formattedValue);
  })
  const handleClickModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setLawsuitUpdate({} as updateMessage);
  };

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
        <LawsuitGrid
          customStyle={{
            marginTop: "20px",
            maxHeight: "69vh",
            height: "69vh",
            alignContent: "baseline",
          }}
          addLawsuitCallback={() => setModalOpen(true)}
        />
      </Grid>
      <BottomNavigation
        showLabels
        style={{
          boxShadow:
            "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          borderRadius: "14px 14px 0 0",
          justifyContent: "space-around",
          position: "absolute",
          width: "100%",
          left: 0,
          bottom: 0,
        }}
      >
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
        onClick={handleClickModalOpen}
      >
        <Add />
      </Fab>

      <Fab
        style={{
          position: "absolute",
          bottom: "100px",
          right: "10px",
          backgroundColor: "#575ca6",
          color: "white",
          borderRadius: "50%",
        }}
        onClick={() => {
          socket.emit("teams-message");
        }}
      >
        <QuestionAnswer />
      </Fab>
      <AddLawsuitModal open={modalOpen} handleClose={handleModalClose} />
      <Snackbar
        open={!!Object.keys(lawsuitUpdate).length}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          <Typography
            style={{ fontWeight: "bold" }}
          >{`O processo ${lawsuitUpdate.lawsuitId} foi atualizado!`}</Typography>
          <Typography>{`O evento ${lawsuitUpdate.description} foi adicionado!`}</Typography>
          <Button
            size="small"
            endIcon={<Search />}
            onClick={() => {
              navigate(`/detail/${lawsuitUpdate.lawsuitId}`);
            }}
          >
            Ver Atualização
          </Button>
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;
