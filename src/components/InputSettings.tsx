"use client";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { InputSettingsData } from "./../ts/interfaces";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DEFAULT_INPUT_SETTINGS } from "./../ts/constants";

export interface InputSettingsProps {
  onSettingsChange: (settings: InputSettingsData | null) => void;
  settings: InputSettingsData | null;
}

const INPUT_TYPES = [
  {
    value: "AUTO",
    label: "Auto",
    description: "Use auto input format detection",
  },
  { value: "MATRIX", label: "Matrix", description: "Use matrix input format" },
  {
    value: "RK",
    label: "Ranked lists",
    description: "Use ranked lists input format",
  },
];

export default function InputSettings({
  onSettingsChange,
}: InputSettingsProps) {
  const [inputSettings, setInputSettings] = useState<InputSettingsData>(
    DEFAULT_INPUT_SETTINGS
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof InputSettingsData, string>>
  >({});

  // function to validate the input fields
  const validateField = (
    name: keyof InputSettingsData,
    value: string
  ): string => {
    if (!value) {
      return "This field is required";
    }

    if (name === "datasetImagesPath") {
      if (!value.startsWith("/")) {
        return "Path should start with '/'";
      }
    }

    return "";
  };

  // function to handle input changes
  const handleChange = (name: keyof InputSettingsData, value: string) => {
    const error = validateField(name, value);
    setInputSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("name handle change", name);
    console.log("value handle change", value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    onSettingsChange?.({
      ...inputSettings,
      [name]: value,
    });
  };

  const handleFileSelect = async (fieldName: keyof InputSettingsData) => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".txt,.csv";

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          handleChange(fieldName, file.name);
        }
      };

      input.click();
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

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
        <TextField
          select
          label="Input Type"
          value={inputSettings.inputType}
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
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{ ml: 1, fontSize: "16px", opacity: 0.7 }}
                  />
                </Box>
              </Tooltip>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Image List File"
          value={inputSettings.imageListFile}
          onChange={(e) => handleChange("imageListFile", e.target.value)}
          error={!!errors.imageListFile}
          helperText={errors.imageListFile}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleFileSelect("imageListFile")}
                    edge="end"
                  >
                    <FolderOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Input Classes File"
          value={inputSettings.inputClassesFile}
          onChange={(e) => handleChange("inputClassesFile", e.target.value)}
          error={!!errors.inputClassesFile}
          helperText={errors.inputClassesFile}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleFileSelect("inputClassesFile")}
                    edge="end"
                  >
                    <FolderOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Dataset Images Path"
          value={inputSettings.datasetImagesPath}
          onChange={(e) => handleChange("datasetImagesPath", e.target.value)}
          error={!!errors.datasetImagesPath}
          helperText={
            errors.datasetImagesPath || "Enter the path to dataset images"
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleFileSelect("datasetImagesPath")}
                    edge="end"
                  >
                    <FolderOpenIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
