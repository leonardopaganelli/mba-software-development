import "../App.scss";

import { Avatar, Box, Typography, Card, colors, Container } from "@material-ui/core";

import { Star, ArrowForward, ChevronLeft } from "@material-ui/icons";
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
      style={{
        color: "white",
        display: "flex",
        padding: "15px",
        ...customStyle,
      }}
    >
      <ChevronLeft
        style={{ height: "20px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      <Box style={{ marginLeft: "20px" }}>
        <Typography
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {accused}
        </Typography>
        <Typography
          style={{
            fontSize: 11,
            color: colors.grey[700],
          }}
        >
          {`Processo nº ${lawsuitId}`}
        </Typography>
      </Box>
    </Container>
  );
}

export default DetailHeader;
