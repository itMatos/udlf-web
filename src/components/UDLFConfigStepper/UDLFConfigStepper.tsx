"use client";
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import { uploadUDLFConfig } from "@/services/api/UDLF-api";
import { STEPS, UDLF_METHODS } from "@/ts/constants/common";
import { DEFAULT_INPUT_SETTINGS } from "@/ts/constants/input";
import { CONTEXTRR_DEFAULT_PARAMS } from "@/ts/constants/methods/contextrr";
import { DEFAULT_OUTPUT_SETTINGS } from "@/ts/constants/output";
import type { InputSettingsData } from "@/ts/types/input";
import type { BFSTree } from "@/ts/interfaces/methods/bfstree";
import type { ContextRR } from "@/ts/interfaces/methods/contextrr";
import type { CorGraph } from "@/ts/interfaces/methods/corgraph";
import type { CPRR } from "@/ts/interfaces/methods/cprr";
import type { LHRR } from "@/ts/interfaces/methods/lhrr";
import type { RDPAC } from "@/ts/interfaces/methods/rdpac";
import type { ReckNNGraph } from "@/ts/interfaces/methods/recknngraph";
import type { RFE } from "@/ts/interfaces/methods/rfe";
import type { RLSim } from "@/ts/interfaces/methods/rlsim";
import type { OutputSettingsData } from "@/ts/interfaces/output";
import type { Method } from "@/ts/types/methods";
import type { EvaluationSettingsData, LabelProps, StepProps } from "../../ts/interfaces";
import EvaluationSettings from "../EvaluationSettings";
import InputSettings from "../InputSettings";
import MethodSettings from "../MethodSettings";
import OutputSettings from "../OutputSettings";
import Summary from "../Summary";

export default function UDLFConfigStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [selectedMethod, setSelectedMethod] = useState<Method>(UDLF_METHODS.CONTEXTRR);
  const [settings, setSettings] = useState<ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC | ReckNNGraph | RFE | RLSim>(CONTEXTRR_DEFAULT_PARAMS);
  const [inputSettings, setInputSettings] = useState<InputSettingsData | null>(DEFAULT_INPUT_SETTINGS);
  const [outputSettings, setOutputSettings] = useState<OutputSettingsData>(DEFAULT_OUTPUT_SETTINGS);
  const [evaluationSettings, setEvaluationSettings] = useState<EvaluationSettingsData | null>(null);

  const [configFileToExecute, setConfigFileToExecute] = useState<Blob | null>(null);
  const [configFileName, setConfigFileName] = useState<string>("");

  const isStepOptional = (step: number) => step === -1;
  const isStepSkipped = (step: number) => skipped.has(step);

  const redirectToExecuteConfig = (file: Blob, fileName: string) => {
    try {
      uploadUDLFConfig(file, fileName);
      window.location.href = `/execute/${configFileName}`;
    } catch (error) {
      console.error("Error uploading config file:", error);
    }
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return isInputSettingsComplete();
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

  const isInputSettingsComplete = (): boolean => {
    if (!inputSettings) return false;
    if (inputSettings.inputFiles.length === 0) return false;
    if (inputSettings.inputFileList.trim() === "") return false;
    if (inputSettings.inputFileClasses.trim() === "") return false;
    if (inputSettings.datasetImagesPath.trim() === "") return false;
    for (const file of inputSettings.inputFiles) {
      if (!file || file.trim() === "") {
        return false;
      }
    }
    return true;
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <MethodSettings selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} setSettings={setSettings} settings={settings} />;
      case 1:
        return <InputSettings onSettingsChange={setInputSettings} settings={inputSettings} />;
      case 2:
        return <OutputSettings onSettingsChange={setOutputSettings} settings={outputSettings} />;
      case 3:
        return <EvaluationSettings onSettingsChange={setEvaluationSettings} settings={evaluationSettings} />;
      case 4:
        return (
          <Summary
            evaluationSettings={evaluationSettings}
            inputSettings={inputSettings}
            methodSettings={settings}
            outputSettings={outputSettings}
            selectedMethod={selectedMethod}
            setConfigFileName={setConfigFileName}
            setConfigFileToExecute={setConfigFileToExecute}
          />
        );
      case 5:
        return configFileToExecute && redirectToExecuteConfig(configFileToExecute, configFileName);
      default:
        return <Typography>Step content in development</Typography>;
    }
  };

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

      <Box sx={{ mt: 4, mb: 2, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {activeStep === STEPS.length ? (
          <>
            <Typography sx={{ mb: 2 }}>{stepTitle[activeStep]}</Typography>
            <Box sx={{ width: "100%", maxWidth: "600px", display: "flex", justifyContent: "center" }}>{renderStepContent() || null}</Box>
            {configFileToExecute && configFileName && redirectToExecuteConfig(configFileToExecute, configFileName)}
          </>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>{stepTitle[activeStep]}</Typography>
            <Box
              sx={{
                width: "100%",
                maxWidth: "500px",
                display: "flex",
                justifyContent: "center",
                minHeight: "500px",
                alignItems: "flex-start",
                pt: 2,
              }}
            >
              {renderStepContent() || null}
            </Box>
            <Box sx={{ display: "flex", pt: 2, width: "100%", maxWidth: "500px", mt: "auto" }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button disabled={!canProceed()} onClick={handleNext}>
                {activeStep === STEPS.length - 1 ? "Execute" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
