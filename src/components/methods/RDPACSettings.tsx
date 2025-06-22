import { RDPAC, RDPACSettingsProps } from "@/ts/interfaces/methods/rdpac";
import { Box, TextField } from "@mui/material";

export default function RDPACSettings({ settings, setSettings }: RDPACSettingsProps) {
  const handleSettingChange = (field: keyof RDPAC) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
        id="P"
        label="P"
        type="number"
        value={settings.P}
        onChange={handleSettingChange("P")}
        variant="outlined"
      />
      <TextField
        id="PL"
        label="PL"
        type="number"
        value={settings.PL}
        onChange={handleSettingChange("PL")}
        variant="outlined"
      />
      <TextField
        id="L_MULT"
        label="L_MULT"
        type="number"
        value={settings.L_MULT}
        onChange={handleSettingChange("L_MULT")}
        variant="outlined"
      />
      <TextField
        id="K_START"
        label="K_START"
        type="number"
        value={settings.K_START}
        onChange={handleSettingChange("K_START")}
        variant="outlined"
      />
      <TextField
        id="K_END"
        label="K_END"
        type="number"
        value={settings.K_END}
        onChange={handleSettingChange("K_END")}
        variant="outlined"
      />
      <TextField
        id="K_INC"
        label="K_INC"
        type="number"
        value={settings.K_INC}
        onChange={handleSettingChange("K_INC")}
        variant="outlined"
      />
    </Box>
  );
}
