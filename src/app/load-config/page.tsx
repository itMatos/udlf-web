"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Paper, Typography } from "@mui/material";
import { type ChangeEvent, useRef, useState } from "react";
import Appbar from "@/components/Appbar/Appbar";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      console.log("Arquivo selecionado:", file.name);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleExecuteFile = () => {
    if (!selectedFile) {
      alert("Please select a file to execute.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const fileContent = e.target?.result as string;
      console.log("File content:", fileContent);
    };

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      console.error("Error reading file:", e);
      alert("Error reading file.");
    };

    reader.readAsText(selectedFile);
    handleRedirectToExecute();
  };

  const handleRedirectToExecute = () => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo primeiro para executar.");
      return;
    }

    const fileName = selectedFile.name;
    console.log("Redirecionando para executar o arquivo:", fileName);
    window.location.href = `/execute/${fileName}`;
  };

  return (
    <>
      <Appbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          gap: 3,
          px: 2,
        }}
      >
        <Typography component="h1" gutterBottom variant="h5">
          Upload and run a file
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Input de arquivo oculto */}
          <input onChange={handleFileChange} ref={fileInputRef} style={{ display: "none" }} type="file" />

          <Button component="span" fullWidth onClick={handleUploadButtonClick} size="large" startIcon={<CloudUploadIcon />} variant="contained">
            {selectedFile ? `File: ${selectedFile.name}` : "Select config file to upload"}
          </Button>

          {selectedFile && (
            <Typography color="text.secondary" variant="body2">
              Size: {(selectedFile.size / 1024).toFixed(2)} KB
            </Typography>
          )}

          <Button color="success" disabled={!selectedFile} fullWidth onClick={handleExecuteFile} size="large" startIcon={<PlayArrowIcon />} variant="contained">
            Execute File
          </Button>
        </Paper>
      </Box>
    </>
  );
}
