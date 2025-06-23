import React from "react";
import { RFE, RFESettingsProps } from "@/ts/interfaces/methods/rfe";
import { Box, FormControlLabel, Switch, TextField } from "@mui/material";

export default function RFESettings({ settings, setSettings }: RFESettingsProps) {
  const handleSettingChange = (field: keyof RFE) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: number | boolean | string = event.target.value;

    if (typeof settings[field] === "number") {
      value = Number(value);
      // TODO: Add validation for number fields if needed
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
    <React.Fragment>
      <Box sx={{ minWidth: 200, maxWidth: 200, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="L"
          label="L"
          type="number"
          value={settings.L}
          onChange={handleSettingChange("L")}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="K"
          label="K"
          type="number"
          value={settings.K}
          onChange={handleSettingChange("K")}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="T"
          label="T"
          type="number"
          value={settings.T}
          onChange={handleSettingChange("T")}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="PA"
          label="PA"
          type="number"
          value={settings.PA}
          onChange={handleSettingChange("PA")}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="TH_CC"
          label="TH_CC"
          type="number"
          value={settings.TH_CC}
          onChange={handleSettingChange("TH_CC")}
          variant="outlined"
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.RERANK_BY_EMB}
              onChange={handleSettingChange("RERANK_BY_EMB")}
              name="RERANK_BY_EMB"
              color="primary"
            />
          }
          labelPlacement="start"
          label="Rerank by Embedding"
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
            control={
              <Switch
                checked={settings.PERFORM_CCS}
                onChange={handleSettingChange("PERFORM_CCS")}
                name="PERFORM_CCS"
                color="primary"
              />
            }
            labelPlacement="start"
            label="Perform CCS"
          />
        </Box>

        <Box>
          {settings.PERFORM_CCS && (
            <TextField
              sx={{ maxWidth: 400 }}
              id="CCS_PATH"
              label="CCS Path"
              type="text"
              value={settings.CCS_PATH}
              onChange={handleSettingChange("CCS_PATH")}
              variant="outlined"
              fullWidth
            />
          )}
        </Box>

        <Box>
          <FormControlLabel
            sx={{ maxWidth: 200, minWidth: 200, display: "flex" }}
            control={
              <Switch
                checked={settings.EXPORT_EMBEDDINGS}
                onChange={handleSettingChange("EXPORT_EMBEDDINGS")}
                name="EXPORT_EMBEDDINGS"
                color="primary"
              />
            }
            labelPlacement="start"
            label="Export Embeddings"
          />
        </Box>

        <Box>
          {/* Mostra input para path caso seja ativado o export acima */}
          {settings.EXPORT_EMBEDDINGS && (
            <TextField
              sx={{ maxWidth: 400 }}
              id="EMBEDDINGS_PATH"
              label="Embeddings Path"
              type="text"
              value={settings.EMBEDDINGS_PATH}
              onChange={handleSettingChange("EMBEDDINGS_PATH")}
              variant="outlined"
              fullWidth
            />
          )}
        </Box>
        {/* </FormControl> */}
      </Box>
    </React.Fragment>
  );
}
