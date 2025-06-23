import { RLSIM_METRICS } from "@/ts/constants/methods/rlsim";
import { RLSim, RLSimSettingsProps } from "@/ts/interfaces/methods/rlsim";
import { Box, MenuItem, TextField } from "@mui/material";

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
    <Box sx={{ minWidth: 200, maxWidth: 200, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="TOPK"
        label="TOPK"
        type="number"
        value={settings.TOPK}
        onChange={handleSettingChange("TOPK")}
        variant="outlined"
      />
      <TextField
        id="CK"
        label="CK"
        type="number"
        value={settings.CK}
        onChange={handleSettingChange("CK")}
        variant="outlined"
      />
      <TextField
        id="T"
        label="T"
        type="number"
        value={settings.T}
        onChange={handleSettingChange("T")}
        variant="outlined"
      />
      <TextField
        id="METRIC"
        label="METRIC"
        select
        value={settings.METRIC}
        onChange={handleSettingChange("METRIC")}
        variant="outlined"
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
