import React from "react";
import Appbar from "@/components/Appbar";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
        >
          Get started now
        </Button>
      </Box>
    </React.Fragment>
  );
}
