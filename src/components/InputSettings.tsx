"use client";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Box, Button, FormHelperText, IconButton, InputAdornment, MenuItem, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { DEFAULT_INPUT_SETTINGS, INPUT_TYPES } from "@/ts/constants/input";
import type { InputSettingsData } from "@/ts/interfaces/input";
import type { InputType } from "@/ts/types/input";
import type { InputSettingsProps } from "../ts/interfaces";

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

  // TODO: botao de add deve estar desabilitado se algum campo de input estiver vazio

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        gap: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box autoComplete="off" component="form" noValidate sx={{ gap: 2, display: "flex", flexDirection: "column", width: "100%" }}>
        <TextField
          fullWidth
          helperText="Select the input data format"
          label="Input Type"
          onChange={(e) => handleChange("inputType", e.target.value)}
          select
          value={inputSettings.inputType as InputType}
          variant="outlined"
        >
          {INPUT_TYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Tooltip placement="right" title={option.description}>
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
            <Tooltip placement="top" title={file.value}>
              <TextField
                fullWidth
                label={`Input File ${index + 1}`}
                onChange={(e) => handleFileChange(file.id, e.target.value)}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <TextSnippetIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                value={file.value}
              />
            </Tooltip>
            {inputSettings.inputFiles.length > 1 && (
              <Tooltip title="Remove input file">
                <IconButton color="error" onClick={() => handleRemoveFileField(file.id)}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ))}
        <FormHelperText>If you add multiple input files, they will be processed as FUSION task.</FormHelperText>

        {inputSettings.inputFiles.length < 5 && (
          <Tooltip title="Add another input file">
            <Button onClick={handleAddFileField} size="small" startIcon={<AddCircleOutlineIcon />} variant="outlined">
              Add Input File
            </Button>
          </Tooltip>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <TextField fullWidth label="Image List File" onChange={(e) => handleChange("inputFileList", e.target.value)} value={inputSettings.inputFileList} />
        </Box>

        <TextField label="Input Classes File" onChange={(e) => handleChange("inputFileClasses", e.target.value)} value={inputSettings.inputFileClasses} />

        <TextField label="Dataset Images Path" onChange={(e) => handleChange("datasetImagesPath", e.target.value)} value={inputSettings.datasetImagesPath} />
      </Box>
    </Box>
  );
}
