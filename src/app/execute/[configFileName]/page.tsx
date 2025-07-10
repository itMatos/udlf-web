"use client";
import { Alert, Box, Button, Link, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { executeUDLF } from "@/services/api/UDLF-api";
import { ResponseApi } from "@/services/api/types";
import TerminalIcon from "@mui/icons-material/Terminal";
import Appbar from "@/components/Appbar";
import { useParams } from "next/navigation";

export default function ExecuteConfig() {
  const params = useParams();
  const configFileName = params?.configFileName || "";

  console.log("Config file name from search params:", configFileName);
  const [resultUdlf, setResultUdlf] = useState<ResponseApi | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);

  const handleShowSuccessMessage = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide after 3 seconds
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

  const resultFileName = "output_" + configFileName + ".txt";

  return (
    <Box>
      <Appbar />
      <Box sx={{ mb: 2 }}>
        {resultUdlf ? (
          <Box>
            <Box>
              <Link
                href={`/result/${resultFileName}`}
                underline="hover"
                color="primary"
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
              >
                <TerminalIcon sx={{ mr: 1 }} />
                View Execution Result
              </Link>
            </Box>
            <Typography variant="h4" gutterBottom>
              Execution Result
            </Typography>
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

            <p>
              <strong>Output:</strong> <pre>{resultUdlf.output}</pre>
            </p>
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
