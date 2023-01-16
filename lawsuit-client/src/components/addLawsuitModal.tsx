import "../App.scss";

import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import http from "../utils/http-common";
import { useState } from "react";

interface addLawsuitForm {
    id: string,
    nature: string,
    judicialBranch: string,
    initDate: string,
    amountInControversy: string,
    perpetrator: string,
    plaintifLawyerId: string,
    acused: string,
    defendantLawyerId: string
}

interface AddLawsuitModalProps {
  customStyle?: React.CSSProperties;
  handleClose: () => void;
  open: boolean;
}

function AddLawsuitModal({
  handleClose,
  open,
}: AddLawsuitModalProps) {
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const addLawsuit = async ({
    id,
    nature,
    judicialBranch,
    initDate,
    amountInControversy,
    perpetrator,
    acused,
    plaintifLawyerId,
    defendantLawyerId
   }: addLawsuitForm) => {
    const payload = {
        id,
        nature,
        judicialBranch,
        initDate,
        amountInControversy: Number(amountInControversy),
        courtId: 1,
        involved: {
            perpetrator,
            acused,
            plaintifLawyerId,
            defendantLawyerId
        },
        subjects: [1]
    }
    try {
        setError(false);
        setLoading(true);
        await http.post("lawsuit", payload);
        setLoading(false);
        handleClose();
    } catch(e) {
        setLoading(false);
        console.error(e);
        setError(true);
    }
  };

  const onSubmit = (data: unknown) => {
    addLawsuit(data as addLawsuitForm);
  };

  return (
    <Dialog open={open} onClose={() => !loading && handleClose()} fullWidth>
      <DialogTitle>Adicionar processo</DialogTitle>
      <DialogContent>
        {error && (
          <Typography
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Ocorreu um erro ao adicionar o processo
          </Typography>
        )}
        <form style={{ display: "flex", flexFlow: "column" }}>
          <TextField
            {...register("id")}
            name="id"
            label="Id do processo"
            placeholder="502XXXX-21.2021.8.08.0025"
            required
            autoFocus
          />
          <TextField
            {...register("nature")}
            name="nature"
            label="Natureza do processo"
            placeholder="Procedimento do juizado especial cível"
            required
          />
          <TextField
            {...register("judicialBranch")}
            name="judicialBranch"
            label="Poder Judiciário"
            placeholder="Justiça dos Estados e do Distrito Federal e Territórios"
            required
          />
          <TextField
            {...register("initDate")}
            name="initDate"
            type="date"
            label="Data de início"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            {...register("amountInControversy")}
            name="amountInControversy"
            type={"number"}
            label="Valor da causa"
            required
          />
          <TextField
            {...register("perpetrator")}
            name="perpetrator"
            label="Autor"
            required
          />
          <TextField
            {...register("plaintifLawyerId")}
            name="plaintifLawyerId"
            label="Advogado demandante"
            placeholder="OAB 6739/ES"
            required
          />
          <TextField {...register("acused")} name="acused" label="Acusado" />
          <TextField
            {...register("defendantLawyerId")}
            name="defendantLawyerId"
            label="Advogado de defesa"
            placeholder="OAB 7716/MG"
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <CircularProgress /> : "Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddLawsuitModal;
