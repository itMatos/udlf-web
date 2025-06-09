import { ConfigTemplate } from "@/ts/generatorTypes";

export const outputFilesSettingsConfig: ConfigTemplate = {
  section: "OUTPUT FILES SETTINGS",
  parameters: [
    {
      key: "OUTPUT_FILE",
      value: "FALSE",
      description: "#Path of the output file (ranked lists/similarity matrix)",
    },
    {
      key: "OUTPUT_FILE_FORMAT",
      value: "",
      description: "#(RK|MATRIX): Type of output file",
      options: ["RK", "MATRIX"],
    },
    {
      key: "OUTPUT_MATRIX_TYPE",
      value: "DIST",
      description: "#(DIST|SIM): Type of matrix file to output",
      options: ["DIST", "SIM"],
    },
    {
      key: "OUTPUT_RK_FORMAT",
      value: "ALL",
      description: "#(NUM|STR|HTML|ALL): Selection of ranked lists output format",
      options: ["NUM", "STR", "HTML", "ALL"],
    },
    {
      key: "OUTPUT_FILE_PATH",
      value: "output_test_html",
      description:
        "#Path of the output file(s) (do not add the extension -> .txt, .html, and others)",
    },
    {
      key: "OUTPUT_HTML_RK_PER_FILE",
      value: 1,
      description:
        "#(TUint): Number of ranked lists for each html file (only used when OUTPUT_RK_FORMAT = HTML)",
    },
    {
      key: "OUTPUT_HTML_RK_SIZE",
      value: 20,
      description:
        "#(TUint): Number of images per ranked list (only used when OUTPUT_RK_FORMAT = HTML)",
    },
    {
      key: "OUTPUT_HTML_RK_COLORS",
      value: "TRUE",
      description:
        "#(TBool): Use colors to highlight wrong and query images (only works when EFFICIENCY_EVAL = TRUE)",
    },
    {
      key: "OUTPUT_HTML_RK_BEFORE_AFTER",
      value: "TRUE",
      description: "#(TBool): Show ranked lists before (original) and after the execution.",
    },
    {
      key: "OUTPUT_LOG_FILE_PATH",
      value: "log_test_html.txt",
      description:
        "#Path of the log file which contains information of the execution (effectiveness measures, execution time, ...)",
    },
  ],
};
