"use client";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CloseIcon from "@mui/icons-material/Close";
import TerminalIcon from "@mui/icons-material/Terminal";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  type SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useParams, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import Appbar from "@/components/Appbar/Appbar";
import config from "@/services/api/config";
import type { lineContent } from "@/services/api/models";
import { getAllClasses, getAllFilenames, getLogFileContent, getPaginatedListFilenames, getPaginatedListFilenamesByConfig } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";

export default function Result() {
  const params = useParams();
  const router = useRouter();
  let outputname = params?.outputname || "";
  if (Array.isArray(outputname)) {
    outputname = outputname[0] || "";
  }

  // Extract config file name from output name
  // e.g., "output_ContextRR_3m172i0.ini.txt" -> "ContextRR_3m172i0.ini"
  const getConfigFileName = (outputName: string): string => {
    // Remove "output_" prefix and ".txt" suffix
    const withoutPrefix = outputName.replace(/^output_/, "");
    const withoutSuffix = withoutPrefix.replace(/\.txt$/, "");
    return withoutSuffix;
  };

  const configFileName = getConfigFileName(outputname);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(IMAGES_PER_PAGE_DEFAULT);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [imagesCurrentPage, setImagesCurrentPage] = useState<lineContent[]>([]);
  const [aspectRatio, setAspectRatio] = useState<"original" | "square">("square");
  const [inputImageNames, setInputImageNames] = useState<string[]>([]);

  // Log dialog states
  const [logDialogOpen, setLogDialogOpen] = useState<boolean>(false);
  const [logContent, setLogContent] = useState<string>("");
  const [logLoading, setLogLoading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);

  // Evaluation data states
  const [evaluationData, setEvaluationData] = useState<{
    before: { [key: string]: number };
    after: { [key: string]: number };
    relativeGains: { [key: string]: number };
  } | null>(null);

  useEffect(() => {
    const fetchImageNames = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        console.log("Fetching image names for output:", outputname);

        // Use the config-specific route for better performance
        console.log("configFileName:", configFileName);
        const imageName = await getPaginatedListFilenamesByConfig(configFileName, page, pageSize);

        setTotalPages(imageName.totalPages);
        setImagesCurrentPage(imageName.items);
        console.log("Fetched image names:", imageName.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error fetching image names for output ${outputname}:`, error);
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : "Failed to load results");
      } finally {
        setIsLoading(false);
      }
    };
    fetchImageNames();
  }, [outputname, page, pageSize, configFileName]);

  useEffect(() => {
    const fetchInputImageNames = async () => {
      try {
        const inputNames = await getAllFilenames(outputname, configFileName);
        setInputImageNames(inputNames);
        console.log("Fetched input image names:", inputNames);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error fetching input image names for output ${outputname}:`, error);
      }
    };
    fetchInputImageNames();
  }, [outputname, configFileName]);

  useEffect(() => {
    const getAllClassesForOutput = async () => {
      console.log("Fetching classes for output:", outputname);
      try {
        const classes = await getAllClasses(outputname, configFileName);
        console.log("Fetched classes for output:", classes);
      } catch (error) {
        console.error(`Error fetching classes for output ${outputname}:`, error);
      }
    };
    getAllClassesForOutput();
  }, [outputname, configFileName]);

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const newPageSize = Number.parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAspectRatioChange = (event: SelectChangeEvent) => {
    setAspectRatio(event.target.value as "original" | "square");
  };

  const handleOpenLogDialog = async () => {
    setLogDialogOpen(true);
    setLogLoading(true);
    try {
      const content = await getLogFileContent(configFileName);
      setLogContent(content);
      parseEvaluationData(content);
    } catch (error) {
      console.error("Error fetching log content:", error);
      setLogContent("Error loading log file. Please try again later.");
    } finally {
      setLogLoading(false);
    }
  };

  const handleCloseLogDialog = () => {
    setLogDialogOpen(false);
    setLogContent("");
    setEvaluationData(null);
    setTabValue(0);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const parseEvaluationData = (logContent: string) => {
    try {
      const lines = logContent.split("\n");
      let beforeSection = false;
      let afterSection = false;
      let relativeGainsSection = false;

      const before: { [key: string]: number } = {};
      const after: { [key: string]: number } = {};
      const relativeGains: { [key: string]: number } = {};

      for (const line of lines) {
        const trimmedLine = line.trim();

        // Identify sections
        if (trimmedLine === "Before:") {
          beforeSection = true;
          afterSection = false;
          relativeGainsSection = false;
          continue;
        }
        if (trimmedLine === "After:") {
          beforeSection = false;
          afterSection = true;
          relativeGainsSection = false;
          continue;
        }
        if (trimmedLine === "Relative Gains:") {
          beforeSection = false;
          afterSection = false;
          relativeGainsSection = true;
          continue;
        }

        // Parse data lines
        const match = trimmedLine.match(/^(P@\d+|Recall@\d+|MAP)\s+(-?\d+\.\d+)(%?)$/);
        if (match) {
          const [, metric, value, isPercent] = match;
          const numValue = Number.parseFloat(value);

          if (beforeSection) {
            before[metric] = numValue;
          } else if (afterSection) {
            after[metric] = numValue;
          } else if (relativeGainsSection) {
            relativeGains[metric] = numValue;
          }
        }
      }

      if (Object.keys(before).length > 0 || Object.keys(after).length > 0 || Object.keys(relativeGains).length > 0) {
        setEvaluationData({ before, after, relativeGains });
      }
    } catch (error) {
      console.error("Error parsing evaluation data:", error);
    }
  };

  const renderEffectivenessChart = () => {
    if (!evaluationData || !(Object.keys(evaluationData.before).length || Object.keys(evaluationData.after).length)) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
          <Typography variant="body1">No effectiveness data available for visualization</Typography>
        </Box>
      );
    }

    const allMetrics = Object.keys(evaluationData.before);

    // Separate P@N and Recall@N metrics
    const pMetrics = allMetrics.filter((metric) => metric.startsWith("P@"));
    const recallMetrics = allMetrics.filter((metric) => metric.startsWith("Recall@"));
    const mapMetrics = allMetrics.filter((metric) => metric === "MAP");

    const renderChart = (metrics: string[], title: string, containerHeight = 400) => {
      if (metrics.length === 0) return null;

      const beforeData = metrics.map((metric) => evaluationData.before[metric] || 0);
      const afterData = metrics.map((metric) => evaluationData.after[metric] || 0);

      return (
        <Box sx={{ height: containerHeight, p: 2, mb: 3 }}>
          <Typography sx={{ mb: 2, textAlign: "center" }} variant="h6">
            {title}
          </Typography>
          <BarChart
            height={containerHeight - 80}
            margin={{ top: 20, bottom: 80, left: 60, right: 20 }}
            series={[
              { data: beforeData, label: "Before", id: `before-${title}`, color: "#1976d2" },
              { data: afterData, label: "After", id: `after-${title}`, color: "#42a5f5" },
            ]}
            width={800}
            xAxis={[{ data: metrics, scaleType: "band" }]}
          />
        </Box>
      );
    };

    return (
      <Box sx={{ p: 2, overflow: "auto" }}>
        <Typography sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }} variant="h5">
          Effectiveness: Before vs After
        </Typography>

        {/* Precision Charts */}
        {renderChart(pMetrics, "Precision Metrics (P@N)", 400)}

        {/* Recall Charts */}
        {renderChart(recallMetrics, "Recall Metrics (Recall@N)", 400)}

        {/* MAP Chart */}
        {renderChart(mapMetrics, "Mean Average Precision (MAP)", 300)}
      </Box>
    );
  };

  const renderRelativeGainsChart = () => {
    if (!(evaluationData && Object.keys(evaluationData.relativeGains).length)) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
          <Typography variant="body1">No relative gains data available for visualization</Typography>
        </Box>
      );
    }

    const metrics = Object.keys(evaluationData.relativeGains);
    const gainsData = metrics.map((metric) => evaluationData.relativeGains[metric]);

    return (
      <Box sx={{ height: 400, p: 2 }}>
        <Typography sx={{ mb: 2, textAlign: "center" }} variant="h6">
          Relative Gains (%)
        </Typography>
        <BarChart
          height={350}
          margin={{ top: 20, bottom: 100, left: 60, right: 20 }}
          series={[
            {
              data: gainsData,
              label: "Relative Gains (%)",
              id: "gains",
              color: "#4caf50",
            },
          ]}
          width={800}
          xAxis={[{ data: metrics, scaleType: "band" }]}
        />
      </Box>
    );
  };

  return (
    <Box>
      <Appbar />
      <Box sx={{ mb: 4, mx: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Typography variant="h6">
            Results for:
            <Typography component="span" style={{ fontWeight: "bold" }} variant="h6">
              {` ${outputname}`}
            </Typography>
            <Typography component="div" style={{ fontWeight: "normal" }} variant="h6">
              Select or search an input image to view similar images.
            </Typography>
          </Typography>

          <Button onClick={handleOpenLogDialog} startIcon={<TerminalIcon />} sx={{ minWidth: "auto", flexShrink: 0 }} variant="outlined">
            View Log
          </Button>
        </Box>

        <Box sx={{ my: 2, mx: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
            <Autocomplete
              onChange={(_event, value) => {
                if (value) {
                  router.push(`/result/${outputname}/${value}`);
                }
              }}
              options={inputImageNames}
              renderInput={(params) => <TextField {...params} label="Search input file..." />}
              sx={{ width: 300, mr: 2 }}
            />
          </Box>

          <Box sx={{ my: 2, mx: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Typography sx={{ mr: 2 }} variant="body1">
              Aspect Ratio:
            </Typography>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={handleAspectRatioChange}
              sx={{
                width: 150,
              }}
              value={aspectRatio}
            >
              <MenuItem value="original">Original</MenuItem>
              <MenuItem value="square">1:1</MenuItem>
            </Select>
          </Box>
        </Box>

        {isLoading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
              gap: 2,
            }}
          >
            <CircularProgress size={40} />
            <Typography color="primary" variant="h6">
              Loading Results...
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Please wait while we fetch your results
            </Typography>
            <LinearProgress sx={{ width: "100%", mt: 2 }} />
          </Box>
        )}

        {isError && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
              gap: 2,
              backgroundColor: "error.light",
              borderRadius: 2,
              mx: 2,
            }}
          >
            <Typography color="error" variant="h6">
              Error Loading Results
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {errorMessage}
            </Typography>
            <Button color="primary" onClick={() => window.location.reload()} variant="contained">
              Try Again
            </Button>
          </Box>
        )}

        {!(isLoading || isError) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {imagesCurrentPage.map((image) => {
              const imageName = image.fileInputNameLine;
              return (
                <Card
                  key={image.fileInputNameLine}
                  onClick={() => router.push(`/result/${outputname}/${imageName}`)}
                  sx={{ p: 1, m: 2, width: 150, cursor: "pointer" }}
                >
                  <CardHeader subheader={`${imageName}`} />
                  <CardMedia
                    alt={`${imageName}`}
                    component="img"
                    image={`${config.udlfApi}/image-file/${imageName}?configFile=${configFileName}`}
                    sx={{
                      ...(aspectRatio === "square" && {
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        height: 150,
                      }),
                    }}
                  />
                </Card>
              );
            })}
          </Box>
        )}

        {/* Pagination and Page Size Selector */}
        {!(isLoading || isError) && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, mb: 2, gap: 2 }}>
            <Pagination color="primary" count={totalPages} onChange={handlePageChange} page={page} />
            <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="page-size-select-label">Items per page</InputLabel>
              <Select
                id="page-size-select"
                label="Items per page"
                labelId="page-size-select-label"
                onChange={(e) => handlePageSizeChange(e)}
                value={pageSize.toString()}
              >
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>

      {/* Log Dialog */}
      <Dialog
        fullWidth
        maxWidth="xl"
        onClose={handleCloseLogDialog}
        open={logDialogOpen}
        PaperProps={{
          sx: {
            height: "90vh",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography component="div" variant="h6">
            Execution Log - {configFileName}
          </Typography>
          <IconButton aria-label="close" onClick={handleCloseLogDialog} sx={{ color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ padding: 0 }}>
          {logLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ height: "100%" }}>
              <Tabs onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: "divider" }} value={tabValue}>
                {[
                  <Tab aria-controls="tabpanel-0" icon={<TerminalIcon />} iconPosition="start" id="tab-0" key="raw-log" label="Raw Log" />,
                  ...(evaluationData
                    ? [
                        <Tab
                          aria-controls="tabpanel-1"
                          icon={<AssessmentIcon />}
                          iconPosition="start"
                          id="tab-1"
                          key="effectiveness"
                          label="Effectiveness Chart"
                        />,
                        <Tab aria-controls="tabpanel-2" icon={<AssessmentIcon />} iconPosition="start" id="tab-2" key="gains" label="Relative Gains Chart" />,
                      ]
                    : []),
                ]}
              </Tabs>

              {/* Raw Log Tab */}
              <Box aria-labelledby="tab-0" hidden={tabValue !== 0} id="tabpanel-0" role="tabpanel" sx={{ height: "calc(100% - 48px)" }}>
                {tabValue === 0 && (
                  <Box
                    component="pre"
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      padding: 2,
                      margin: 0,
                      backgroundColor: "#f5f5f5",
                      height: "100%",
                      overflow: "auto",
                    }}
                  >
                    {logContent}
                  </Box>
                )}
              </Box>

              {/* Effectiveness Chart Tab */}
              {evaluationData && (
                <Box aria-labelledby="tab-1" hidden={tabValue !== 1} id="tabpanel-1" role="tabpanel" sx={{ height: "calc(100% - 48px)", overflow: "auto" }}>
                  {tabValue === 1 && renderEffectivenessChart()}
                </Box>
              )}

              {/* Relative Gains Chart Tab */}
              {evaluationData && (
                <Box aria-labelledby="tab-2" hidden={tabValue !== 2} id="tabpanel-2" role="tabpanel" sx={{ height: "calc(100% - 48px)", overflow: "auto" }}>
                  {tabValue === 2 && renderRelativeGainsChart()}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleCloseLogDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
