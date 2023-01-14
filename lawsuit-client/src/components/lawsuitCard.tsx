import "../App.scss";

import {
  Typography,
  Card,
  Chip,
} from "@material-ui/core";

import { Person } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

interface LawsuitCardProps {
  customStyle?: React.CSSProperties;
  lawsuitId: string;
  accused: string;
}
function LawsuitCard({ customStyle, lawsuitId, accused }: LawsuitCardProps) {
    const navigate = useNavigate();

  return (
    <Card
      style={{
        padding: "15px",
        backgroundColor: "#fcf0f0",
        borderRadius: "20px",
        cursor: "pointer",
        ...customStyle,
      }}
      onClick={(e) => {
        console.log(e);
        navigate("/detail");
      }}
    >
      <Person style={{ color: "#f08a8e" }} />
      <Typography
        style={{
          marginTop: "30px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        { lawsuitId }
      </Typography>
      <Chip
        label={accused}
        style={{
          padding: "15px 10px",
          backgroundColor: "#fbe4e6",
          color: "#f08a8e",
        }}
      />
    </Card>
  );
}

export default LawsuitCard;
