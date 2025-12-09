import { Box, FormControlLabel, Switch, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { RFE, RFESettingsProps } from "@/ts/types/methods/rfe";
import { RFESettingsConfig } from "@/services/templates/RFESettingsConfig";

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
        <TextField
          fullWidth
          id="L"
          label="L"
          onChange={handleSettingChange("L")}
          type="number"
          value={settings.L}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={RFESettingsConfig.parameters[2].description}>
                  <IconButton size="small" aria-label="info L">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="K"
          label="K"
          onChange={handleSettingChange("K")}
          type="number"
          value={settings.K}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={RFESettingsConfig.parameters[0]?.description}>
                  <IconButton size="small" aria-label="info K">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="T"
          label="T"
          onChange={handleSettingChange("T")}
          type="number"
          value={settings.T}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={RFESettingsConfig.parameters[1].description}>
                  <IconButton size="small" aria-label="info T">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="PA"
          label="PA"
          onChange={handleSettingChange("PA")}
          type="number"
          value={settings.PA}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={RFESettingsConfig.parameters[3].description}>
                  <IconButton size="small" aria-label="info PA">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="TH_CC"
          label="TH_CC"
          onChange={handleSettingChange("TH_CC")}
          type="number"
          value={settings.TH_CC}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={RFESettingsConfig.parameters[4].description}>
                  <IconButton size="small" aria-label="info TH_CC">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={RFESettingsConfig.parameters[5].description}>
            <IconButton size="small" aria-label="info RERANK_BY_EMB">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <FormControlLabel
            control={<Switch checked={settings.RERANK_BY_EMB} color="primary" name="RERANK_BY_EMB" onChange={handleSettingChange("RERANK_BY_EMB")} />}
            label="Rerank by Embedding"
            labelPlacement="start"
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={RFESettingsConfig.parameters[6].description}>
            <IconButton size="small" aria-label="info PERFORM_CCS">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <FormControlLabel
            control={<Switch checked={settings.PERFORM_CCS} color="primary" name="PERFORM_CCS" onChange={handleSettingChange("PERFORM_CCS")} />}
            label="Perform CCS"
            labelPlacement="start"
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={RFESettingsConfig.parameters[7].description}>
            <IconButton size="small" aria-label="info EXPORT_EMBEDDINGS">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <FormControlLabel
            control={
              <Switch checked={settings.EXPORT_EMBEDDINGS} color="primary" name="EXPORT_EMBEDDINGS" onChange={handleSettingChange("EXPORT_EMBEDDINGS")} />
            }
            label="Export Embeddings"
            labelPlacement="start"
          />
        </Box>
      </Box>
    </>
  );
}
