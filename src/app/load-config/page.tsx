"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Appbar from "@/components/Appbar"; // Assumindo que você tem um componente Appbar

export default function UploadPage() {
  // Tipagem para selectedFile: pode ser um File (objeto de arquivo) ou null
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Tipagem para o ref do input de arquivo

  // Lida com a seleção do arquivo
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Verifica se há arquivos e pega o primeiro
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      console.log("Arquivo selecionado:", file.name);
    } else {
      setSelectedFile(null);
    }
  };

  // Aciona o input de arquivo quando o botão de upload é clicado
  const handleUploadButtonClick = () => {
    // Acessa o input nativo através da referência e simula o clique
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Simula a "execução" do arquivo (lê o conteúdo e exibe)
  const handleExecuteFile = () => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo primeiro para executar.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      // e.target.result é o conteúdo do arquivo, tipado como string para readAsText
      const fileContent = e.target?.result as string;
      console.log("Conteúdo do arquivo:", fileContent);
      // Aqui você adicionaria a lógica para enviar para um backend ou processar
    };

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      console.error("Erro ao ler o arquivo:", e);
      alert("Erro ao ler o arquivo.");
    };

    // Lê o arquivo como texto. TypeScript garante que selectedFile não é null aqui.
    reader.readAsText(selectedFile);
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
