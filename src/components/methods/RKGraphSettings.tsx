import { RKGraph, RkGraphSettingsProps } from "@/ts/interfaces/methods/rkgraph";
import { Box, TextField } from "@mui/material";

export default function RKGraphSettings({ settings, setSettings }: RkGraphSettingsProps) {
  const handleSettingChange = (field: keyof RKGraph) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  return (
    <Box sx={{ minWidth: 200, maxWidth: 200, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="K"
        label="K"
        type="number"
        value={settings.K}
        onChange={handleSettingChange("K")}
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
        id="P"
        label="P"
        type="number"
        value={settings.P}
        onChange={handleSettingChange("P")}
        variant="outlined"
      />
      <TextField
        id="L"
        label="L"
        type="number"
        value={settings.L}
        onChange={handleSettingChange("L")}
        variant="outlined"
      />
    </Box>
  );
}
