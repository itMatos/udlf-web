"use client";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { downloadLogFile, downloadOutputFile, executeUDLF } from "@/services/api/UDLF-api";
import { ResponseApi } from "@/services/api/types";
import TerminalIcon from "@mui/icons-material/Terminal";
import Appbar from "@/components/Appbar";
import { useParams, useRouter } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function ExecuteConfig() {
  const params = useParams();
  const router = useRouter();
  const configFileName: string = Array.isArray(params?.configFileName) ? params?.configFileName[0] || "" : params?.configFileName || "";

  console.log("Config file name from search params:", configFileName);
  const [resultUdlf, setResultUdlf] = useState<ResponseApi | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);

  const handleShowSuccessMessage = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleShowWarningMessage = () => {
    setShowWarningMessage(true);
    setTimeout(() => {
      setShowWarningMessage(false);
    }, 10000);
  };

  const initExecution = () => {
    setIsLoading(true);
    handleExecute();
  };

  const handleExecute = async () => {
    try {
      if (!configFileName || (Array.isArray(configFileName) && configFileName.length === 0)) {
        console.error("Configuration file name is not provided.");
        return;
      }
      console.log("Executing configuration file:", configFileName);
      const fileName = configFileName.toString(); // Ensure it's a string
      const result = (await executeUDLF(fileName)) as ResponseApi;
      setResultUdlf(result);
      console.log("UDLF execution result:", result);
      console.log("Execution result:", result);
      handleShowSuccessMessage();
      if (result.error) {
        console.warn("Execution error:", result.error);
        handleShowWarningMessage();
      }
    } catch (error) {
      console.error("Error executing configuration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDownloadOutputFile = async () => {
    if (!resultUdlf || !resultUdlf.output) {
      console.error("No output available to download.");
      return;
    }

    try {
      const response = await downloadOutputFile(configFileName);
      console.log("Download response:", response);
    } catch (error) {
      console.error("Error downloading output file:", error);
    }
  };

  const onClickDownloadLogFile = async () => {
    if (!configFileName) {
      console.error("No configuration file name provided for downloading log file.");
      return;
    }

    try {
      const response = await downloadLogFile(configFileName);
      console.log("Log file download response:", response);
    } catch (error) {
      console.error("Error downloading log file:", error);
    }
  };

  const resultFileName = "output_" + configFileName + ".txt";

  return (
    <Box>
      <Appbar />
      <Box sx={{ p: 2 }}>
        {resultUdlf ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: 2,
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={onClickDownloadOutputFile} startIcon={<FileDownloadIcon />}>
                Output file
              </Button>

              <Button variant="outlined" onClick={onClickDownloadLogFile} startIcon={<FileDownloadIcon />}>
                Log File
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => router.replace(`/result/${resultFileName}`)}
                sx={{ width: "auto", my: 2 }}
              >
                View Execution Result
              </Button>
            </Box>
            <Typography variant="h5">Log: {configFileName}</Typography>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={showSuccessMessage}
              autoHideDuration={3000}
              message={resultUdlf.message || "Execution completed successfully!"}
            >
              <Alert severity="success" sx={{ width: "100%" }} variant="filled">
                {resultUdlf.message || "Execution completed successfully!"}
              </Alert>
            </Snackbar>

            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={showWarningMessage}
              message={resultUdlf.error || "Execution completed with warnings!"}
            >
              <Alert severity="warning" sx={{ width: "100%" }}>
                <pre>{resultUdlf.error || "Execution completed successfully!"}</pre>
              </Alert>
            </Snackbar>

            <pre>{resultUdlf.output}</pre>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "20px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Execute File: {configFileName}
            </Typography>
            <Button
              variant="contained"
              startIcon={<TerminalIcon />}
              onClick={initExecution}
              loading={isLoading}
              loadingPosition="start"
              disabled={isLoading || !configFileName}
              sx={{ width: "200px", marginTop: "20px" }}
            >
              {isLoading ? "Executing..." : "Run"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
