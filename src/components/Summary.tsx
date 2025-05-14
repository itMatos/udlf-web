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
import { evaluationSettingsConfig } from "@/services/templates/evaluationSettings";

interface SummaryProps {
  selectedMethod: string;
  methodSettings: ContextRRMethodSettings;
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
    const baseConfig = {
      ...baseConfigTemplate,
      parameters: baseConfigTemplate.parameters.map((param) => ({
        ...param,
        value:
          param.key === "UDL_METHOD"
            ? selectedMethod.toUpperCase()
            : param.value,
      })),
    };

    console.log("inputSettings", inputSettings);

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
      OUTPUT_FILE_FORMAT: outputSettings.includes("RANKEDLIST")
        ? "RK"
        : "MATRIX",
      OUTPUT_MATRIX_TYPE: outputSettings.includes("DISTANCE") ? "DIST" : "SIM",
      OUTPUT_RK_FORMAT: outputSettings.includes("NUMERIC") ? "NUM" : "STR",
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

    const recallArrayToString = evaluationSettings?.recall
      .map((value) => value.toString())
      .join(", ");
    const precisionArrayToString = evaluationSettings?.precision
      .map((value) => value.toString())
      .join(", ");

    const valueUpdatesEval = {
      EFFECTIVENESS_COMPUTE_MAP: evaluationSettings?.useMap ? "TRUE" : "FALSE",
      EFFECTIVENESS_RECALLS_TO_COMPUTE: evaluationSettings?.recall.length
        ? recallArrayToString
        : "1",
      EFFECTIVENESS_PRECISIONS_TO_COMPUTE: evaluationSettings?.precision.length
        ? precisionArrayToString
        : "1",
    };

    const evaluationSettingsTemplate = {
      section: "EVALUATION SETTINGS",
      parameters: evaluationSettingsConfig.parameters.map((param) => ({
        ...param,
        value:
          valueUpdatesEval[param.key as keyof typeof valueUpdatesEval] ??
          param.value,
      })),
    };

    const generateContextRRSettings = (methodSettings: ContextRRMethodSettings) => {
      const ContextRRValueUpdates = {
        PARAM_NONE_L: "1400",
        PARAM_CONTEXTRR_L: methodSettings?.L,
        PARAM_CONTEXTRR_K: methodSettings?.K,
        PARAM_CONTEXTRR_T: methodSettings?.T,
        PARAM_CONTEXTRR_NBYK: methodSettings?.NBYK,
        PARAM_CONTEXTRR_OPTIMIZATIONS: methodSettings?.OPTIMIZATIONS
          ? "TRUE"
          : "FALSE",
      };
      return ContextRRValueUpdates;
    }

    const generateCPRRSettings = (methodSettings: ContextRRMethodSettings) => {
      const CPRRValueUpdates = {
        PARAM_NONE_L: "1400",
        PARAM_CPRR_L: methodSettings?.L,
        PARAM_CPRR_K: methodSettings?.K,
        PARAM_CPRR_T: methodSettings?.T,
    }
    return CPRRValueUpdates;
  }

  console.log("methodSettings", methodSettings);

  const settingsTemplate = selectedMethod === "CPRR" ? generateCPRRSettings(methodSettings) : generateContextRRSettings(methodSettings);

    const methodSettingsTemplate = {
      section: `${selectedMethod.toUpperCase()} SETTINGS`,
      parameters: Object.entries(settingsTemplate).map(([key, value]) => ({
        key,
        value,
      })),
    };

    console.log("methodSettingsTemplate", methodSettingsTemplate);

    const allTemplates = [
      baseConfig,
      inputSettingsTemplate,
      outputSettingsTemplate,
      evaluationSettingsTemplate,
      methodSettingsTemplate,
    ];
    console.log("allTemplates", allTemplates);

    const generator = new ConfigGenerator(allTemplates);
    const blob = generator.generateFile();
    const fileNameToDownload = `${selectedMethod}_config.ini`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileNameToDownload;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
