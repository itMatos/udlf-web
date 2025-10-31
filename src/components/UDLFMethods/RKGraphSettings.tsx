import { Box, TextField } from "@mui/material";
import type { RKGraph, RkGraphSettingsProps } from "@/ts/types/methods/rkgraph";

export default function RKGraphSettings({ settings, setSettings }: RkGraphSettingsProps) {
  const handleSettingChange = (field: keyof RKGraph) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
      <TextField id="T" label="T" onChange={handleSettingChange("T")} type="number" value={settings.T} variant="outlined" />
      <TextField id="P" label="P" onChange={handleSettingChange("P")} type="number" value={settings.P} variant="outlined" />
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
    </Box>
  );
}
