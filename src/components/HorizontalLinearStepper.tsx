"use client";
import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import SelectMethod from "./SelectMethod";
import { CONTEXTRR_DEFAULT_SETTINGS, METHODS, STEPS } from "./../ts/constants";
import {
  StepProps,
  LabelProps,
  InputSettingsData,
  EvaluationSettingsData,
  ContextRRMethodSettings,
  OutputSettingsData,
} from "./../ts/interfaces";
import InputSettings from "./InputSettings";
import OutputSettings from "./OutputSettings";
import EvaluationSettings from "./EvaluationSettings";
import Summary from "./Summary";
import { OutputFormatType } from "@/ts/types";

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [selectedMethod, setSelectedMethod] = useState<string>(METHODS[0]);
  const [methodSettings, setMethodSettings] = useState<ContextRRMethodSettings>(
    CONTEXTRR_DEFAULT_SETTINGS
  );
  const [inputSettings, setInputSettings] = useState<InputSettingsData | null>(null);
  const [outputSettings, setOutputSettings] = useState<OutputSettingsData>({
    outputFileName: "",
    outputFileFormat: "RANKEDLIST_NUMERIC" as OutputFormatType,
    enabledOutput: false,
  });
  const [evaluationSettings, setEvaluationSettings] = useState<EvaluationSettingsData | null>(null);

  const isStepOptional = (step: number) => step === -1;
  const isStepSkipped = (step: number) => skipped.has(step);

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!selectedMethod;
      case 1:
        return true;
      case 2:
        return !!outputSettings;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const stepTitle = [
    "Select method",
    "Input settings",
    "Output settings",
    "Evaluation settings",
    "Summary",
  ];

  const handleNext = () => {
    let newSkipped = skipped;
    console.log("skipped", skipped);
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
    setMethodSettings(CONTEXTRR_DEFAULT_SETTINGS);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <SelectMethod
            onMethodChange={setSelectedMethod}
            onSettingsChange={(settings) => {
              if ("NBYK" in settings && "OPTIMIZATIONS" in settings) {
                setMethodSettings(settings);
              } else {
                console.error("Invalid settings type passed to setMethodSettings");
              }
            }}
            selectedMethod={selectedMethod}
            methodSettings={methodSettings}
          />
        );
      case 1:
        return <InputSettings onSettingsChange={setInputSettings} settings={inputSettings} />;
      case 2:
        return <OutputSettings onSettingsChange={setOutputSettings} settings={outputSettings} />;
      case 3:
        return (
          <EvaluationSettings
            onSettingsChange={setEvaluationSettings}
            settings={evaluationSettings}
          />
        );
      case 4:
        return (
          <Summary
            selectedMethod={selectedMethod}
            methodSettings={methodSettings}
            inputSettings={inputSettings}
            outputSettings={outputSettings}
            evaluationSettings={evaluationSettings}
          />
        );
      default:
        return <Typography>Step content in development</Typography>;
    }
  };

  // Função para verificar se pode avançar
  const canProceed = () => {
    return isStepComplete(activeStep);
  };

  return (
    <Box
      sx={{
        width: "100%",
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
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
            <Typography sx={{ mb: 2 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>{stepTitle[activeStep]}</Typography>
            {renderStepContent()}
            <Box sx={{ display: "flex", pt: 2, width: "100%" }}>
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
              <Button onClick={handleNext} disabled={!canProceed()}>
                {activeStep === STEPS.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
