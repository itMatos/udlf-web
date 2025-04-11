import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";

export default function OutputSettings() {
  const [outputType, setOutputType] = useState("rankedListNumeric");

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
          id="inputType"
          label="inputType"
          select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="rankedListNumeric">Ranked List (numeric)</MenuItem>
          <MenuItem value="rankedListString">Ranked List (string)</MenuItem>
          <MenuItem value="similarityMatrix">Similarity Matrix</MenuItem>
          <MenuItem value="distanceMatrix">Distance Matrix</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}
