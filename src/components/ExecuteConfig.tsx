import { Box } from "@mui/material";
import React, { useState } from "react";
import { executeUDLF } from "@/services/api/UDLF-api";
import { ResponseApi } from "@/services/api/types";

export default function ExecuteConfig({
  configFileToExecute,
  configFileName,
}: {
  configFileToExecute: Blob;
  configFileName: string;
}) {
  const [resultUdlf, setResultUdlf] = useState<ResponseApi | null>(null);

  const handleExecute = async () => {
    try {
      const result = (await executeUDLF(configFileToExecute, configFileName)) as ResponseApi;
      setResultUdlf(result);
      console.log("UDLF execution result:", result);
      console.log("Execution result:", result);
    } catch (error) {
      console.error("Error executing configuration:", error);
    }
  };

  console.log("Executing configuration with file:", configFileToExecute);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        {resultUdlf ? (
          <Box>
            <h3>Execution Result</h3>
            <p>
              <strong>Message:</strong> {resultUdlf.message}
            </p>
            <p>
              <strong>Error:</strong> {resultUdlf.error}
            </p>
            <p>
              <strong>Output:</strong> {resultUdlf.output}
            </p>
          </Box>
        ) : (
          <Box>
            <h3>Execute Configuration</h3>
            <button onClick={handleExecute}>Execute</button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
