"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Appbar from "@/components/Appbar";

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
      alert("Por favor, selecione um arquivo primeiro para executar.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const fileContent = e.target?.result as string;
      console.log("Conteúdo do arquivo:", fileContent);
    };

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      console.error("Erro ao ler o arquivo:", e);
      alert("Erro ao ler o arquivo.");
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
    <React.Fragment>
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
        <Typography variant="h5" component="h1" gutterBottom>
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
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

          <Button
            variant="contained"
            component="span"
            size="large"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadButtonClick}
            fullWidth
          >
            {selectedFile ? `File: ${selectedFile.name}` : "Select config file to upload"}
          </Button>

          {selectedFile && (
            <Typography variant="body2" color="text.secondary">
              Tamanho: {(selectedFile.size / 1024).toFixed(2)} KB
            </Typography>
          )}

          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={handleExecuteFile}
            disabled={!selectedFile}
            fullWidth
          >
            Executar Arquivo
          </Button>
        </Paper>
      </Box>
    </React.Fragment>
  );
}
