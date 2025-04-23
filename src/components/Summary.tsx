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
} from "@mui/material";
import {
  CPRRMethodSettings,
  ContextRRMethodSettings,
  InputSettingsData,
  OutputSettingsData,
  EvaluationSettingsData,
} from "../ts/interfaces";
import { OUTPUT_TYPES } from "@/ts/constants";

interface SummaryProps {
  selectedMethod: string;
  methodSettings: CPRRMethodSettings | ContextRRMethodSettings | null;
  inputSettings: InputSettingsData | null;
  outputSettings: OutputSettingsData | null;
  evaluationSettings: EvaluationSettingsData | null;
}

const Summary: React.FC<SummaryProps> = ({
  selectedMethod,
  methodSettings,
  inputSettings,
  outputSettings,
  evaluationSettings,
}) => {
  const renderEvaluationSettings = () => {
    if (!evaluationSettings) return null;
    return (
      <>
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
      </>
    );
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
            {OUTPUT_TYPES.find(
              (type) => type.value === outputSettings.outputFormat
            )?.label || "Not specified"}
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
        <List dense>{renderEvaluationSettings()}</List>
      </Box>
    </Paper>
  );
};

export default Summary;
