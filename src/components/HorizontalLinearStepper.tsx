"use client";
import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { StepProps, LabelProps, EvaluationSettingsData } from "../ts/interfaces";
import InputSettings from "./InputSettings";
import OutputSettings from "./OutputSettings";
import EvaluationSettings from "./EvaluationSettings";
import Summary from "./Summary";
import ExecuteConfig from "./ExecuteConfig";
import { CONTEXTRR_DEFAULT_PARAMS } from "@/ts/constants/methods/contextrr";
import { STEPS, UDLF_METHODS } from "@/ts/constants/common";
import { DEFAULT_INPUT_SETTINGS } from "@/ts/constants/input";
import { ContextRR } from "@/ts/interfaces/methods/contextrr";
import { OutputSettingsData } from "@/ts/interfaces/output";
import { InputSettingsData } from "@/ts/interfaces/input";
import { CPRR } from "@/ts/interfaces/methods/cprr";
import MethodSettings from "./MethodSettings";
import { Method } from "@/ts/types/methods";
import { DEFAULT_OUTPUT_SETTINGS } from "@/ts/constants/output";
import { LHRR } from "@/ts/interfaces/methods/lhrr";
import { BFSTree } from "@/ts/interfaces/methods/bfstree";
import { CorGraph } from "@/ts/interfaces/methods/corgraph";

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [selectedMethod, setSelectedMethod] = useState<Method>(UDLF_METHODS.CONTEXTRR);
  const [settings, setSettings] = useState<ContextRR | CPRR | LHRR | BFSTree | CorGraph>(CONTEXTRR_DEFAULT_PARAMS);
  const [inputSettings, setInputSettings] = useState<InputSettingsData | null>(DEFAULT_INPUT_SETTINGS);
  const [outputSettings, setOutputSettings] = useState<OutputSettingsData>(DEFAULT_OUTPUT_SETTINGS);
  const [evaluationSettings, setEvaluationSettings] = useState<EvaluationSettingsData | null>(null);

  const [configFileToExecute, setConfigFileToExecute] = useState<Blob | null>(null);
  const [configFileName, setConfigFileName] = useState<string>("");

  const isStepOptional = (step: number) => step === -1;
  const isStepSkipped = (step: number) => skipped.has(step);

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return !!outputSettings;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const stepTitle = ["Select method", "Input settings", "Output settings", "Evaluation settings", "Summary"];

  const handleNext = () => {
    let newSkipped = skipped;
    console.log("skipped", skipped);
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === STEPS.length - 1) {
      console.log("Final step reached, preparing configuration file for execution");
      console.log("configFileToExecute", configFileToExecute);
    }
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

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setSelectedMethod("");
  //   setMethodSettings(CONTEXTRR_DEFAULT_SETTINGS);
  // };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <MethodSettings
            settings={settings}
            setSettings={setSettings}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
        );
      case 1:
        return <InputSettings onSettingsChange={setInputSettings} settings={inputSettings} />;
      case 2:
        return <OutputSettings onSettingsChange={setOutputSettings} settings={outputSettings} />;
      case 3:
        return <EvaluationSettings onSettingsChange={setEvaluationSettings} settings={evaluationSettings} />;
      case 4:
        return (
          <Summary
            selectedMethod={selectedMethod}
            methodSettings={settings}
            inputSettings={inputSettings}
            outputSettings={outputSettings}
            evaluationSettings={evaluationSettings}
            setConfigFileToExecute={setConfigFileToExecute}
            setConfigFileName={setConfigFileName}
          />
        );
      case 5:
        return (
          configFileToExecute && (
            <ExecuteConfig configFileToExecute={configFileToExecute} configFileName={configFileName} />
          )
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
      component={"div"}
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
            {configFileToExecute && (
              <ExecuteConfig configFileToExecute={configFileToExecute} configFileName={configFileName} />
            )}
          </>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>{stepTitle[activeStep]}</Typography>
            {renderStepContent()}
            <Box sx={{ display: "flex", pt: 2, width: "100%" }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext} disabled={!canProceed()}>
                {activeStep === STEPS.length - 1 ? "Execute" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
