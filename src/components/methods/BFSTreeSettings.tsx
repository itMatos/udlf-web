import { BFSTree, BFSTreeSettingsProps } from "@/ts/interfaces/bfstree";
import { Box, TextField } from "@mui/material";

export default function BFSTreeSettings({ settings, setSettings }: BFSTreeSettingsProps) {
  const handleSettingChange = (field: keyof BFSTree) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  return (
    <Box sx={{ minWidth: 200, maxWidth: 200, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="L"
        label="L"
        type="number"
        value={settings.L}
        onChange={handleSettingChange("L")}
        variant="outlined"
      />
      <TextField
        id="K"
        label="K"
        type="number"
        value={settings.K}
        onChange={handleSettingChange("K")}
        variant="outlined"
      />
      <TextField
        id="Correlation"
        label="Correlation"
        type="text"
        value={settings.Correlation}
        onChange={handleSettingChange("Correlation")}
        variant="outlined"
      />
    </Box>
  );
}
