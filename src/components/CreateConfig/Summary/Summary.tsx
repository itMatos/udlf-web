/** biome-ignore-all lint/suspicious/noExplicitAny: we need to use any to allow for dynamic typing */
import DownloadIcon from "@mui/icons-material/Download";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
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
import { useEffect, useMemo, useState } from "react";
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
  generateRLRecomSettings,
  generateRLSimSettings,
  type MethodSettingsResult,
} from "@/services/configs-generator/ConfigMethodSettings";
import { evaluationSettingsConfig } from "@/services/templates/evaluationSettings";
import { baseConfigTemplate } from "@/services/templates/generalConfig";
import { inputDatasetFilesConfig } from "@/services/templates/inputDataSetFilesConfig";
import { outputFilesSettingsConfig } from "@/services/templates/outputFIlesSettingsConfig";
import { UDLF_METHODS } from "@/ts/constants/common";
import { OUTPUT_TYPES } from "@/ts/constants/output";
import type { Method } from "@/ts/types/methods";
import type { BFSTree } from "@/ts/types/methods/bfstree";
import type { ContextRR } from "@/ts/types/methods/contextrr";
import type { CorGraph } from "@/ts/types/methods/corgraph";
import type { CPRR } from "@/ts/types/methods/cprr";
import type { LHRR } from "@/ts/types/methods/lhrr";
import type { RDPAC } from "@/ts/types/methods/rdpac";
import type { ReckNNGraph } from "@/ts/types/methods/recknngraph";
import type { RFE } from "@/ts/types/methods/rfe";
import type { RKGraph } from "@/ts/types/methods/rkgraph";
import type { RLRecom } from "@/ts/types/methods/rlrecom";
import type { RLSim } from "@/ts/types/methods/rlsim";
import type { SummaryProps } from "@/ts/types/summary";
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

  const generateConfigFile = async (fileName: string) => {
    const isFusion = Array.isArray(inputSettings?.inputFiles) && inputSettings.inputFiles.length > 1;
    const baseConfig = createBaseConfig(baseConfigTemplate, selectedMethod, isFusion);
    const { createdConfigSection: inputSettingsTemplate, datasetSize } = await createInputSettings(inputSettings, inputDatasetFilesConfig);
    const outputSettingsTemplate = createOutputSettings(outputSettings, outputFilesSettingsConfig, fileName);
    const evaluationSettingsTemplate = createEvaluationSettings(evaluationSettings, evaluationSettingsConfig);

    const methodSettingsResult = generateMethodSettings(selectedMethod, datasetSize);

    // Check for L parameter adjustments and show snackbar if needed
    const adjustments = methodSettingsResult.lAdjustments.filter((adj) => adj.wasAdjusted);
    if (adjustments.length > 0) {
      const adjustmentMessages = adjustments.map((adj) => `Parameter L adjusted from ${adj.originalValue} to ${adj.value} (dataset size: ${adj.datasetSize})`);
      setLAdjustmentMessage(adjustmentMessages.join("; "));
      setShowLAdjustmentSnackbar(true);

      // Apply adjustments to method settings for UI display
      const updatedMethodSettings = { ...methodSettings };
      for (const adj of adjustments) {
        if (adj.originalValue !== undefined && "L" in updatedMethodSettings) {
          // Specify the type instead of using 'any'
          (updatedMethodSettings as { [key: string]: typeof adj.value }).L = adj.value;
        }
      }
      setAdjustedMethodSettings(updatedMethodSettings);
    } else {
      // Reset adjusted settings if no adjustments were made
      setAdjustedMethodSettings(null);
    }

    const methodSettingsTemplate = {
      section: `${selectedMethod.toUpperCase()} SETTINGS`,
      parameters: Object.entries(methodSettingsResult.settings).map(([key, value]) => ({
        key,
        value,
      })),
    };

    const allTemplates = [baseConfig, inputSettingsTemplate, outputSettingsTemplate, evaluationSettingsTemplate, methodSettingsTemplate];
    console.log("allTemplates", allTemplates);

    const generator = new ConfigGenerator(allTemplates);
    const blob = generator.generateFile();

    return blob;
  };

  const generateMethodSettings = (method: Method, datasetSize = 1400): MethodSettingsResult => {
    switch (method) {
      case UDLF_METHODS.CONTEXTRR:
        return generateContextRRSettings(methodSettings as ContextRR, datasetSize);
      case UDLF_METHODS.CPRR:
        return generateCPRRSettings(methodSettings as CPRR, datasetSize);
      case UDLF_METHODS.LHRR:
        return generateLHRRSettings(methodSettings as LHRR, datasetSize);
      case UDLF_METHODS.BFSTREE:
        return generateBFSTreeSettings(methodSettings as BFSTree, datasetSize);
      case UDLF_METHODS.CORGRAPH:
        return generateCorGraphSettings(methodSettings as CorGraph, datasetSize);
      case UDLF_METHODS.RDPAC:
        return generateRDPACSettings(methodSettings as RDPAC, datasetSize);
      case UDLF_METHODS.RECKNNGRAPH:
        return generateReckNNGraphSettings(methodSettings as ReckNNGraph, datasetSize);
      case UDLF_METHODS.RFE:
        return generateRFESettings(methodSettings as RFE, datasetSize);
      case UDLF_METHODS.RKGRAPH:
        return generateRKGraphSettings(methodSettings as RKGraph, datasetSize);
      case UDLF_METHODS.RLSIM:
        return generateRLSimSettings(methodSettings as RLSim, datasetSize);
      case UDLF_METHODS.RLRECOM:
        return generateRLRecomSettings(methodSettings as RLRecom, datasetSize);
      default:
        return generateContextRRSettings(methodSettings as ContextRR, datasetSize);
    }
  };

  // biome-ignore lint/correctness/noUnusedVariables: we need to set the generated config file
  const [generatedConfigFile, setGeneratedConfigFile] = useState<Blob | null>(null);
  const [showLAdjustmentSnackbar, setShowLAdjustmentSnackbar] = useState<boolean>(false);
  const [lAdjustmentMessage, setLAdjustmentMessage] = useState<string>("");
  const [adjustedMethodSettings, setAdjustedMethodSettings] = useState<any>(null);

  const generateConfigFileToDownload = async () => {
    try {
      const configFile = await generateConfigFile(configFileName);
      console.log("generatedConfigFile", configFile);
      const url = window.URL.createObjectURL(configFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = configFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating config file:", error);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to set the config file to execute and the config file name
  useEffect(() => {
    const generateConfig = async () => {
      try {
        const configFile = await generateConfigFile(configFileName);
        setGeneratedConfigFile(configFile);
        setConfigFileToExecute(configFile);
        setConfigFileName(configFileName);
      } catch (error) {
        console.error("Error generating config file:", error);
      }
    };

    generateConfig();

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
        {(adjustedMethodSettings || methodSettings) && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="simple table" sx={{ minWidth: 300 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(adjustedMethodSettings || methodSettings).map(([key, value]) => {
                  const isAdjusted =
                    adjustedMethodSettings &&
                    key === "L" &&
                    "L" in adjustedMethodSettings &&
                    "L" in methodSettings &&
                    (adjustedMethodSettings as any).L !== (methodSettings as any).L;
                  return (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                        {isAdjusted && (
                          <Typography
                            sx={{
                              ml: 1,
                              color: "warning.main",
                              fontWeight: "bold",
                            }}
                            variant="caption"
                          >
                            (adjusted)
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">{typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}</TableCell>
                    </TableRow>
                  );
                })}
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
                        <Box component={"span"}>
                          {value.map((file, index) => {
                            const uniqueKey = `${file.replace(/[^a-zA-Z0-9]/g, "_")}_${index}`;
                            return (
                              <Box component={"span"} key={uniqueKey} sx={{ display: "block", mb: 0.5, fontSize: "0.875rem" }}>
                                {file}
                              </Box>
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
            <Typography variant="body1">File name: {outputSettings.outputFileName || <span style={{ fontStyle: "oblique" }}>Default</span>}</Typography>
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
                    {(evaluationSettings.recall as number[]).map((value: number) => (
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
                    {(evaluationSettings.precision as unknown as number[]).map((value: number) => (
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

      {/* Snackbar for L parameter adjustments */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => setShowLAdjustmentSnackbar(false)}
        open={showLAdjustmentSnackbar}
      >
        <Alert onClose={() => setShowLAdjustmentSnackbar(false)} severity="warning" sx={{ width: "100%" }} variant="filled">
          {lAdjustmentMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Summary;
