import { Box, MenuItem, TextField } from "@mui/material";
import type { BFSTree, BFSTreeSettingsProps } from "@/ts/types/methods/bfstree";

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
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
      <TextField id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
      <TextField id="Correlation" label="Correlation" onChange={handleSettingChange("Correlation")} select value={settings.Correlation} variant="outlined">
        <MenuItem value={settings.Correlation}>{settings.Correlation}</MenuItem>
      </TextField>
    </Box>
  );
}
