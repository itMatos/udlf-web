import { Box, TextField } from "@mui/material";
import type { LHRR, LHRRSettingsProps } from "@/ts/interfaces/methods/lhrr";

export default function LHRRSettings({ settings, setSettings }: LHRRSettingsProps) {
  const handleSettingChange = (field: keyof LHRR) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings: LHRR = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };
  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
      <TextField id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
      <TextField id="T" label="T" onChange={handleSettingChange("T")} type="number" value={settings.T} variant="outlined" />
    </Box>
  );
}
