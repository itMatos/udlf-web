import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import type { RFE, RFESettingsProps } from "@/ts/types/methods/rfe";

export default function RFESettings({ settings, setSettings }: RFESettingsProps) {
  const handleSettingChange = (field: keyof RFE) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: number | boolean | string = event.target.value;

    // TODO: Add validation for number fields if needed
    if (typeof settings[field] === "number") {
      value = Number(value);
    } else if (typeof settings[field] === "boolean") {
      value = (event.target as HTMLInputElement).checked;
    }

    const newSettings: RFE = {
      ...settings,
      [field]: value,
    };
    setSettings(newSettings);
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField fullWidth id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
        <TextField fullWidth id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
        <TextField fullWidth id="T" label="T" onChange={handleSettingChange("T")} type="number" value={settings.T} variant="outlined" />
        <TextField fullWidth id="PA" label="PA" onChange={handleSettingChange("PA")} type="number" value={settings.PA} variant="outlined" />
        <TextField fullWidth id="TH_CC" label="TH_CC" onChange={handleSettingChange("TH_CC")} type="number" value={settings.TH_CC} variant="outlined" />
        <FormControlLabel
          control={<Switch checked={settings.RERANK_BY_EMB} color="primary" name="RERANK_BY_EMB" onChange={handleSettingChange("RERANK_BY_EMB")} />}
          label="Rerank by Embedding"
          labelPlacement="start"
        />
      </Box>
      <Box
        sx={{
          minWidth: 400,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            minWidth: 200,
            maxWidth: 200,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormControlLabel
            control={<Switch checked={settings.PERFORM_CCS} color="primary" name="PERFORM_CCS" onChange={handleSettingChange("PERFORM_CCS")} />}
            label="Perform CCS"
            labelPlacement="start"
          />
        </Box>

        <Box>
          {settings.PERFORM_CCS && (
            <TextField
              fullWidth
              id="CCS_PATH"
              label="CCS Path"
              onChange={handleSettingChange("CCS_PATH")}
              sx={{ maxWidth: 400 }}
              type="text"
              value={settings.CCS_PATH}
              variant="outlined"
            />
          )}
        </Box>

        <Box>
          <FormControlLabel
            control={
              <Switch checked={settings.EXPORT_EMBEDDINGS} color="primary" name="EXPORT_EMBEDDINGS" onChange={handleSettingChange("EXPORT_EMBEDDINGS")} />
            }
            label="Export Embeddings"
            labelPlacement="start"
            sx={{ maxWidth: 200, minWidth: 200, display: "flex" }}
          />
        </Box>

        <Box>
          {settings.EXPORT_EMBEDDINGS && (
            <TextField
              fullWidth
              id="EMBEDDINGS_PATH"
              label="Embeddings Path"
              onChange={handleSettingChange("EMBEDDINGS_PATH")}
              sx={{ maxWidth: 400 }}
              type="text"
              value={settings.EMBEDDINGS_PATH}
              variant="outlined"
            />
          )}
        </Box>
      </Box>
    </>
  );
}
