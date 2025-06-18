import React, { useEffect } from "react";
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { baseConfigTemplate } from "@/services/templates/generalConfig";
import { inputDatasetFilesConfig } from "@/services/templates/inputDataSetFilesConfig";
import { ConfigGenerator } from "@/services/configGenerator";
import DownloadIcon from "@mui/icons-material/Download";
import { outputFilesSettingsConfig } from "@/services/templates/outputFIlesSettingsConfig";
import { evaluationSettingsConfig } from "@/services/templates/evaluationSettings";
import { OUTPUT_TYPES } from "@/ts/constants/output";
import { CPRR } from "@/ts/interfaces/cprr";
import { ContextRR } from "@/ts/interfaces/contextrr";
import { SummaryProps } from "@/ts/interfaces/summary";

const Summary: React.FC<SummaryProps> = ({
  selectedMethod,
  methodSettings,
  inputSettings,
  outputSettings,
  evaluationSettings,
  setConfigFileToExecute,
  setConfigFileName,
}) => {
  const generateConfigFile = () => {
    const baseConfig = {
      ...baseConfigTemplate,
      parameters: baseConfigTemplate.parameters.map((param) => ({
        ...param,
        value: param.key === "UDL_METHOD" ? selectedMethod.toUpperCase() : param.value,
      })),
    };

    console.log("inputSettings", inputSettings);

    const valueUpdates = {
      INPUT_FILE_FORMAT: inputSettings?.inputType,
      INPUT_FILE_LIST: inputSettings?.inputFileList,
      INPUT_FILE_CLASSES: inputSettings?.inputFileClasses,
      INPUT_IMAGES_PATH: inputSettings?.datasetImagesPath,
    };

    const inputSettingsTemplate = {
      section: inputDatasetFilesConfig.section,
      parameters: inputDatasetFilesConfig.parameters.map((param) => ({
        ...param,
        value: valueUpdates[param.key as keyof typeof valueUpdates] ?? param.value,
      })),
    };

    const valueUpdatesOutput = {
      OUTPUT_FILE_PATH: outputSettings.outputFileName,
      OUTPUT_FILE: outputSettings.enabledOutput ? "TRUE" : "FALSE",
      OUTPUT_FILE_FORMAT: outputSettings.outputFileFormat.includes("RANKEDLIST") ? "RK" : "MATRIX",
      OUTPUT_MATRIX_TYPE: outputSettings.outputFileFormat.includes("DISTANCE") ? "DIST" : "SIM",
      OUTPUT_RK_FORMAT: outputSettings.outputFileFormat.includes("NUMERIC") ? "NUM" : "STR",
    };

    const outputSettingsTemplate = {
      section: "OUTPUT SETTINGS",
      parameters: outputFilesSettingsConfig.parameters.map((param) => ({
        ...param,
        value: valueUpdatesOutput[param.key as keyof typeof valueUpdatesOutput] ?? param.value,
      })),
    };

    const recallArrayToString = evaluationSettings?.recall.map((value) => value.toString()).join(", ");
    const precisionArrayToString = evaluationSettings?.precision.map((value) => value.toString()).join(", ");

    // TODO: tratar caso de recall e precision vazios

    const valueUpdatesEval = {
      EFFECTIVENESS_COMPUTE_MAP: evaluationSettings?.useMap ? "TRUE" : "FALSE",
      EFFICIENCY_EVAL: evaluationSettings?.useEfficiency ? "TRUE" : "FALSE",
      EFFECTIVENESS_RECALLS_TO_COMPUTE: evaluationSettings?.recall.length ? recallArrayToString : "1",
      EFFECTIVENESS_PRECISIONS_TO_COMPUTE: evaluationSettings?.precision.length ? precisionArrayToString : "1",
    };

    const evaluationSettingsTemplate = {
      section: "EVALUATION SETTINGS",
      parameters: evaluationSettingsConfig.parameters.map((param) => ({
        ...param,
        value: valueUpdatesEval[param.key as keyof typeof valueUpdatesEval] ?? param.value,
      })),
    };

    const settingsTemplate =
      selectedMethod === "ContextRR"
        ? generateContextRRSettings(methodSettings as ContextRR)
        : generateCPRRSettings(methodSettings as CPRR);

    const methodSettingsTemplate = {
      section: `${selectedMethod.toUpperCase()} SETTINGS`,
      parameters: Object.entries(settingsTemplate).map(([key, value]) => ({
        key,
        value,
      })),
    };

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

    return blob;
  };

  const generateContextRRSettings = (methodSettings: ContextRR) => {
    const ContextRRValueUpdates = {
      PARAM_NONE_L: "1400",
      PARAM_CONTEXTRR_L: methodSettings?.L,
      PARAM_CONTEXTRR_K: methodSettings?.K,
      PARAM_CONTEXTRR_T: methodSettings?.T,
      PARAM_CONTEXTRR_NBYK: methodSettings?.NBYK,
      PARAM_CONTEXTRR_OPTIMIZATIONS: methodSettings?.OPTIMIZATIONS ? "TRUE" : "FALSE",
    };
    return ContextRRValueUpdates;
  };

  const generateCPRRSettings = (methodSettings: CPRR) => {
    const CPRRValueUpdates = {
      PARAM_NONE_L: "1400",
      PARAM_CPRR_L: methodSettings?.L,
      PARAM_CPRR_K: methodSettings?.K,
      PARAM_CPRR_T: methodSettings?.T,
    };
    return CPRRValueUpdates;
  };

  const generateConfigFileToDownload = () => {
    const blob = generateConfigFile();
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

  useEffect(() => {
    const configFile = generateConfigFile();
    setConfigFileToExecute(configFile);
    setConfigFileName(`${selectedMethod}_config.ini`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(methodSettings).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell align="right">
                        {console.log("value", value)}
                        {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Input
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
          Output
        </Typography>

        {outputSettings.enabledOutput ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">File name: {outputSettings.outputFileName || "Not specified"}</Typography>
            <Typography variant="body1">
              Format Type: {OUTPUT_TYPES.find((type) => type.value === outputSettings.outputFileFormat)?.label}
            </Typography>
          </Box>
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
              <ListItemText primary="MAP" secondary={evaluationSettings.useMap ? "Yes" : "No"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Efficiency" secondary={evaluationSettings.useEfficiency ? "Yes" : "No"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Recall Values"
                secondary={
                  <Stack component={"span"} direction="row" spacing={1} flexWrap="wrap">
                    {evaluationSettings.recall.map((value) => (
                      <Chip
                        key={value}
                        component={"span"}
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
                  <Stack component={"span"} direction="row" spacing={1} flexWrap="wrap">
                    {evaluationSettings.precision.map((value) => (
                      <Chip
                        key={value}
                        component={"span"}
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
            onClick={() => generateConfigFileToDownload()}
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
