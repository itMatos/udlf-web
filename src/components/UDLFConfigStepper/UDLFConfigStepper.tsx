"use client";
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { uploadUDLFConfig } from "@/services/api/UDLF-api";
import { STEPS, StepIndex, UDLF_METHODS } from "@/ts/constants/common";
import { DEFAULT_INPUT_SETTINGS } from "@/ts/constants/input";
import { CONTEXTRR_DEFAULT_PARAMS } from "@/ts/constants/methods-default-params/contextrr";
import { DEFAULT_OUTPUT_SETTINGS } from "@/ts/constants/output";
import type { EvaluationSettingsData } from "@/ts/types/evaluation";
import type { InputSettingsData } from "@/ts/types/input";
import type { Method } from "@/ts/types/methods";
import type { BFSTree } from "@/ts/types/methods/bfstree";
import type { ContextRR } from "@/ts/types/methods/contextrr";
import type { CorGraph } from "@/ts/types/methods/corgraph";
import type { CPRR } from "@/ts/types/methods/cprr";
import type { LHRR } from "@/ts/types/methods/lhrr";
import type { RDPAC } from "@/ts/types/methods/rdpac";
import type { ReckNNGraph } from "@/ts/types/methods/recknngraph";
import type { RFE } from "@/ts/types/methods/rfe";
import type { RLSim } from "@/ts/types/methods/rlsim";
import type { OutputSettingsData } from "@/ts/types/output";
import type { LabelProps, StepProps } from "../../ts/interfaces";
import EvaluationSettings from "../EvaluationSettings/EvaluationSettings";
import InputSettings from "../InputSettings/InputSettings";
import MethodSettings from "../MethodSettings/MethodSettings";
import OutputSettings from "../OutputSettings/OutputSettings";
import Summary from "../Summary/Summary";

export default function UDLFConfigStepper() {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());
  const [selectedMethod, setSelectedMethod] = useState<Method>(UDLF_METHODS.CONTEXTRR);
  const [settings, setSettings] = useState<ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC | ReckNNGraph | RFE | RLSim>(CONTEXTRR_DEFAULT_PARAMS);
  const [inputSettings, setInputSettings] = useState<InputSettingsData | null>(DEFAULT_INPUT_SETTINGS);
  const [outputSettings, setOutputSettings] = useState<OutputSettingsData>(DEFAULT_OUTPUT_SETTINGS);
  const [evaluationSettings, setEvaluationSettings] = useState<EvaluationSettingsData | null>(null);
  const [configFileToExecute, setConfigFileToExecute] = useState<Blob | null>(null);
  const [configFileName, setConfigFileName] = useState<string>("");

  const isStepOptional = useCallback((step: number) => step === -1, []);
  const isStepSkipped = useCallback((step: number) => skipped.has(step), [skipped]);

  const isInputSettingsComplete = useCallback((s?: InputSettingsData | null): boolean => {
    if (!s) {
      return false;
    }
    if (!Array.isArray(s.inputFiles) || s.inputFiles.length === 0) {
      return false;
    }
    if (s.inputFileList.trim() === "") {
      return false;
    }
    if (s.inputFileClasses.trim() === "") {
      return false;
    }
    if (s.datasetImagesPath.trim() === "") {
      return false;
    }
    return s.inputFiles.every((file) => file && file.trim() !== "");
  }, []);

  const isStepComplete = useCallback(
    (step: number): boolean => {
      switch (step) {
        case StepIndex.METHOD_SETTINGS:
          return true;
        case StepIndex.INPUT_SETTINGS:
          return isInputSettingsComplete(inputSettings);
        case StepIndex.OUTPUT_SETTINGS:
          return !!outputSettings;
        case StepIndex.EVALUATION_SETTINGS:
          return !!evaluationSettings;
        case StepIndex.SUMMARY:
          return true;
        default:
          return false;
      }
    },
    [inputSettings, outputSettings, evaluationSettings, isInputSettingsComplete]
  );

  const uploadAndRedirect = useCallback(
    async (file: Blob, fileName: string) => {
      try {
        await uploadUDLFConfig(file, fileName);
        router.push(`/execute/${fileName}`);
      } catch (err) {
        console.error("Error uploading config file:", err);
      }
    },
    [router]
  );
  const nextStep = useCallback(() => {
    setActiveStep((prev) => prev + 1);

    setSkipped((prev) => {
      if (!prev.has(activeStep)) {
        return prev;
      }
      const ns = new Set(prev.values());
      ns.delete(activeStep);
      return ns;
    });
  }, [activeStep]);

  const prevStep = useCallback(() => setActiveStep((prev) => Math.max(0, prev - 1)), []);

  const skipStep = useCallback(() => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setSkipped((prev) => {
      const ns = new Set(prev.values());
      ns.add(activeStep);
      return ns;
    });
    setActiveStep((prev) => prev + 1);
  }, [activeStep, isStepOptional]);

  const renderStepContent = useCallback(() => {
    switch (activeStep) {
      case StepIndex.METHOD_SETTINGS:
        return <MethodSettings selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} setSettings={setSettings} settings={settings} />;
      case StepIndex.INPUT_SETTINGS:
        return <InputSettings onSettingsChange={setInputSettings} settings={inputSettings} />;
      case StepIndex.OUTPUT_SETTINGS:
        return <OutputSettings onSettingsChange={setOutputSettings} settings={outputSettings} />;
      case StepIndex.EVALUATION_SETTINGS:
        return <EvaluationSettings onSettingsChange={setEvaluationSettings} settings={evaluationSettings} />;
      case StepIndex.SUMMARY:
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
      case StepIndex.DONE:
        return null;
      default:
        return <Typography>Step content in development</Typography>;
    }
  }, [activeStep, selectedMethod, settings, inputSettings, outputSettings, evaluationSettings]);

  const canProceed = useMemo(() => isStepComplete(activeStep), [activeStep, isStepComplete]);

  if (configFileToExecute && configFileName && activeStep === StepIndex.DONE) {
    uploadAndRedirect(configFileToExecute, configFileName);
  }

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
          {activeStep !== StepIndex.METHOD_SETTINGS && (
            <Button color="inherit" disabled={activeStep === StepIndex.METHOD_SETTINGS} onClick={prevStep} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={skipStep} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          <Button disabled={!canProceed} onClick={nextStep}>
            {activeStep === StepIndex.SUMMARY ? "Execute" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
