import { OUTPUT_TYPES } from "@/ts/types";
import { OutputFormatType } from "@/ts/types";
import { Box, MenuItem, TextField } from "@mui/material";

interface OutputSettingsProps {
  onSettingsChange: (settings: OutputFormatType) => void;
  settings: OutputFormatType;
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
          label="Output format"
          select
          value={settings}
          onChange={(e) => {
            const selectedValue = e.target.value as OutputFormatType;
            onSettingsChange(selectedValue);
          }}
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
