import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Stack, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import type { EvaluationSettingsProps } from "@/ts/types/evaluation";

export default function EvaluationSettings({ onSettingsChange, settings }: EvaluationSettingsProps) {
  const [useMap, setUseMap] = useState<boolean>(settings?.useMap ?? false);
  const [useEfficiency, setUseEfficiency] = useState<boolean>(settings?.useEfficiency ?? false);
  const [recallValues, setRecallValues] = useState<number[]>(settings?.recall || []);
  const [inputRecallValue, setInputRecallValue] = useState<string>("");
  const [precisionValues, setPrecisionValues] = useState<number[]>(settings?.precision || []);
  const [inputPrecisionValue, setInputPrecisionValue] = useState<string>("");

  const handleAddRecall = () => {
    const value = Number.parseInt(inputRecallValue, 10);
    if (!(Number.isNaN(value) || recallValues.includes(value))) {
      const newValues = [...recallValues, value].sort((a, b) => a - b);
      setRecallValues(newValues);
      onSettingsChange({
        useMap: useMap ?? false,
        recall: newValues,
        precision: precisionValues,
        useEfficiency: useEfficiency ?? false,
      });
    }
    setInputRecallValue("");
  };

  // Função para lidar com a mudança do MAP
  const handleMapChange = (checked: boolean) => {
    setUseMap(checked);
    console.log("MAP:", checked);
    onSettingsChange({
      useMap: checked,
      recall: recallValues,
      precision: precisionValues,
      useEfficiency: useEfficiency ?? false,
    });
  };

  const handleEfficiencyChange = (checked: boolean) => {
    setUseEfficiency(checked);
    console.log("Efficiency:", checked);
    onSettingsChange({
      useMap: useMap ?? false,
      recall: recallValues,
      precision: precisionValues,
      useEfficiency: checked,
    });
  };

  // Function to delete a recall value
  const handleDeleteRecall = (value: number) => {
    const newValues = recallValues.filter((recall) => recall !== value);
    setRecallValues(newValues);
    onSettingsChange({
      useMap: useMap ?? false,
      recall: newValues,
      precision: precisionValues,
      useEfficiency: useEfficiency ?? false,
    });
  };

  const handleAddPrecision = () => {
    const value = Number.parseInt(inputPrecisionValue, 10);
    if (!(Number.isNaN(value) || precisionValues.includes(value))) {
      const newValues = [...precisionValues, value].sort((a, b) => a - b);
      setPrecisionValues(newValues);
      onSettingsChange({
        useMap: useMap ?? false,
        recall: recallValues,
        precision: newValues,
        useEfficiency: useEfficiency ?? false,
      });
    }
    setInputPrecisionValue("");
  };

  const handleDeletePrecision = (value: number) => {
    const newValues = precisionValues.filter((precision) => precision !== value);
    setPrecisionValues(newValues);
    onSettingsChange({
      useMap: useMap ?? false,
      recall: recallValues,
      precision: newValues,
      useEfficiency: useEfficiency ?? false,
    });
  };

  //   TODO: limitar quantidade pelo tamanho do ranked list
  // validar 1 a N
  // N: tamanho do dataset

  return (
    <Box
      sx={{
        minWidth: 500,
        maxWidth: 500,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box autoComplete="off" component="form" noValidate sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={!!useMap} name="map" onChange={() => handleMapChange(!useMap)} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  MAP
                  <Tooltip placement="right" title="Compute and show MAP results">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1, fontSize: "16px", opacity: 0.7 }} />
                  </Tooltip>
                </Box>
              }
            />
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={!!useEfficiency} name="efficiency" onChange={() => handleEfficiencyChange(!useEfficiency)} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Efficiency
                  <Tooltip placement="right" title="Enable efficiency evaluation">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1, fontSize: "16px", opacity: 0.7 }} />
                  </Tooltip>
                </Box>
              }
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Divider />

      <Box>
        <FormLabel component="legend">Recall</FormLabel>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <TextField
            color={inputRecallValue.trim() !== "" && Number.isNaN(Number.parseInt(inputRecallValue, 10)) ? "error" : "primary"}
            label="Add Recall"
            onChange={(e) => setInputRecallValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddRecall();
              }
            }}
            size="small"
            value={inputRecallValue}
            variant="outlined"
          />
          <Button
            color="primary"
            disabled={!inputRecallValue || Number.isNaN(Number.parseInt(inputRecallValue, 10))}
            onClick={handleAddRecall}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
          {recallValues.map((value) => (
            <Chip color="primary" deleteIcon={<DeleteIcon />} key={value} label={value} onDelete={() => handleDeleteRecall(value)} />
          ))}
        </Stack>
      </Box>

      <Box>
        <FormLabel component="legend">Precision</FormLabel>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <TextField
            color={inputPrecisionValue.trim() !== "" && Number.isNaN(Number.parseInt(inputPrecisionValue, 10)) ? "error" : "primary"}
            label="Add Precision"
            onChange={(e) => setInputPrecisionValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddPrecision();
              }
            }}
            size="small"
            value={inputPrecisionValue}
            variant="outlined"
          />
          <Button
            color="primary"
            disabled={!inputPrecisionValue || Number.isNaN(Number.parseInt(inputPrecisionValue, 10))}
            onClick={handleAddPrecision}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
          {precisionValues.map((value) => (
            <Chip color="primary" deleteIcon={<DeleteIcon />} key={value} label={value} onDelete={() => handleDeletePrecision(value)} />
          ))}
        </Stack>
      </Box>

      <Divider />
    </Box>
  );
}
