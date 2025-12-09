import { Box, MenuItem, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { BFSTree, BFSTreeSettingsProps } from "@/ts/types/methods/bfstree";
import { BFSTreeSettingsConfig } from "@/services/templates/BFSTreeSettingsConfig";

export default function BFSTreeSettings({ settings, setSettings }: BFSTreeSettingsProps) {
  const handleSettingChange = (field: keyof BFSTree) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="L"
        label="L"
        onChange={handleSettingChange("L")}
        type="number"
        value={settings.L}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={BFSTreeSettingsConfig.parameters[0].description}>
                <IconButton size="small" aria-label="info L">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="K"
        label="K"
        onChange={handleSettingChange("K")}
        type="number"
        value={settings.K}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={BFSTreeSettingsConfig.parameters[1].description}>
                <IconButton size="small" aria-label="info K">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="Correlation"
        label="Correlation"
        onChange={handleSettingChange("Correlation")}
        select
        value={settings.Correlation}
        variant="outlined"
        SelectProps={{ IconComponent: () => null }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={BFSTreeSettingsConfig.parameters[2].description}>
                <IconButton size="small" aria-label="info Correlation">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      >
        <MenuItem value={settings.Correlation}>{settings.Correlation}</MenuItem>
      </TextField>
    </Box>
  );
}
