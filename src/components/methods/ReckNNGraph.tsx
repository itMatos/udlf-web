import { Box, TextField } from "@mui/material";
import type { ReckNNGraph, ReckNNGraphSettingsProps } from "@/ts/interfaces/methods/recknngraph";

export default function ReckNNGraphSettings({ settings, setSettings }: ReckNNGraphSettingsProps) {
  const handleSettingChange = (field: keyof ReckNNGraph) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
      <TextField id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
      <TextField id="EPSILON" label="EPSILON" onChange={handleSettingChange("EPSILON")} type="number" value={settings.EPSILON} variant="outlined" />
    </Box>
  );
}
