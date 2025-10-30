"use client";
import { Box, Button, Step, StepButton, Stepper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { uploadUDLFConfig } from "@/services/api/UDLF-api";
import { STEPS, StepIndex, UDLF_METHODS } from "@/ts/constants/common";
import { DEFAULT_INPUT_SETTINGS } from "@/ts/constants/input";
import { CONTEXTRR_DEFAULT_PARAMS } from "@/ts/constants/methods-default-params/contextrr";
import { DEFAULT_OUTPUT_SETTINGS } from "@/ts/constants/output";
import type { LabelProps, StepProps } from "@/ts/types/createConfig";
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
import EvaluationSettings from "../EvaluationSettings/EvaluationSettings";
import InputSettings from "../InputSettings/InputSettings";
import MethodSettings from "../MethodSettings/MethodSettings";
import OutputSettings from "../OutputSettings/OutputSettings";
import Summary from "../Summary/Summary";

export default function UDLFConfigStepper() {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<Method>(UDLF_METHODS.CONTEXTRR);
  const [settings, setSettings] = useState<ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC | ReckNNGraph | RFE | RLSim>(CONTEXTRR_DEFAULT_PARAMS);
  const [inputSettings, setInputSettings] = useState<InputSettingsData | null>(DEFAULT_INPUT_SETTINGS);
  const [outputSettings, setOutputSettings] = useState<OutputSettingsData>(DEFAULT_OUTPUT_SETTINGS);
  const [evaluationSettings, setEvaluationSettings] = useState<EvaluationSettingsData | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [configFileToExecute, setConfigFileToExecute] = useState<Blob | null>(null);
  const [configFileName, setConfigFileName] = useState<string>("");

  const isStepOptional = useCallback((step: number) => step === StepIndex.OUTPUT_SETTINGS, []);

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

  const isStepComplete = useCallback((step: number): boolean => completedSteps.has(step), [completedSteps]);

  const canProceedByValidation = useCallback(
    (step: number): boolean => {
      switch (step) {
        case StepIndex.METHOD_SETTINGS:
          return true;
        case StepIndex.INPUT_SETTINGS:
          return isInputSettingsComplete(inputSettings);
        case StepIndex.OUTPUT_SETTINGS:
          return true;
        case StepIndex.EVALUATION_SETTINGS:
          return !!evaluationSettings;
        case StepIndex.SUMMARY:
          return true;
        default:
          return false;
      }
    },
    [inputSettings, evaluationSettings, isInputSettingsComplete]
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
    setCompletedSteps((prev) => {
      const updated = new Set(prev);
      updated.add(activeStep);
      return updated;
    });
    setActiveStep((prev) => prev + 1);
  }, [activeStep]);

  const prevStep = useCallback(() => setActiveStep((prev) => Math.max(0, prev - 1)), []);

  const stepsContent = [
    <MethodSettings key="method" selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} setSettings={setSettings} settings={settings} />,
    <InputSettings key="input" onSettingsChange={setInputSettings} settings={inputSettings} />,
    <OutputSettings key="output" onSettingsChange={setOutputSettings} settings={outputSettings} />,
    <EvaluationSettings key="evaluation" onSettingsChange={setEvaluationSettings} settings={evaluationSettings} />,
    <Summary
      evaluationSettings={evaluationSettings}
      inputSettings={inputSettings}
      key="summary"
      methodSettings={settings}
      outputSettings={outputSettings}
      selectedMethod={selectedMethod}
      setConfigFileName={setConfigFileName}
      setConfigFileToExecute={setConfigFileToExecute}
    />,
  ];

  const canProceed = useMemo(() => canProceedByValidation(activeStep), [activeStep, canProceedByValidation]);

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
      <Stepper activeStep={activeStep} nonLinear>
        {STEPS.map((label, index) => {
          const stepProps: StepProps = {};
          const labelProps: LabelProps = {};

          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }

          const stepIsComplete = isStepComplete(index);
          stepProps.completed = stepIsComplete;
          const canGoToNext = canProceedByValidation(activeStep);
          const isImmediateNext = index === activeStep + 1 && canGoToNext;
          const outputGate = index === StepIndex.OUTPUT_SETTINGS ? isStepComplete(StepIndex.INPUT_SETTINGS) : true;
          const allowNonLinear = activeStep === StepIndex.SUMMARY || isStepComplete(StepIndex.SUMMARY);
          const enabled = outputGate && (allowNonLinear ? index === activeStep || stepIsComplete : index === activeStep || isImmediateNext);

          return (
            <Step key={label} {...stepProps} disabled={!enabled}>
              <StepButton onClick={() => enabled && setActiveStep(index)} value={index}>
                {label}
              </StepButton>
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
            pt: 1,
          }}
        >
          {(() => {
            const stepKeys = ["method", "input", "output", "evaluation", "summary"] as const;
            return stepsContent.map((node, idx) => (
              <Box
                aria-hidden={activeStep !== idx}
                key={stepKeys[idx]}
                role="tabpanel"
                sx={{
                  display: activeStep === idx ? "flex" : "none",
                  width: "100%",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {node}
              </Box>
            ));
          })()}
        </Box>

        <Box sx={{ display: "flex", pt: 2, width: "100%", maxWidth: "500px", mt: "auto" }}>
          {activeStep !== StepIndex.METHOD_SETTINGS && (
            <Button color="inherit" disabled={activeStep === StepIndex.METHOD_SETTINGS} onClick={prevStep} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          <Button disabled={!canProceed} onClick={nextStep}>
            {activeStep === StepIndex.SUMMARY ? "Execute" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
