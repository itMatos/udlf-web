import { Grid } from "@mui/material";
import Appbar from "@/components/Appbar/Appbar";
import UDLFConfigStepper from "@/components/CreateConfig/UDLFConfigStepper/UDLFConfigStepper";

export default function GetStarted() {
  return (
    <>
      <Appbar />
      <Grid container>
        <UDLFConfigStepper />
      </Grid>
    </>
  );
}
