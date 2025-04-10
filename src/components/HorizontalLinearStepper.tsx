"use client";
import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import SelectMethod from "./SelectMethod";
import { METHODS, STEPS } from "@/app/constants/constants";
import {
  StepProps,
  LabelProps,
  CPRRMethodSettings,
} from "@/interfaces/interfaces";

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [selectedMethod, setSelectedMethod] = useState<string>(METHODS[0]);
  const [, setMethodSettings] = useState<CPRRMethodSettings | null>(null);

  const isStepOptional = (step: number) => step === 1;
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedMethod("");
    setMethodSettings(null);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <SelectMethod
            onMethodChange={setSelectedMethod}
            onSettingsChange={setMethodSettings}
          />
        );
      // Adicione mais cases para outros steps
      default:
        return <Typography>Step content in development</Typography>;
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        py: 4,
        justifyItems: "center",
      }}
    >
      <Stepper activeStep={activeStep}>
        {STEPS.map((label, index) => {
          const stepProps: StepProps = {};
          const labelProps: LabelProps = {};

          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ mt: 4, mb: 2 }}>
        {activeStep === STEPS.length ? (
          <>
            <Typography sx={{ mb: 2 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>Step {activeStep + 1}</Typography>
            {renderStepContent()}
            <Box sx={{ display: "flex", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={activeStep === 0 && !selectedMethod}
              >
                {activeStep === STEPS.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
