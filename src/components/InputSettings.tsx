"use client";
import { useState } from "react";
import { Box, Button, FormHelperText, IconButton, InputAdornment, MenuItem, TextField, Tooltip } from "@mui/material";
import { InputSettingsProps } from "../ts/interfaces";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DEFAULT_INPUT_SETTINGS, INPUT_TYPES } from "@/ts/constants/input";
import { InputType } from "@/ts/types/input";
import { InputSettingsData } from "@/ts/interfaces/input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const createNewFileField = (value = "") => ({ id: Date.now() + Math.random(), value });

export default function InputSettings({ onSettingsChange }: InputSettingsProps) {
  const [inputSettings, setInputSettings] = useState<InputSettingsData>(DEFAULT_INPUT_SETTINGS);
  const teste = createNewFileField(DEFAULT_INPUT_SETTINGS.inputFiles[0] || "");

  const [inputFiles, setInputFiles] = useState([teste]);

  const handleChange = (name: keyof InputSettingsData, value: string | string[]) => {
    const updatedSettings = {
      ...inputSettings,
      [name]: value,
    };

    console.log("Updated Input Settings:", updatedSettings);

    setInputSettings(updatedSettings);
    onSettingsChange?.(updatedSettings);
  };

  const handleFileChange = (id: number, value: string) => {
    console.log("File change triggered for ID:", id, "with value:", value);
    const newFiles = inputFiles.map((file) => (file.id === id ? { ...file, value } : file));
    const updatedFiles = newFiles.map((file) => file.value);
    console.log("newFiles:", newFiles);
    console.log("updatedFiles:", updatedFiles);
    setInputFiles(newFiles);
    handleChange("inputFiles", updatedFiles);
  };

  const handleAddFileField = () => {
    const newInputFileField = createNewFileField();
    setInputFiles((prevFiles) => [...prevFiles, newInputFileField]);
    const updatedFiles = [...inputSettings.inputFiles, newInputFileField.value];
    handleChange("inputFiles", updatedFiles);
  };

  const handleRemoveFileField = (id: number) => {
    console.log("Remove file field triggered for ID:", id);
    const newFiles = inputFiles.filter((file) => file.id !== id);
    setInputFiles(newFiles);
    const updatedFiles = newFiles.map((file) => file.value);
    handleChange("inputFiles", updatedFiles);
  };

  // TODO botao de add deve estar desabilitado se algum campo de input estiver vazio

  return (
    <Box
      sx={{
        minWidth: 500,
        maxWidth: 500,
        gap: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="form" noValidate autoComplete="off" sx={{ gap: 2, display: "flex", flexDirection: "column", width: "100%" }}>
        <TextField
          select
          label="Input Type"
          value={inputSettings.inputType as InputType}
          onChange={(e) => handleChange("inputType", e.target.value)}
          variant="outlined"
          fullWidth
          helperText="Select the input data format"
        >
          {INPUT_TYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Tooltip title={option.description} placement="right">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {option.label}
                  <HelpOutlineIcon fontSize="small" sx={{ ml: 1, fontSize: "16px", opacity: 0.7 }} />
                </Box>
              </Tooltip>
            </MenuItem>
          ))}
        </TextField>

        {inputFiles.map((file, index) => (
          <Box key={file.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title={file.value} placement="top">
              <TextField
                label={`Input File ${index + 1}`}
                value={file.value}
                onChange={(e) => handleFileChange(file.id, e.target.value)}
                required
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <TextSnippetIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Tooltip>
            {inputSettings.inputFiles.length > 1 && (
              <IconButton onClick={() => handleRemoveFileField(file.id)} color="error">
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <FormHelperText>If you add multiple input files, they will be processed as FUSION task.</FormHelperText>

        {inputSettings.inputFiles.length < 5 && (
          <Button size="small" onClick={handleAddFileField} startIcon={<AddCircleOutlineIcon />} variant="outlined">
            Add Input File
          </Button>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <TextField label="Image List File" value={inputSettings.inputFileList} onChange={(e) => handleChange("inputFileList", e.target.value)} fullWidth />
        </Box>

        <TextField label="Input Classes File" value={inputSettings.inputFileClasses} onChange={(e) => handleChange("inputFileClasses", e.target.value)} />

        <TextField label="Dataset Images Path" value={inputSettings.datasetImagesPath} onChange={(e) => handleChange("datasetImagesPath", e.target.value)} />
      </Box>
    </Box>
  );
}
