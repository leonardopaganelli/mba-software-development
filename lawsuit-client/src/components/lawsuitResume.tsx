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
        padding: "15px 0",
        ...customStyle,
      }}
    >
      <Container maxWidth={"sm"}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {`${involved.perpetrator} X ${involved.acused}`}
        </Typography>
        <Box
          style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
        >
          <AccountBalanceRounded style={{ height: "16px" }} />
          <Typography>
            {`${court.alias} - ${court.city}, ${court.state}`}
          </Typography>
        </Box>
        <Box
          style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
        >
          <GavelRounded style={{ height: "16px" }} />
          <Typography>{nature}</Typography>
        </Box>
        <Box
          style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
        >
          <MonetizationOnOutlined style={{ height: "16px" }} />
          <Typography>{`Valor da causa: R$${Number(
            amountInControversy
          ).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LawsuitResume;
