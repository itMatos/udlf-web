"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Appbar from "@/components/Appbar";
import { getPaginatedListFilenames, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";
import { useParams } from "next/navigation";

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
    fetchImageNames();
  }, []);

  const fetchImageNames = async () => {
        try {
          const imageName = await getPaginatedListFilenames(outputname, page, pageSize);
          console.log(`Fetched image names for output ${outputname}:`, imageName);
          setTotalPages(imageName.totalPages);
        } catch (error) {
          console.error(`Error fetching image names for output ${outputname}:`, error);
        }
      }

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("Event", event);
    console.log("Page changed to:", value);
    setPage(value);
  };

  return (
    <React.Fragment>
      <Appbar />
      <Typography variant="h6">Results for: 
        <Typography variant="h6" component="span" style={{ fontWeight: 'bold' }}>
          {" " +outputname}
        </Typography>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, mb: 2, gap: 2 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange}
          color="primary" 
        />
        
        {/* NOVO: Seletor de Itens por Página */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="page-size-select-label">Itens por pág.</InputLabel>
          <Select
            labelId="page-size-select-label"
            id="page-size-select"
            value={pageSize.toString()}
            label="Itens por pág."
            onChange={(e) => handlePageSizeChange(e)}
          >
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Box>

    </React.Fragment>
  );
}
