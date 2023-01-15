import "../App.scss";

import { Box, colors, Typography } from "@material-ui/core";

import React from "react";
import { Involved } from "../types/types";

interface InvolvedContentProps {
  customStyle?: React.CSSProperties;
  involved: Involved;
}
function InvolvedContent({ customStyle, involved }: InvolvedContentProps) {
  return (
    <Box
      style={{
        ...customStyle,
        padding: "15px 0",
      }}
    >
      <Box>
        <Typography
          style={{
            fontWeight: "bold",
            color: colors.grey[500],
          }}
        >
          POLO ATIVO
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Box>
            <Typography
              style={{
                color: "#2196F3",
              }}
            >
              {involved.perpetrator}
            </Typography>
            <Typography>Autor</Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#2196F3",
              }}
            >
              {involved.plaintifLawyer.name}
            </Typography>
            <Typography
            >
              {`Advogado envoldido - ${involved.plaintifLawyer.id}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box style={{ marginTop: "30px" }}>
        <Typography
          style={{
            fontWeight: "bold",
            color: colors.grey[500],
          }}
        >
          POLO PASSIVO
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Box>
            <Typography
              style={{
                color: "#2196F3",
              }}
            >
              {involved.acused}
            </Typography>
            <Typography>Réu</Typography>
          </Box>
          <Box>
            <Typography
              style={{
                color: "#2196F3",
              }}
            >
              {involved.defendantLawyer.name}
            </Typography>
            <Typography
            >
              {`Advogado envoldido - ${involved.defendantLawyer.id}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InvolvedContent;
