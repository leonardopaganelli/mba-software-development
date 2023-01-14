import "../App.scss";

import {
  Typography,
  Card,
  GridList,
  GridListTile,
} from "@material-ui/core";

import LawsuitCard from "./lawsuitCard";
import AddLawsuitCard from "./addLawsuitCard";

import http from "../utils/http-common";
import { useEffect, useState } from "react";

interface LawsuitGridProps {
  customStyle?: React.CSSProperties;
}

interface Lawsuit {
  "Involved.acused": string;
  amountInControversy: string;
  courtId: number;
  id: string;
  initDate: string
  judicialBranch: string;
  nature: string
}

function LawsuitGrid({ customStyle }: LawsuitGridProps) {
  const [lawsuitList, setLawsuitList] = useState([] as Lawsuit[]);

  const fetchData = async () => {
    const lawsuits = (await http.get("lawsuit")).data;
    setLawsuitList(lawsuits as Lawsuit[]);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <GridList style={{ ...customStyle }}>
      <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
        <Typography style={{fontSize: "22px", fontWeight: "bold"}}>Processos</Typography>
      </GridListTile>
      { lawsuitList.map((item) => (
        <GridListTile key={item.id}>
            <LawsuitCard lawsuitId={item.id} accused={item["Involved.acused"]} />
        </GridListTile>
      ))}
      <GridListTile>
        <AddLawsuitCard customStyle={{
          padding: "58px",
          alignItems: "center"
        }}/>
     </GridListTile>
    </GridList>
  );
}

export default LawsuitGrid;
