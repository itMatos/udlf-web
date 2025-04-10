import React from "react";
import Appbar from "@/components/Appbar";
import HorizontalLinearStepper from "@/components/HorizontalLinearStepper";
import { Grid } from "@mui/material";

export default function GetStarted() {
  return (
    <React.Fragment>
      <Appbar />
      <Grid container>
        <HorizontalLinearStepper />
      </Grid>
    </React.Fragment>
  );
}
