"use client";
import { Box, Button, Divider, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import MethodSettings from "../MethodSettings/MethodSettings";
import OutputSettings from "../OutputSettings";
import Summary from "../Summary";

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
    if (!s) return false;
    if (!Array.isArray(s.inputFiles) || s.inputFiles.length === 0) return false;
    if (s.inputFileList.trim() === "") return false;
    if (s.inputFileClasses.trim() === "") return false;
    if (s.datasetImagesPath.trim() === "") return false;
    for (const file of s.inputFiles) {
      if (!file || file.trim() === "") {
        return false;
      }
    }
    return true;
  }, []);

  const isStepComplete = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 0:
          return true;
        case 1:
          return isInputSettingsComplete(inputSettings);
        case 2:
          return !!outputSettings;
        case 3:
          return !!evaluationSettings;
        case 4:
          return true;
        default:
          return false;
      }
    },
    [inputSettings, outputSettings, evaluationSettings, isInputSettingsComplete]
  );

  const stepTitle = useMemo(() => ["Select method", "Input settings", "Output settings", "Evaluation settings", "Summary"], []);

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
      if (!prev.has(activeStep)) return prev;
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
        return null;
      default:
        return <Typography>Step content in development</Typography>;
    }
  }, [activeStep, selectedMethod, settings, inputSettings, outputSettings, evaluationSettings]);

  const canProceed = useMemo(() => isStepComplete(activeStep), [activeStep, isStepComplete]);

  if (configFileToExecute && configFileName && activeStep === STEPS.length) {
    void uploadAndRedirect(configFileToExecute, configFileName);
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
          <Button color="inherit" disabled={activeStep === 0} onClick={prevStep} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={skipStep} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          <Button disabled={!canProceed} onClick={nextStep}>
            {activeStep === STEPS.length - 1 ? "Execute" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
