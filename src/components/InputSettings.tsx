"use client";
import { useState } from "react";
import { Box, MenuItem, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { InputSettingsData } from "./../ts/interfaces";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DEFAULT_INPUT_SETTINGS } from "./../ts/constants";
// import FileOpenIcon from "@mui/icons-material/FileOpen";
import { InputType } from "@/ts/types";
// import { commonFilters, useFs } from "use-fs";

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

// type FileState = {
//   path: string;
//   content: string | null;
//   previousContent: string | null;
// };

export default function InputSettings({ onSettingsChange }: InputSettingsProps) {
  const [inputSettings, setInputSettings] = useState<InputSettingsData>(DEFAULT_INPUT_SETTINGS);
  const [errors, setErrors] = useState<Partial<Record<keyof InputSettingsData, string>>>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileContentToDisplay, setFileContentToDisplay] = useState("");
  const [currentSelectedFileName, setCurrentSelectedFileName] = useState("");
  // const [selectedFile, setSelectedFile] = useState<FileState>({
  //   path: "",
  //   content: null,
  //   previousContent: null,
  // });
  // const [fileHistory, setFileHistory] = useState<
  //   Array<{
  //     type: "added" | "removed";
  //     path: string;
  //     timestamp: number;
  //   }>
  // >([]);
  // const [isEditMode, setIsEditMode] = useState(false);
  // const [editableContent, setEditableContent] = useState("");
  // const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // const pathNameToShow = "/Users/italomatos/Documents/UDLF/Datasets/";

  // function to validate the input fields
  const validateField = (name: keyof InputSettingsData, value: string): string => {
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

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    onSettingsChange?.({
      ...inputSettings,
      [name]: value,
    });
  };

  // const { onDirectorySelection, onClear, files, isBrowserSupported, writeFile, setFiles } = useFs({
  //   filters: commonFilters,
  //   onFilesAdded: (newFiles, previousFiles) => {
  //     console.log("onFilesAdded", newFiles, previousFiles);
  //     const newEntries = Array.from(newFiles.keys()).map((path) => ({
  //       type: "added" as const,
  //       path,
  //       timestamp: Date.now(),
  //     }));
  //     setFileHistory((prev) => [...newEntries, ...prev].slice(0, 50));
  //   },
  //   onFilesChanged: (changedFiles, previousFiles) => {
  //     console.log("onFilesChanged", changedFiles, previousFiles);

  //     const changedFilesArray = Array.from(changedFiles);
  //     if (changedFilesArray.length > 0) {
  //       const [filePath, content] = changedFilesArray[0];
  //       const previousContent = previousFiles.get(filePath) || null;
  //       setSelectedFile({ path: filePath, content, previousContent });
  //     }
  //   },
  //   onFilesDeleted: (deletedFiles, previousFiles) => {
  //     console.log("onFilesDeleted", deletedFiles, previousFiles);
  //     if (deletedFiles.has(selectedFile.path)) {
  //       setSelectedFile({ path: "", content: null, previousContent: null });
  //     }
  //     const deletedEntries = Array.from(deletedFiles.keys()).map((path) => ({
  //       type: "removed" as const,
  //       path,
  //       timestamp: Date.now(),
  //     }));
  //     setFileHistory((prev) => [...deletedEntries, ...prev].slice(0, 50));
  //   },
  // });

  // const handleFileSelectFs = (path: string) => {
  //   const content = files.get(path) || null;
  //   setSelectedFile({
  //     path,
  //     content,
  //     previousContent: null,
  //   });
  // };

  // const handleFileSelect = async (fieldName: keyof InputSettingsData) => {
  //   onDirectorySelection();
  //   try {
  //     const input = document.createElement("input");
  //     input.type = "file";
  //     input.accept = ".txt,.csv";

  //     input.onchange = (e) => {
  //       const file = (e.target as HTMLInputElement).files?.[0];
  //       if (file) {
  //         handleChange(fieldName, file.name);

  //         const reader = new FileReader();
  //         reader.onload = (event) => {
  //           setFileContentToDisplay(event.target?.result as string);
  //           setCurrentSelectedFileName(file.name);
  //         };
  //         reader.readAsText(file);
  //       }
  //     };

  //     input.click();
  //   } catch (error) {
  //     console.error("Error selecting file:", error);
  //   }
  // };

  // const handleViewListFile = () => {
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFileContentToDisplay("");
    setCurrentSelectedFileName("");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxHeight: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };

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
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ gap: 2, display: "flex", flexDirection: "column", width: "100%" }}
      >
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label="Image List File"
            value={inputSettings.inputFileList}
            onChange={(e) => handleChange("inputFileList", e.target.value)}
            error={!!errors.inputFileList}
            helperText={errors.inputFileList}
            // slotProps={{
            //   input: {
            //     endAdornment: (
            //       <InputAdornment position="end">
            //         <IconButton onClick={() => handleFileSelect("inputFileList")} edge="end">
            //           <FolderOpenIcon />
            //         </IconButton>
            //       </InputAdornment>
            //     ),
            //   },
            // }}
            fullWidth
          />
          {/* {inputSettings.inputFileList && (
            <IconButton onClick={() => handleViewListFile()} aria-label="view image list file content" color="primary">
              <FileOpenIcon />
            </IconButton>
          )} */}
        </Box>

        <TextField
          label="Input Classes File"
          value={inputSettings.inputFileClasses}
          onChange={(e) => handleChange("inputFileClasses", e.target.value)}
          error={!!errors.inputFileClasses}
          helperText={errors.inputFileClasses}
          // slotProps={{
          //   input: {
          //     endAdornment: (
          //       <InputAdornment position="end">
          //         <IconButton onClick={() => handleFileSelect("inputFileClasses")} edge="end">
          //           <FolderOpenIcon />
          //         </IconButton>
          //       </InputAdornment>
          //     ),
          //   },
          // }}
        />

        <TextField
          label="Dataset Images Path"
          value={inputSettings.datasetImagesPath}
          onChange={(e) => handleChange("datasetImagesPath", e.target.value)}
          error={!!errors.datasetImagesPath}
          helperText={errors.datasetImagesPath || "Enter the path to dataset images"}
          // slotProps={{
          //   input: {
          //     endAdornment: (
          //       <InputAdornment position="end">
          //         <IconButton onClick={() => handleFileSelect("datasetImagesPath")} edge="end">
          //           <FolderOpenIcon />
          //         </IconButton>
          //       </InputAdornment>
          //     ),
          //   },
          // }}
        />

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="file-content-modal-title"
          aria-describedby="file-content-modal-description"
        >
          <Box sx={style}>
            <Typography id="file-content-modal-title" variant="h6" component="h2">
              Conteúdo do Arquivo: {currentSelectedFileName}
            </Typography>
            <Typography
              id="file-content-modal-description"
              sx={{ mt: 2, whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            >
              {fileContentToDisplay || "Nenhum conteúdo para exibir."}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
