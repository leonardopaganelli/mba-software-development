import { Typography, Card } from "@material-ui/core";

interface AddLawsuitCardProps {
  customStyle?: React.CSSProperties;
  onClick: () => void;
}

function AddLawsuitCard({ customStyle, onClick }: AddLawsuitCardProps) {
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
      onClick={onClick}
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
