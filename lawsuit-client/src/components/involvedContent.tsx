import "../App.scss";

import { Box, Typography } from "@material-ui/core";

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
      }}
    >
      <Box>
        <Typography
          style={{
            fontWeight: "bold",
          }}
        >
          POLO ATIVO
        </Typography>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              {involved.perpetrator}
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              Autor
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              {involved.plaintifLawyer.name}
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              {`Advogado envoldido - ${involved.plaintifLawyer.id}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          style={{
            fontWeight: "bold",
          }}
        >
          POLO PASSIVO
        </Typography>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box >
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              {involved.acused}
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              Réu
            </Typography>
          </Box>
          <Box>
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              {involved.defendantLawyer.name}
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
              }}
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
