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
    <Box style={{ paddingTop: 15 }}>
      <Typography>
        {`O processo teve origem no ${court.name}, em ${new Date(
          initDate
        ).toLocaleDateString()}`}
      </Typography>
      <Box style={{ display: "flex", marginTop: 20 }}>
        <AccountBalanceRounded style={{ height: "24px", cursor: "pointer" }} />
        <Box style={{ marginLeft: 10 }}>
          <Typography style={{ fontSize: 18 }}>Tribunal de Origem</Typography>
          <Typography style={{ marginTop: 6 }}>
            {`${court.alias} · ${court.city}, ${court.state}`}
          </Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex", marginTop: 20 }}>
        <GavelRounded style={{ height: "24px", cursor: "pointer" }} />
        <Box style={{ marginLeft: 10 }}>
          <Typography style={{ fontSize: 18 }}>Assunto</Typography>
          <Typography style={{ marginTop: 6 }}>
            {subjects.map(({ name }) => name).join(" / ")}
          </Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex", marginTop: 20 }}>
        <EventRounded style={{ height: "24px", cursor: "pointer" }} />
        <Box style={{ marginLeft: 10 }}>
          <Typography style={{ fontSize: 18 }}>Início do Processo</Typography>
          <Typography style={{ marginTop: 6 }}>
            {new Date(initDate).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex", marginTop: 20 }}>
        <MonetizationOn style={{ height: "24px", cursor: "pointer" }} />
        <Box style={{ marginLeft: 10 }}>
          <Typography style={{ fontSize: 18 }}>Valor da Causa</Typography>
          <Typography style={{ marginTop: 6 }}>
            {`R$${Number(amountInControversy).toLocaleString("pt-BR", {minimumFractionDigits: 2,})}`}
          </Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex", marginTop: 20 }}>
        <InfoOutlined style={{ height: "24px", cursor: "pointer" }} />
        <Box style={{ marginLeft: 10 }}>
          <Typography style={{ fontSize: 18 }}>Natureza</Typography>
          <Typography style={{ marginTop: 6 }}>{nature}</Typography>
        </Box>
      </Box>
      <Box style={{ display: "flex", marginTop: 20 }}>
        <DomainRounded style={{ height: "24px", cursor: "pointer" }} />
        <Box style={{ marginLeft: 10 }}>
          <Typography style={{ fontSize: 18 }}>Poder Judiciário</Typography>
          <Typography style={{ marginTop: 6 }}>{judicialBranch}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default GeneralInfoContent;
