"use client";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, type SelectChangeEvent, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import Appbar from "@/components/Appbar";
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

  useEffect(() => {
    const fetchImageNames = async () => {
      try {
        const imageName = await getPaginatedListFilenames(outputname, page, pageSize);
        setTotalPages(imageName.totalPages);
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("Event", event);
    console.log("Page changed to:", value);
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, mb: 2, gap: 2 }}>
        <Pagination color="primary" count={totalPages} onChange={handlePageChange} page={page} />

        {/* NOVO: Seletor de Itens por Página */}
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="page-size-select-label">Itens por pág.</InputLabel>
          <Select
            id="page-size-select"
            label="Itens por pág."
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
