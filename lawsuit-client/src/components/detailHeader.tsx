import "../App.scss";

import { Box, Typography, colors, Container } from "@material-ui/core";

import { ChevronLeft } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DetailHeaderProps {
  customStyle?: React.CSSProperties;
  accused: String;
  lawsuitId: String;
}
function DetailHeader({ customStyle, accused, lawsuitId }: DetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={"sm"}
      style={{
        color: "white",
        display: "flex",
        marginTop: "20px",
        ...customStyle,
      }}
    >
      <ChevronLeft
        style={{ height: "26px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      <Box style={{ marginLeft: "20px" }}>
        <Typography
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {accused}
        </Typography>
        <Typography
          style={{
            color: colors.grey[700],
            marginTop: "5px",
          }}
        >
          {`Processo nº ${lawsuitId}`}
        </Typography>
      </Box>
    </Container>
  );
}

export default DetailHeader;
