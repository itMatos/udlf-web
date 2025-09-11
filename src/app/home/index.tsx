"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Appbar from "@/components/Appbar";
import BasicBars from "@/components/methods/Charts";

export default function Homepage() {
  return (
    <React.Fragment>
      <Appbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          gap: 2,
          width: "100%",
          maxWidth: "20rem",
          margin: "0 auto",
        }}
      >
        <Button size="large" variant="contained" endIcon={<ArrowForwardIosIcon />} href="/get-started" fullWidth>
          Create new config file
        </Button>
        <Button size="large" variant="contained" endIcon={<ArrowForwardIosIcon />} href="/load-config" fullWidth>
          Run existing config file
        </Button>
      </Box>
    </React.Fragment>
  );
}
