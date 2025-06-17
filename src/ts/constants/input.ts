import { InputSettingsData } from "../interfaces/input";

export const INPUT_TYPES = [
  {
    value: "AUTO",
    label: "Auto",
    description: "Use auto input format detection",
  },
  { value: "MATRIX", label: "Matrix", description: "Use matrix input format" },
  {
    value: "RK",
    label: "Ranked lists",
    description: "Use ranked lists input format",
  },
] as const;

export const DEFAULT_INPUT_SETTINGS: InputSettingsData = {
  inputType: "AUTO",
  inputFile: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/ranked_lists/AIR.txt",
  inputFileList: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/lists_mpeg7.txt",
  inputFileClasses: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/classes_mpeg7.txt",
  datasetImagesPath: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/original/",
} as const;
