import { ConfigTemplate } from "@/ts/generatorTypes";

export const evaluationSettingsConfig: ConfigTemplate = {
  section: "EVALUATION SETTINGS",
  parameters: [
    {
      key: "EFFICIENCY_EVAL",
      value: "",
      description: "#(TBool): Enable efficiency evaluation",
    },
    {
      key: "EFFECTIVENESS_EVAL",
      value: "TRUE",
      description: "#(TBool): Enable effectiveness evaluation",
    },
    {
      key: "EFFECTIVENESS_COMPUTE_PRECISIONS",
      value: "TRUE",
      description: "#(TBool): Compute and show Precision results",
    },
    {
      key: "EFFECTIVENESS_COMPUTE_MAP",
      value: "FALSE",
      description: "#(TBool): Compute and show MAP results",
    },
    {
      key: "EFFECTIVENESS_COMPUTE_RECALL",
      value: "TRUE",
      description: "#(TBool): Compute and show Recall results",
    },
    {
      key: "EFFECTIVENESS_RECALLS_TO_COMPUTE",
      value: "",
      description:
        "#(TUint [',' TUint]*): Recalls to be computed (unsigned integers separated by commas)",
    },
    {
      key: "EFFECTIVENESS_PRECISIONS_TO_COMPUTE",
      value: "",
      description:
        "#(TUint [',' TUint]*): Precisions to be computed (unsigned integers separated by commas)",
    },
  ],
};
