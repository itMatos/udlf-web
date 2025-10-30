import { Box, MenuItem, TextField } from "@mui/material";
import { RLSIM_METRICS } from "@/ts/constants/methods-default-params/rlsim";
import type { RLSim, RLSimSettingsProps } from "@/ts/types/methods/rlsim";

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
      <TextField id="TOPK" label="TOPK" onChange={handleSettingChange("TOPK")} type="number" value={settings.TOPK} variant="outlined" />
      <TextField id="CK" label="CK" onChange={handleSettingChange("CK")} type="number" value={settings.CK} variant="outlined" />
      <TextField id="T" label="T" onChange={handleSettingChange("T")} type="number" value={settings.T} variant="outlined" />
      <TextField id="METRIC" label="METRIC" onChange={handleSettingChange("METRIC")} select value={settings.METRIC} variant="outlined">
        {RLSimMetricsSorted.map((metric) => (
          <MenuItem key={metric} value={metric}>
            {metric}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
