"use client";
import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Appbar from "@/components/Appbar";
import { getUDLFOutputs } from "@/services/api/UDLF-api";

export default function Result() {
  const fetchOutputs = async () => {
    try {
      const outputFileName = "teste3-30jun.txt";
      const response = await getUDLFOutputs(outputFileName);
      console.log("Fetched outputs:", response);
    } catch (error) {
      console.error("Error fetching outputs:", error);
    }
  };

  useEffect(() => {
    fetchOutputs();
  }, []);
  return (
    <React.Fragment>
      <Appbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Button size="large" variant="contained" endIcon={<ArrowForwardIosIcon />} href="/get-started">
          Get started
        </Button>
      </Box>
    </React.Fragment>
  );
}
