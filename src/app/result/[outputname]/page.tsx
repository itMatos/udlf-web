"use client";
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
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import Appbar from "@/components/Appbar";
import type { lineContent } from "@/services/api/models";
import { getAllClasses, getAllFilenames, getPaginatedListFilenames, getPaginatedListFilenamesByConfig, getLogFileContent } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";
import config from "@/services/api/config";

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
  };

  return (
    <React.Fragment>
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

          <Button startIcon={<TerminalIcon />} variant="outlined" onClick={handleOpenLogDialog} sx={{ minWidth: "auto", flexShrink: 0 }}>
            View Log
          </Button>
        </Box>

        <Box sx={{ my: 2, mx: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
            <Autocomplete
              options={inputImageNames}
              renderInput={(params) => <TextField {...params} label="Search input file..." />}
              onChange={(_event, value) => {
                if (value) {
                  router.push(`/result/${outputname}/${value}`);
                }
              }}
              sx={{ width: 300, mr: 2 }}
            />
          </Box>

          <Box sx={{ my: 2, mx: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Aspect Ratio:
            </Typography>
            <Select
              value={aspectRatio}
              onChange={handleAspectRatioChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                width: 150,
              }}
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
            <Typography variant="h6" color="primary">
              Loading Results...
            </Typography>
            <Typography variant="body2" color="text.secondary">
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
            <Typography variant="h6" color="error">
              Error Loading Results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {errorMessage}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Box>
        )}

        {!isLoading && !isError && (
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
                  sx={{ p: 1, m: 2, width: 150, cursor: "pointer" }}
                  onClick={() => router.push(`/result/${outputname}/${imageName}`)}
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
        {!isLoading && !isError && (
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
        open={logDialogOpen}
        onClose={handleCloseLogDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            height: "80vh",
            maxHeight: "80vh",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div">
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
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleCloseLogDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
