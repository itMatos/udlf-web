import DownloadIcon from "@mui/icons-material/Download";
import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type React from "react";
import { useEffect, useMemo } from "react";
import { ConfigGenerator } from "@/services/configGenerator";
import {
  generateBFSTreeSettings,
  generateContextRRSettings,
  generateCorGraphSettings,
  generateCPRRSettings,
  generateLHRRSettings,
  generateRDPACSettings,
  generateReckNNGraphSettings,
  generateRFESettings,
  generateRKGraphSettings,
} from "@/services/configs-generator/ConfigMethodSettings";
import { evaluationSettingsConfig } from "@/services/templates/evaluationSettings";
import { baseConfigTemplate } from "@/services/templates/generalConfig";
import { inputDatasetFilesConfig } from "@/services/templates/inputDataSetFilesConfig";
import { outputFilesSettingsConfig } from "@/services/templates/outputFIlesSettingsConfig";
import { UDLF_METHODS } from "@/ts/constants/common";
import { OUTPUT_TYPES } from "@/ts/constants/output";
import type { BFSTree } from "@/ts/interfaces/methods/bfstree";
import type { ContextRR } from "@/ts/interfaces/methods/contextrr";
import type { CorGraph } from "@/ts/interfaces/methods/corgraph";
import type { CPRR } from "@/ts/interfaces/methods/cprr";
import type { LHRR } from "@/ts/interfaces/methods/lhrr";
import type { RDPAC } from "@/ts/interfaces/methods/rdpac";
import type { ReckNNGraph } from "@/ts/interfaces/methods/recknngraph";
import type { RFE } from "@/ts/interfaces/methods/rfe";
import type { RKGraph } from "@/ts/interfaces/methods/rkgraph";
import type { SummaryProps } from "@/ts/interfaces/summary";
import type { Method } from "@/ts/types/methods";
import { createBaseConfig, createEvaluationSettings, createInputSettings, createOutputSettings } from "@/utils/config-generator";
import { generateFileName, generateUniqueId, getFriendlyTitleInput } from "@/utils/helpers";

const Summary: React.FC<SummaryProps> = ({
  selectedMethod,
  methodSettings,
  inputSettings,
  outputSettings,
  evaluationSettings,
  setConfigFileToExecute,
  setConfigFileName,
}) => {
  const { configFileName } = useMemo(() => {
    const id = generateUniqueId();
    const name = generateFileName(selectedMethod, id);
    return { configFileId: id, configFileName: name };
  }, [selectedMethod]);

  const generateConfigFile = (fileName: string) => {
    const isFusion = Array.isArray(inputSettings?.inputFiles) && inputSettings.inputFiles.length > 1;
    const baseConfig = createBaseConfig(baseConfigTemplate, selectedMethod, isFusion);
    const inputSettingsTemplate = createInputSettings(inputSettings, inputDatasetFilesConfig);
    const outputSettingsTemplate = createOutputSettings(outputSettings, outputFilesSettingsConfig, fileName);
    const evaluationSettingsTemplate = createEvaluationSettings(evaluationSettings, evaluationSettingsConfig);

    const settingsTemplate = generateMethodSettings(selectedMethod);

    const methodSettingsTemplate = {
      section: `${selectedMethod.toUpperCase()} SETTINGS`,
      parameters: settingsTemplate
        ? Object.entries(settingsTemplate).map(([key, value]) => ({
            key,
            value,
          }))
        : [],
    };

    const allTemplates = [baseConfig, inputSettingsTemplate, outputSettingsTemplate, evaluationSettingsTemplate, methodSettingsTemplate];
    console.log("allTemplates", allTemplates);

    const generator = new ConfigGenerator(allTemplates);
    const blob = generator.generateFile();

    return blob;
  };

  const generateMethodSettings = (method: Method) => {
    switch (method) {
      case UDLF_METHODS.CONTEXTRR:
        return generateContextRRSettings(methodSettings as ContextRR);
      case UDLF_METHODS.CPRR:
        return generateCPRRSettings(methodSettings as CPRR);
      case UDLF_METHODS.LHRR:
        return generateLHRRSettings(methodSettings as LHRR);
      case UDLF_METHODS.BFSTREE:
        return generateBFSTreeSettings(methodSettings as BFSTree);
      case UDLF_METHODS.CORGRAPH:
        return generateCorGraphSettings(methodSettings as CorGraph);
      case UDLF_METHODS.RDPAC:
        return generateRDPACSettings(methodSettings as RDPAC);
      case UDLF_METHODS.RECKNNGRAPH:
        return generateReckNNGraphSettings(methodSettings as ReckNNGraph);
      case UDLF_METHODS.RFE:
        return generateRFESettings(methodSettings as RFE);
      case UDLF_METHODS.RKGRAPH:
        return generateRKGraphSettings(methodSettings as RKGraph);
      case UDLF_METHODS.RLSIM:
        return;
      default:
        return generateContextRRSettings(methodSettings as ContextRR);
    }
  };

  const generatedConfigFile = generateConfigFile(configFileName);

  const generateConfigFileToDownload = () => {
    console.log("generatedConfigFile", generatedConfigFile);
    // const url = window.URL.createObjectURL(generatedConfigFile);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = configFileName;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // window.URL.revokeObjectURL(url);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to set the config file to execute and the config file name
  useEffect(() => {
    setConfigFileToExecute(generatedConfigFile);
    setConfigFileName(configFileName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography gutterBottom variant="h5">
        Configuration Summary
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography color="primary" gutterBottom variant="h6">
          Selected Method: {selectedMethod}
        </Typography>
        {methodSettings && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="simple table" sx={{ minWidth: 300 }}>
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
                    <TableCell align="right">{typeof value === "boolean" ? (value ? "Yes" : "No") : value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography color="primary" gutterBottom variant="h6">
          Input
        </Typography>
        {inputSettings && (
          <List dense>
            {Object.entries(inputSettings).map(([key, value]) => {
              if (key === "inputFiles" && Array.isArray(value)) {
                return (
                  <ListItem key={key}>
                    <ListItemText
                      primary={getFriendlyTitleInput(key)}
                      secondary={
                        <Box>
                          {value.map((file, index) => {
                            const uniqueKey = `${file.replace(/[^a-zA-Z0-9]/g, "_")}_${index}`;
                            return (
                              <Typography key={uniqueKey} sx={{ display: "block", mb: 0.5 }} variant="body2">
                                {file}
                              </Typography>
                            );
                          })}
                        </Box>
                      }
                    />
                  </ListItem>
                );
              }

              return (
                <ListItem key={key}>
                  <ListItemText primary={getFriendlyTitleInput(key)} secondary={value} />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography color="primary" gutterBottom variant="h6">
          Output
        </Typography>

        {outputSettings.enabledOutput ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              File name:{" "}
              {outputSettings.outputFileName || (
                <Typography component={"span"} fontStyle={"oblique"}>
                  Default
                </Typography>
              )}
            </Typography>
            <Typography variant="body1">Format Type: {OUTPUT_TYPES.find((type) => type.value === outputSettings.outputFileFormat)?.label}</Typography>
          </Box>
        ) : (
          <Typography color="textSecondary" variant="body2">
            No output settings configured.
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography color="primary" gutterBottom variant="h6">
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
                  <Stack component={"span"} direction="row" flexWrap="wrap" spacing={1}>
                    {evaluationSettings.recall.map((value) => (
                      <Chip color="primary" component={"span"} key={value} label={value} size="small" variant="outlined" />
                    ))}
                  </Stack>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Precision Values"
                secondary={
                  <Stack component={"span"} direction="row" flexWrap="wrap" spacing={1}>
                    {evaluationSettings.precision.map((value) => (
                      <Chip color="primary" component={"span"} key={value} label={value} size="small" variant="outlined" />
                    ))}
                  </Stack>
                }
              />
            </ListItem>
          </List>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography color="textSecondary" variant="body2">
            Click the button below to generate the configuration file.
          </Typography>

          <Button color="primary" onClick={() => generateConfigFileToDownload()} startIcon={<DownloadIcon />} sx={{ mt: 2 }} variant="contained">
            Download Config File
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Summary;
