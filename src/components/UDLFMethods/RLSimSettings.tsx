import { Box, MenuItem, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RLSIM_METRICS } from "@/ts/constants/methods-default-params/rlsim";
import type { RLSim, RLSimSettingsProps } from "@/ts/types/methods/rlsim";
import { RLSimSettingsConfig } from "@/services/templates/RLSimSettingsConfig";

export default function RLSimSettings({ settings, setSettings }: RLSimSettingsProps) {
  const handleSettingChange = (field: keyof RLSim) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: field === "METRIC" ? event.target.value : Number(event.target.value),
    };
    setSettings(newSettings);
  };

  const RLSimMetricsSorted = Object.values(RLSIM_METRICS).sort((a, b) => a.localeCompare(b));

  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="TOPK"
        label="TOPK"
        onChange={handleSettingChange("TOPK")}
        type="number"
        value={settings.TOPK}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RLSimSettingsConfig.parameters[0].description}>
                <IconButton size="small" aria-label="info TOPK">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="CK"
        label="CK"
        onChange={handleSettingChange("CK")}
        type="number"
        value={settings.CK}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RLSimSettingsConfig.parameters[1].description}>
                <IconButton size="small" aria-label="info CK">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="T"
        label="T"
        onChange={handleSettingChange("T")}
        type="number"
        value={settings.T}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RLSimSettingsConfig.parameters[2].description}>
                <IconButton size="small" aria-label="info T">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="METRIC"
        label="METRIC"
        onChange={handleSettingChange("METRIC")}
        select
        value={settings.METRIC}
        variant="outlined"
        SelectProps={{ IconComponent: () => null }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RLSimSettingsConfig.parameters[3].description}>
                <IconButton size="small" aria-label="info METRIC">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      >
        {RLSimMetricsSorted.map((metric) => (
          <MenuItem key={metric} value={metric}>
            {metric}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
