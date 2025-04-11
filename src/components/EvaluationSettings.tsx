import { useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";

export default function EvaluationSettings() {
  const [useMap, setUseMap] = useState(false);
  const [recallValues, setRecallValues] = useState<number[]>([]);
  const [inputRecallValue, setInputRecallValue] = useState<string>("");
  const [precisionValues, setPrecisionValues] = useState<number[]>([]);
  const [inputPrecisionValue, setInputPrecisionValue] = useState<string>("");

  // Função para adicionar um valor de recall
  const handleAddRecall = () => {
    const value = parseInt(inputRecallValue, 10);
    if (!isNaN(value) && !recallValues.includes(value)) {
      const newValues = [...recallValues, value].sort((a, b) => a - b);
      setRecallValues(newValues);
    }
    setInputRecallValue("");
  };

  // Função para remover um valor de recall
  const handleDeleteRecall = (value: number) => {
    const newValues = recallValues.filter((recall) => recall !== value);
    setRecallValues(newValues);
  };

  const handleAddPrecision = () => {
    const value = parseInt(inputPrecisionValue, 10);
    if (!isNaN(value) && !precisionValues.includes(value)) {
      const newValues = [...precisionValues, value].sort((a, b) => a - b);
      setPrecisionValues(newValues);
    }
    setInputPrecisionValue("");
  };

  const handleDeletePrecision = (value: number) => {
    const newValues = precisionValues.filter(
      (precision) => precision !== value
    );
    setPrecisionValues(newValues);
  };

  //   TODO: limitar quantidade pelo tamanho do ranked list
  // validar 1 a N
  // N: tamanho do dataset

  return (
    <Box
      sx={{
        minWidth: 150,
        maxWidth: 400,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ gap: 2, display: "flex", flexDirection: "column" }}
      >
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useMap}
                  onChange={() => setUseMap(!useMap)}
                  name="map"
                />
              }
              label="MAP"
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Divider />

      {/* Campo de Recall */}
      <Box>
        <FormLabel component="legend">Recall</FormLabel>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <TextField
            label="Add Recall"
            variant="outlined"
            size="small"
            color={
              inputRecallValue.trim() !== "" &&
              isNaN(parseInt(inputRecallValue, 10))
                ? "error"
                : "primary"
            }
            value={inputRecallValue}
            onChange={(e) => setInputRecallValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddRecall();
              }
            }}
          />
          <Button
            color="primary"
            startIcon={<Add />}
            onClick={handleAddRecall}
            disabled={
              !inputRecallValue || isNaN(parseInt(inputRecallValue, 10))
            }
          >
            Add
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
          {recallValues.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleDeleteRecall(value)}
              deleteIcon={<DeleteIcon />}
              color="primary"
            />
          ))}
        </Stack>
      </Box>

      {/* Campo de Precision */}
      <Box>
        <FormLabel component="legend">Precision</FormLabel>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <TextField
            label="Add Precision"
            variant="outlined"
            size="small"
            color={
              inputPrecisionValue.trim() !== "" &&
              isNaN(parseInt(inputPrecisionValue, 10))
                ? "error"
                : "primary"
            }
            value={inputPrecisionValue}
            onChange={(e) => setInputPrecisionValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddPrecision();
              }
            }}
          />
          <Button
            color="primary"
            startIcon={<Add />}
            onClick={handleAddPrecision}
            disabled={
              !inputPrecisionValue || isNaN(parseInt(inputPrecisionValue, 10))
            }
          >
            Add
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
          {precisionValues.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleDeletePrecision(value)}
              deleteIcon={<DeleteIcon />}
              color="primary"
            />
          ))}
        </Stack>
      </Box>

      <Divider />
    </Box>
  );
}
