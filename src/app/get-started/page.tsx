import React from "react";
import Appbar from "@/components/Appbar";
import HorizontalLinearStepper from "@/components/HorizontalLinearStepper";

export default function GetStarted() {
  return (
    <React.Fragment>
      <Appbar />
      <div>
        <HorizontalLinearStepper />
      </div>
    </React.Fragment>
  );
}
