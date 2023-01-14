import "../App.scss";

import {
  Avatar,
  Box,
  Typography,
  Card,
  colors
} from "@material-ui/core";

import { Star, ArrowForward } from "@material-ui/icons";
import React from "react";

interface PremiumAccessProps {
  customStyle?: React.CSSProperties;
}
function PremiumAccess({ customStyle } : PremiumAccessProps) {
  return (
    <Card
      style={{
        background: "black",
        color: "white",
        position: "relative",
        display: "flex",
        borderRadius: "16px",
        padding: "15px",
        cursor: "pointer",
        ...customStyle,
      }}
    >
      <Avatar
        style={{ backgroundColor: colors.grey[800], width: 30, height: 30 }}
      >
        <Star style={{ height: "20px" }} />
      </Avatar>
      <Box style={{ marginLeft: "20px" }}>
        <Typography
          style={{
            fontSize: 18,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Acesso ilimitado!
        </Typography>
        <Typography
          style={{
            fontSize: 16,
            color: colors.grey[700],
            maxWidth: "60%",
          }}
        >
          Assine agora e acesse todas as informações sobre seus produtos!
        </Typography>
      </Box>
      <Box
        style={{
          background: "#448aff",
          bottom: 0,
          right: 0,
          position: "absolute",
          borderRadius: "14px",
          padding: "10px",
        }}
      >
        <ArrowForward />
      </Box>
    </Card>
  );
}

export default PremiumAccess;
