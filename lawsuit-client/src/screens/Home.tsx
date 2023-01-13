import "../App.scss";

import {
  Avatar,
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Chip,
  GridList,
  GridListTile,
} from "@material-ui/core";

import {
    Star,
    ChevronRight,
    Person
} from "@material-ui/icons"

function Home() {
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h4">Olá Douglas!</Typography>
      <Grid>
        <Card
          style={{
            background: "black",
            color: "white",
            position: "relative",
            display: "flex",
          }}
        >
          <Avatar>
            <Star />
          </Avatar>
          <Box>
            <Typography variant="h4">Acesso ilimitado!</Typography>
            <Typography variant="h4">
              Assine agora e acesse todas as informações sobre seus produtos!
            </Typography>
          </Box>
          <Box
            style={{
              background: "blue",
              bottom: 0,
              right: 0,
              position: "absolute",
            }}
          >
            <ChevronRight />
          </Box>
        </Card>
        <GridList>
          <GridListTile key="Subheader" cols={2} style={{height:"auto"}}>
            <Typography variant="h4">Processos</Typography>
          </GridListTile>
          <GridListTile>
            <Card>
              <Person />
              <Typography variant="h4">Processo 1</Typography>
              <Chip label="Banco do Brasil" />
            </Card>
          </GridListTile>
          <GridListTile>
            <Card>
              <Person />
              <Typography variant="h4">Processo 2</Typography>
              <Chip label="Banco do Brasil" />
            </Card>
          </GridListTile>
          <GridListTile>
            <Card style={{ border: "dashed 1px black" }}>
              <Typography variant="h4">+ Adicionar</Typography>
            </Card>
          </GridListTile>
        </GridList>
      </Grid>
    </Container>
  );
}

export default Home;
