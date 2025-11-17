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
  Skeleton,
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
import { getAllClasses, getAllFilenames, getLogFileContent, getPaginatedListFilenamesByConfig } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";

// Regex patterns defined at top-level scope for performance
const EVALUATION_METRIC_REGEX = /^(P@\d+|Recall@\d+|MAP)\s+(-?\d+\.\d+)(%?)$/;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: we need to use the params to get the output name
export default function Result() {
  const params = useParams();
  const router = useRouter();
  let outputname = params?.outputname || "";
  if (Array.isArray(outputname)) {
    outputname = outputname[0] || "";
  }

  // Extract config file name from output name
  // e.g., "output_ContextRR_3m172i0.ini.txt" -> "ContextRR_3m172i0.ini"
  // Define regexes once outside the function for performance
  const OUTPUT_PREFIX_REGEX = /^output_/g;
  const TXT_SUFFIX_REGEX = /\.txt$/g;
  const getConfigFileName = (outputName: string): string => {
    // Remove "output_" prefix and ".txt" suffix
    const withoutPrefix = outputName.replace(OUTPUT_PREFIX_REGEX, "");
    const withoutSuffix = withoutPrefix.replace(TXT_SUFFIX_REGEX, "");
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
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

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
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: cache logic adds complexity but improves performance
    const fetchImageNames = async () => {
      try {
        // Check cache first
        const cacheKey = `result_${configFileName}_${page}_${pageSize}`;
        const cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            const cacheTimestamp = parsedData.timestamp;
            const cacheAge = Date.now() - cacheTimestamp;
            // Use cache if less than 5 minutes old
            if (cacheAge < 5 * 60 * 1000) {
              console.log("Using cached data for:", outputname);
              setTotalPages(parsedData.totalPages);
              setImagesCurrentPage(parsedData.items);
              setLoadedImages(new Set());
              setErrorImages(new Set());
              const newImageNames = parsedData.items.map((img: { fileInputNameLine: string }) => img.fileInputNameLine);
              setLoadingImages(new Set(newImageNames));
              setIsLoading(false);
              setIsError(false);
              return;
            }
          } catch {
            // If cache is invalid, continue to fetch
            console.warn("Invalid cache data, fetching fresh data");
          }
        }

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

        // Cache the data
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              totalPages: imageName.totalPages,
              items: imageName.items,
              timestamp: Date.now(),
            })
          );
        } catch (e) {
          console.warn("Failed to cache data:", e);
        }

        // Reset loading states when page changes and start loading for new images
        setLoadedImages(new Set());
        setErrorImages(new Set());
        // Start loading state for all images immediately
        const newImageNames = imageName.items.map((img) => img.fileInputNameLine);
        setLoadingImages(new Set(newImageNames));
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
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: cache logic adds complexity but improves performance
    const fetchInputImageNames = async () => {
      try {
        // Check cache for input image names
        const cacheKey = `inputNames_${configFileName}`;
        const cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            const cacheTimestamp = parsedData.timestamp;
            const cacheAge = Date.now() - cacheTimestamp;
            // Use cache if less than 5 minutes old
            if (cacheAge < 5 * 60 * 1000) {
              console.log("Using cached input image names");
              setInputImageNames(parsedData.names);
              return;
            }
          } catch {
            console.warn("Invalid cache data, fetching fresh data");
          }
        }

        const inputNames = await getAllFilenames(outputname, configFileName);
        setInputImageNames(inputNames);
        console.log("Fetched input image names:", inputNames);

        // Cache the input names
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              names: inputNames,
              timestamp: Date.now(),
            })
          );
        } catch {
          console.warn("Failed to cache input names");
        }
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

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: we need to parse the log content to get the evaluation data
  const parseEvaluationData = (logContentParsed: string) => {
    try {
      const lines = logContentParsed.split("\n");
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
        const match = trimmedLine.match(EVALUATION_METRIC_REGEX);
        if (match) {
          const [, metric, value] = match;
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
    if (!(evaluationData && (Object.keys(evaluationData.before).length || Object.keys(evaluationData.after).length))) {
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
      if (metrics.length === 0) {
        return null;
      }

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
              renderInput={(autocompleteParams) => <TextField {...autocompleteParams} label="Search input file..." />}
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
            {/** biome-ignore lint/complexity/noExcessiveCognitiveComplexity: we need to map the images current page */}
            {imagesCurrentPage.map((image) => {
              const imageName = image.fileInputNameLine;
              const imageUrl = `${config.udlfApi}/image-file/${imageName}?configFile=${configFileName}`;
              const imageIsLoading = loadingImages.has(imageName);
              const hasError = errorImages.has(imageName);

              return (
                <Card
                  key={image.fileInputNameLine}
                  onClick={() => router.push(`/result/${outputname}/${imageName}`)}
                  sx={{ p: 1, m: 2, width: 150, cursor: "pointer" }}
                >
                  <CardHeader subheader={`${imageName}`} />
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      ...(aspectRatio === "square" && {
                        aspectRatio: "1 / 1",
                        height: 150,
                      }),
                    }}
                  >
                    {imageIsLoading && (
                      <Skeleton
                        height={aspectRatio === "square" ? 150 : "100%"}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          borderRadius: 1,
                        }}
                        variant="rectangular"
                        width="100%"
                      />
                    )}
                    {hasError ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: aspectRatio === "square" ? 150 : "auto",
                          aspectRatio: aspectRatio === "square" ? "1 / 1" : undefined,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "action.hover",
                          color: "text.secondary",
                          fontSize: "0.75rem",
                        }}
                      >
                        Erro ao carregar
                      </Box>
                    ) : (
                      <CardMedia
                        alt={`${imageName}`}
                        component="img"
                        image={imageUrl}
                        onError={() => {
                          setLoadingImages((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(imageName);
                            return newSet;
                          });
                          setErrorImages((prev) => new Set(prev).add(imageName));
                        }}
                        onLoad={() => {
                          setLoadingImages((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(imageName);
                            return newSet;
                          });
                          setLoadedImages((prev) => new Set(prev).add(imageName));
                        }}
                        onLoadStart={() => {
                          const isNotLoaded = !loadedImages.has(imageName);
                          const hasNoError = !errorImages.has(imageName);
                          if (isNotLoaded && hasNoError) {
                            setLoadingImages((prev) => new Set(prev).add(imageName));
                          }
                        }}
                        sx={{
                          position: "relative",
                          opacity: imageIsLoading ? 0 : 1,
                          transition: "opacity 0.3s ease-in-out",
                          ...(aspectRatio === "square" && {
                            aspectRatio: "1 / 1",
                            objectFit: "cover",
                            height: 150,
                          }),
                        }}
                      />
                    )}
                  </Box>
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
