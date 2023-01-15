import "../App.scss";

import { Box, Typography, Container } from "@material-ui/core";

import { MonetizationOnOutlined, AccountBalanceRounded, GavelRounded } from "@material-ui/icons";
import React from "react";
import { Court, Involved } from "../types/types";

interface LawsuitResumeProps {
  customStyle?: React.CSSProperties;
  involved: Involved;
  amountInControversy: number;
  nature: string;
  court: Court;
}
function LawsuitResume({ customStyle, involved, amountInControversy, nature, court }: LawsuitResumeProps) {
  return (
    <Box
      style={{
        backgroundColor: "white",
        borderRadius: "14px 14px 0 0",
        ...customStyle,
      }}
    >
      <Container maxWidth={"sm"}>
        <Typography
          style={{
            fontWeight: "bold",
          }}
        >
          {`${involved.perpetrator} X ${involved.acused}`}
        </Typography>
        <Box style={{ display: "flex" }}>
          <AccountBalanceRounded
            style={{ height: "20px", cursor: "pointer" }}
          />
          <Typography>
            {`${court.alias} - ${court.city}, ${court.state}`}
          </Typography>
        </Box>
        <Box style={{ display: "flex" }}>
          <GavelRounded style={{ height: "20px", cursor: "pointer" }} />
          <Typography>{nature}</Typography>
        </Box>
        <Box style={{ display: "flex" }}>
          <MonetizationOnOutlined
            style={{ height: "20px", cursor: "pointer" }}
          />
          <Typography>{`Valor da causa: R$${amountInControversy}`}</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LawsuitResume;
