import { ConfigTemplate } from "@/ts/generatorTypes";

export const inputDatasetFilesConfig: ConfigTemplate = {
  section: "INPUT DATASET FILES",
  parameters: [
    {
      key: "SIZE_DATASET",
      value: 1400,
      description: "#(TUint): Number of images in the dataset",
    },
    {
      key: "INPUT_FILE_FORMAT",
      value: "AUTO",
      description:
        "#(AUTO|MATRIX|RK): Type of input file. Use AUTO  for automatic format detection",
    },
    {
      key: "INPUT_RK_FORMAT",
      value: "NUM",
      description:
        "#(NUM|STR): Format of ranked lists file (only used when INPUT_FILE_FORMAT = RK)",
      options: ["NUM", "STR"],
    },
    {
      key: "MATRIX_TO_RK_SORTING",
      value: "HEAP",
      description:
        "#(HEAP|INSERTION): Sorting method for the first sorting (conversion of matrix to ranked lists)",
      options: ["HEAP", "INSERTION"],
    },
    {
      key: "NUM_INPUT_FUSION_FILES",
      value: 2,
      description: "#(TUint): Number of input files for FUSION tasks",
    },
    {
      key: "INPUT_FILE",
      value: "./../Datasets/mpeg7/ranked_lists/AIR.txt",
      description:
        "#Path of the main input file (matrix/ranked lists) for UDL tasks",
    },
    {
      key: "INPUT_FILE_LIST",
      value: "./../Datasets/mpeg7/lists_mpeg7.txt",
      description: "#Path of the lists file",
    },
    {
      key: "INPUT_FILE_CLASSES",
      value: "./../Datasets/mpeg7/classes_mpeg7.txt",
      description:
        "#Path of the classes file (only used when EFFECTIVENESS_EVAL = TRUE)",
    },
    {
      key: "INPUT_IMAGES_PATH",
      value: "./../Datasets/mpeg7/images/",
      description:
        "#Path of the directory with the dataset images (this string ends with /). It is used to build the html ranked lists for output.",
    },
  ],
};
