import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";

export default function InputSettings() {
  const [inputType, setInputType] = useState("MATRIX");

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
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="MATRIX">Matrix</MenuItem>
          <MenuItem value="RK">Rank</MenuItem>
        </TextField>
        <TextField
          id="imageListFile"
          label="Image List File"
          //   type="file"
          type="text"
          variant="outlined"
        />
        <TextField
          id="inputClassesFile"
          label="Input Classes File"
          //   type="file"
          type="text"
          variant="outlined"
        />
        <TextField
          id="datasetImagesFile"
          label="Dataset Image File"
          //   type="file"
          type="text"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}
