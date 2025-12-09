import { Box, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { RDPAC, RDPACSettingsProps } from "@/ts/types/methods/rdpac";
import { RDPACSettingsConfig } from "@/services/templates/RDPACSettingsConfig";

export default function RDPACSettings({ settings, setSettings }: RDPACSettingsProps) {
  const handleSettingChange = (field: keyof RDPAC) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
              <Tooltip title={RDPACSettingsConfig.parameters[0].description}>
                <IconButton size="small" aria-label="info L">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="P"
        label="P"
        onChange={handleSettingChange("P")}
        type="number"
        value={settings.P}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RDPACSettingsConfig.parameters[1].description}>
                <IconButton size="small" aria-label="info P">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="PL"
        label="PL"
        onChange={handleSettingChange("PL")}
        type="number"
        value={settings.PL}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RDPACSettingsConfig.parameters[2].description}>
                <IconButton size="small" aria-label="info PL">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="L_MULT"
        label="L_MULT"
        onChange={handleSettingChange("L_MULT")}
        type="number"
        value={settings.L_MULT}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RDPACSettingsConfig.parameters[3].description}>
                <IconButton size="small" aria-label="info L_MULT">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="K_START"
        label="K_START"
        onChange={handleSettingChange("K_START")}
        type="number"
        value={settings.K_START}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RDPACSettingsConfig.parameters[4].description}>
                <IconButton size="small" aria-label="info K_START">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="K_END"
        label="K_END"
        onChange={handleSettingChange("K_END")}
        type="number"
        value={settings.K_END}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RDPACSettingsConfig.parameters[5].description}>
                <IconButton size="small" aria-label="info K_END">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="K_INC"
        label="K_INC"
        onChange={handleSettingChange("K_INC")}
        type="number"
        value={settings.K_INC}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RDPACSettingsConfig.parameters[6].description}>
                <IconButton size="small" aria-label="info K_INC">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
