import { OUTPUT_TYPES } from "@/ts/constants";
import { OutputSettingsData } from "@/ts/interfaces";
import { Box, MenuItem, TextField } from "@mui/material";

interface OutputSettingsProps {
  onSettingsChange: (settings: OutputSettingsData | null) => void;
  settings: OutputSettingsData | null;
}

export default function OutputSettings({
  onSettingsChange,
  settings,
}: OutputSettingsProps) {
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
          onChange={(e) =>
            onSettingsChange(e.target.value as unknown as OutputSettingsData)
          }
          variant="outlined"
        >
          {OUTPUT_TYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
