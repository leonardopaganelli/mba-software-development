import "../App.scss";

import { Box, Typography, Container } from "@material-ui/core";

import { MonetizationOnOutlined, AccountBalanceRounded, GavelRounded, EventRounded, MonetizationOn, InfoOutlined, DomainRounded, } from "@material-ui/icons";
import React from "react";
import { Court, Involved, Subject } from "../types/types";

interface GeneralInfoContentProps {
  customStyle?: React.CSSProperties;
  court: Court;
  subjects: Subject[];
  initDate: Date;
  amountInControversy: number;
  nature: string;
  judicialBranch: string;
}
function GeneralInfoContent({
  customStyle,
  court,
  subjects,
  initDate,
  amountInControversy,
  nature,
  judicialBranch,
}: GeneralInfoContentProps) {
  return (
    <Box>
      <Typography
        style={{
          fontWeight: "bold",
        }}
      >
        {`O processo teve origem no ${court.name}`}
      </Typography>
      <Box style={{ display: "flex" }}>
        <AccountBalanceRounded style={{ height: "20px", cursor: "pointer" }} />
        <Box>
          <Typography>Tribunal de Origem</Typography>
          <Typography>
            {`${court.alias} - ${court.city}, ${court.state}`}
          </Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex" }}>
        <GavelRounded style={{ height: "20px", cursor: "pointer" }} />
        <Box>
          <Typography>Assunto</Typography>
          <Typography>{subjects.map(({name})=>name).join(" / ")}</Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex" }}>
        <EventRounded style={{ height: "20px", cursor: "pointer" }} />
        <Box>
          <Typography>Início do Processo</Typography>
          <Typography>{initDate.toString()}</Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex" }}>
        <MonetizationOn style={{ height: "20px", cursor: "pointer" }} />
        <Box>
          <Typography>Valor da Causa</Typography>
          <Typography>{`R$${amountInControversy}`}</Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex" }}>
        <InfoOutlined style={{ height: "20px", cursor: "pointer" }} />
        <Box>
          <Typography>Natureza</Typography>
          <Typography>{nature}</Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex" }}>
        <DomainRounded style={{ height: "20px", cursor: "pointer" }} />
        <Box>
          <Typography>Poder Judiciário</Typography>
          <Typography>{judicialBranch}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default GeneralInfoContent;
