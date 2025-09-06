"use client";
import { Box, Card, CardHeader, CardMedia, FormControl, InputLabel, MenuItem, Pagination, Select, type SelectChangeEvent, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import Appbar from "@/components/Appbar";
import type { lineContent } from "@/services/api/models";
import { getPaginatedListFilenames } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";

export default function Result() {
  const router = useParams();
  let outputname = router?.outputname || "";
  if (Array.isArray(outputname)) {
    outputname = outputname[0] || "";
  }
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(IMAGES_PER_PAGE_DEFAULT);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [imagesCurrentPage, setImagesCurrentPage] = useState<lineContent[]>([]);

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
      }
    };
    fetchImageNames();
  }, [outputname, page, pageSize]);

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const newPageSize = Number.parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Appbar />
      <Typography variant="h6">
        Results for:
        <Typography component="span" style={{ fontWeight: "bold" }} variant="h6">
          {` ${outputname}`}
        </Typography>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {imagesCurrentPage.map((image) => {
          const imageName = image.content;
          return (
            <Card key={image.content} sx={{ p: 1, m: 1, width: 150, cursor: "pointer" }}>
              <CardHeader subheader={`${imageName}`} />
              <CardMedia
                alt={`${imageName}`}
                component="img"
                image={`http://localhost:8080/image-file/${imageName}`}
                onClick={() => (window.location.href = `/result/${outputname}/${imageName}`)}
              />
            </Card>
          );
        })}
      </Box>
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
    </>
  );
}
