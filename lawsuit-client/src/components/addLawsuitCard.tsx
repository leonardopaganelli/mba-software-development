import "../App.scss";

import { Typography, Card } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

interface AddLawsuitCardProps {
  customStyle?: React.CSSProperties;
}
function AddLawsuitCard({ customStyle }: AddLawsuitCardProps) {

    const navigate = useNavigate();
  return (
    <Card
      style={{
        padding: "40px",
        borderRadius: "20px",
        border: "dashed 1px black",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        ...customStyle,
      }}
      onClick={(e) => {
        console.log(e);
        navigate("/add");
      }}
    >
      <Typography
        style={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        + Adicionar
      </Typography>
    </Card>
  );
}

export default AddLawsuitCard;
