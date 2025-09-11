"use client";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import Appbar from "@/components/Appbar";
import type { lineContent } from "@/services/api/models";
import { getAllFilenames, getPaginatedListFilenames } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";

export default function Result() {
  const params = useParams();
  const router = useRouter();
  let outputname = params?.outputname || "";
  if (Array.isArray(outputname)) {
    outputname = outputname[0] || "";
  }
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(IMAGES_PER_PAGE_DEFAULT);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [imagesCurrentPage, setImagesCurrentPage] = useState<lineContent[]>([]);
  const [aspectRatio, setAspectRatio] = useState<"original" | "square">("square");
  const [inputImageNames, setInputImageNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageNames = async () => {
      try {
        const imageName = await getPaginatedListFilenames(outputname, page, pageSize);
        setTotalPages(imageName.totalPages);
        setImagesCurrentPage(imageName.items);
        console.log("Fetched image names:", imageName.items);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error fetching image names for output ${outputname}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImageNames();
  }, [outputname, page, pageSize]);

  useEffect(() => {
    const fetchInputImageNames = async () => {
      try {
        const inputNames = await getAllFilenames(outputname);
        setInputImageNames(inputNames);
        console.log("Fetched input image names:", inputNames);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error fetching input image names for output ${outputname}:`, error);
      }
    };
    fetchInputImageNames();
  }, [outputname]);

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

  return (
    <React.Fragment>
      <Appbar />
      <Box sx={{ mb: 4, mx: 1 }}>
        <Typography variant="h6">
          Results for:
          <Typography component="span" style={{ fontWeight: "bold" }} variant="h6">
            {` ${outputname}`}
          </Typography>
          <Typography component="div" style={{ fontWeight: "normal" }} variant="h6">
            Select or search an input image to view similar images.
          </Typography>
        </Typography>

        {/* Actions menu */}
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
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
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
                  image={`http://localhost:8080/image-file/${imageName}`}
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

        {/* Pagination and Page Size Selector */}
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
      </Box>
    </React.Fragment>
  );
}
