import { RLRecom, RLRecomSettingsProps } from "@/ts/interfaces/methods/rlrecom";
import { Box, TextField } from "@mui/material";

export default function RLRecomSettings({ settings, setSettings }: RLRecomSettingsProps) {
  const handleSettingChange = (field: keyof RLRecom) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
        id="L"
        label="L"
        type="number"
        value={settings.L}
        onChange={handleSettingChange("L")}
        variant="outlined"
      />
      <TextField
        id="LAMBDA"
        label="LAMBDA"
        type="number"
        value={settings.LAMBDA}
        onChange={handleSettingChange("LAMBDA")}
        variant="outlined"
      />
      <TextField
        id="EPSILON"
        label="EPSILON"
        type="number"
        value={settings.EPSILON}
        onChange={handleSettingChange("EPSILON")}
        variant="outlined"
      />
    </Box>
  );
}
