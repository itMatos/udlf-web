import { Box, TextField } from "@mui/material";
import type { RDPAC, RDPACSettingsProps } from "@/ts/interfaces/methods/rdpac";

export default function RDPACSettings({ settings, setSettings }: RDPACSettingsProps) {
  const handleSettingChange = (field: keyof RDPAC) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };
  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
      <TextField id="P" label="P" onChange={handleSettingChange("P")} type="number" value={settings.P} variant="outlined" />
      <TextField id="PL" label="PL" onChange={handleSettingChange("PL")} type="number" value={settings.PL} variant="outlined" />
      <TextField id="L_MULT" label="L_MULT" onChange={handleSettingChange("L_MULT")} type="number" value={settings.L_MULT} variant="outlined" />
      <TextField id="K_START" label="K_START" onChange={handleSettingChange("K_START")} type="number" value={settings.K_START} variant="outlined" />
      <TextField id="K_END" label="K_END" onChange={handleSettingChange("K_END")} type="number" value={settings.K_END} variant="outlined" />
      <TextField id="K_INC" label="K_INC" onChange={handleSettingChange("K_INC")} type="number" value={settings.K_INC} variant="outlined" />
    </Box>
  );
}
