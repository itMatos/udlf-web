"use client";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Box, Button, FormHelperText, IconButton, InputAdornment, MenuItem, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { DEFAULT_INPUT_SETTINGS, INPUT_TYPES } from "@/ts/constants/input";
import type { InputFileField, InputSettingsData, InputSettingsProps, InputType } from "@/ts/types/input";
import { createNewFileField } from "@/utils/helpers";
import FileExplorer from "../FileExplorer";

export default function InputSettings({ onSettingsChange }: InputSettingsProps) {
  const [inputSettings, setInputSettings] = useState<InputSettingsData>(DEFAULT_INPUT_SETTINGS);
  const teste = createNewFileField(DEFAULT_INPUT_SETTINGS.inputFiles[0] || "");
  const [inputFiles, setInputFiles] = useState<InputFileField[]>([teste]);

  const updateSettingField = (name: keyof InputSettingsData, value: string | string[]) => {
    const updatedSettings = {
      ...inputSettings,
      [name]: value,
    };

    console.log("Updated Input Settings:", updatedSettings);

    setInputSettings(updatedSettings);
    onSettingsChange?.(updatedSettings);
  };

  const updateInputFileValue = (id: number, value: string) => {
    console.log("File change triggered for ID:", id, "with value:", value);
    const newFiles = inputFiles.map((file) => (file.id === id ? { ...file, value } : file));
    const updatedFiles = newFiles.map((file) => file.value);
    console.log("newFiles:", newFiles);
    console.log("updatedFiles:", updatedFiles);
    setInputFiles(newFiles);
    updateSettingField("inputFiles", updatedFiles);
  };

  const appendInputFile = () => {
    const newInputFileField = createNewFileField();
    setInputFiles((prevFiles) => [...prevFiles, newInputFileField]);
    const updatedFiles = [...inputSettings.inputFiles, newInputFileField.value];
    updateSettingField("inputFiles", updatedFiles);
  };

  const handleRemoveFileField = (id: number) => {
    console.log("Remove file field triggered for ID:", id);
    const newFiles = inputFiles.filter((file) => file.id !== id);
    setInputFiles(newFiles);
    const updatedFiles = newFiles.map((file) => file.value);
    updateSettingField("inputFiles", updatedFiles);
  };

  // Function to automatically map dataset directories to their image subdirectories
  const mapDatasetToImagePath = (selectedPath: string): string => {
    // Extract the last directory name from the path
    const pathParts = selectedPath.split("/");
    const datasetName = pathParts[pathParts.length - 1];

    // Mapping for known datasets
    const datasetMapping: Record<string, string> = {
      mpeg7: "/original",
      corel5k: "/corel5k_images",
      oxford17flowers: "/jpg",
    };

    // If it's a known dataset, append the appropriate image subdirectory
    if (datasetMapping[datasetName]) {
      return selectedPath + datasetMapping[datasetName];
    }

    // If no mapping found, return the original path
    return selectedPath;
  };

  const handleFileExplorerSelect = (filePath: string, fieldId?: number) => {
    if (fieldId !== undefined) {
      // Update specific file field
      updateInputFileValue(fieldId, filePath);
    } else {
      // This will be used for other file fields like inputFileList, inputFileClasses, etc.
      console.log("File selected from explorer:", filePath);
    }
  };

  const handleDatasetImagesPathSelect = (filePath: string) => {
    // Apply automatic mapping for dataset images path
    const mappedPath = mapDatasetToImagePath(filePath);
    console.log(`Dataset path mapped: ${filePath} -> ${mappedPath}`);
    updateSettingField("datasetImagesPath", mappedPath);
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
          onChange={(e) => updateSettingField("inputType", e.target.value)}
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
                onChange={(e) => updateInputFileValue(file.id, e.target.value)}
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
            <FileExplorer
              fileExtensions={["txt", "csv", "json", "xml", "ini", "cfg"]}
              onFileSelect={(filePath) => handleFileExplorerSelect(filePath, file.id)}
            />
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
            <Button onClick={appendInputFile} size="small" startIcon={<AddCircleOutlineIcon />} variant="outlined">
              Add Input File
            </Button>
          </Tooltip>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <TextField
            fullWidth
            label="Image List File"
            onChange={(e) => updateSettingField("inputFileList", e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <TextSnippetIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={inputSettings.inputFileList}
          />
          <FileExplorer
            fileExtensions={["txt", "csv", "list"]}
            onFileSelect={(filePath) => {
              updateSettingField("inputFileList", filePath);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            fullWidth
            label="Input Classes File"
            onChange={(e) => updateSettingField("inputFileClasses", e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <TextSnippetIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={inputSettings.inputFileClasses}
          />
          <FileExplorer
            fileExtensions={["txt", "csv", "classes"]}
            onFileSelect={(filePath) => {
              updateSettingField("inputFileClasses", filePath);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            fullWidth
            label="Dataset Images Path"
            onChange={(e) => updateSettingField("datasetImagesPath", e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <TextSnippetIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={inputSettings.datasetImagesPath}
          />
          <FileExplorer allowDirectorySelection={true} fileExtensions={[]} onFileSelect={handleDatasetImagesPathSelect} />
        </Box>
      </Box>
    </Box>
  );
}
