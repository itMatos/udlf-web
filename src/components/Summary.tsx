import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import {
  CPRRMethodSettings,
  ContextRRMethodSettings,
  InputSettingsData,
  EvaluationSettingsData,
} from "../ts/interfaces";
import { OUTPUT_TYPES } from "@/ts/types";
import { OutputFormatType } from "@/ts/types";
import { baseConfigTemplate } from "@/services/templates/generalConfig";
import { inputDatasetFilesConfig } from "@/services/templates/inputDataSetFilesConfig";
import { ConfigGenerator } from "@/services/configGenerator";
import DownloadIcon from "@mui/icons-material/Download";
import { outputFilesSettingsConfig } from "@/services/templates/outputFIlesSettingsConfig";

interface SummaryProps {
  selectedMethod: string;
  methodSettings: CPRRMethodSettings | ContextRRMethodSettings | null;
  inputSettings: InputSettingsData | null;
  outputSettings: OutputFormatType;
  evaluationSettings: EvaluationSettingsData | null;
}

const Summary: React.FC<SummaryProps> = ({
  selectedMethod,
  methodSettings,
  inputSettings,
  outputSettings,
  evaluationSettings,
}) => {
  const generateConfigFile = () => {
    const templates = [
      {
        ...baseConfigTemplate,
        parameters: baseConfigTemplate.parameters.map((param) => ({
          ...param,
          value: param.key === "UDL_METHOD" ? selectedMethod : param.value,
        })),
      },
    ];
    console.log("inputSettings", inputSettings);
    console.log("Templates", templates);
    const valueUpdates = {
      INPUT_FILE_FORMAT: inputSettings?.inputType,
      INPUT_FILE_LIST: inputSettings?.imageListFile,
      INPUT_FILE_CLASSES: inputSettings?.inputClassesFile,
      INPUT_IMAGES_PATH: inputSettings?.datasetImagesPath,
    };

    const inputSettingsTemplate = {
      section: inputDatasetFilesConfig.section,
      parameters: inputDatasetFilesConfig.parameters.map((param) => ({
        ...param,
        value:
          valueUpdates[param.key as keyof typeof valueUpdates] ?? param.value,
      })),
    };
    console.log("inputSettingsTemplate", inputSettingsTemplate);

    const valueUpdatesOutput = {
      OUTPUT_FILE_FORMAT: outputSettings,
    };

    const outputSettingsTemplate = {
      section: "OUTPUT SETTINGS",
      parameters: outputFilesSettingsConfig.parameters.map((param) => ({
        ...param,
        value:
          valueUpdatesOutput[param.key as keyof typeof valueUpdatesOutput] ??
          param.value,
      })),
    };
    console.log("outputSettingsTemplate", outputSettingsTemplate);
    // const generator = new ConfigGenerator(templates);
    // const blob = generator.generateFile();

    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "config.ini";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // window.URL.revokeObjectURL(url);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Configuration Summary
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Selected Method: {selectedMethod}
        </Typography>
        {methodSettings && (
          <List dense>
            {Object.entries(methodSettings).map(([key, value]) => (
              <ListItem key={key}>
                <ListItemText
                  primary={key}
                  secondary={
                    typeof value === "boolean" ? (value ? "Yes" : "No") : value
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Input Configuration
        </Typography>
        {inputSettings && (
          <List dense>
            {Object.entries(inputSettings).map(([key, value]) => (
              <ListItem key={key}>
                <ListItemText primary={key} secondary={value} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Output Configuration
        </Typography>
        {outputSettings ? (
          <Typography variant="body1">
            Format Type:{" "}
            {OUTPUT_TYPES.find((type) => type.value === outputSettings)?.label}
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No output settings configured.
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h6" color="primary" gutterBottom>
          Evaluation Configuration
        </Typography>
        {evaluationSettings && (
          <List dense>
            <ListItem>
              <ListItemText
                primary="MAP"
                secondary={evaluationSettings.useMap ? "Yes" : "No"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Recall Values"
                secondary={
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {evaluationSettings.recall.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Precision Values"
                secondary={
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {evaluationSettings.precision.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                }
              />
            </ListItem>
          </List>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Click the button below to generate the configuration file.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={generateConfigFile}
            sx={{ mt: 2 }}
            startIcon={<DownloadIcon />}
          >
            Download Config File
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Summary;
