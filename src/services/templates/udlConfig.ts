import { ConfigTemplate } from "@/ts/generatorTypes";

export const udlConfigTemplate: ConfigTemplate = {
  section: "iNPUT DATASET FILES",
  parameters: [
    {
      key: "SIZE_DATASET",
      value: 1400,
      description: "Number of images in the dataset",
    },
  ],
};
