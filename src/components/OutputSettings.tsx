import { OutputSettingsData } from "@/ts/interfaces";
import { Box, MenuItem, TextField } from "@mui/material";

interface OutputSettingsProps {
  onSettingsChange: (settings: OutputSettingsData | null) => void;
  settings: OutputSettingsData | null;
}

export default function OutputSettings({ onSettingsChange, settings }: OutputSettingsProps) {
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
          value={settings}
          onChange={(e) => onSettingsChange(e.target.value as unknown as OutputSettingsData)}
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
