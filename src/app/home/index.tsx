"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Appbar from "@/components/Appbar";

export default function Homepage() {
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
        <Button
          size="large"
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          href="/get-started"
        >
          Get started
        </Button>
      </Box>
    </React.Fragment>
  );
}
