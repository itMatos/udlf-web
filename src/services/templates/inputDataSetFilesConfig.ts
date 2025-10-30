import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const inputDatasetFilesConfig: ConfigTemplate = {
  section: 'INPUT DATASET FILES',
  parameters: [
    {
      key: 'SIZE_DATASET',
      value: 1400, // Default value, will be dynamically calculated
      description: '#(TUint): Number of images in the dataset (automatically calculated from INPUT_FILE_LIST)',
    },
    {
      key: 'INPUT_FILE_FORMAT',
      value: 'AUTO',
      description: '#(AUTO|MATRIX|RK): Type of input file. Use AUTO  for automatic format detection',
    },
    {
      key: 'INPUT_RK_FORMAT',
      value: 'NUM',
      description: '#(NUM|STR): Format of ranked lists file (only used when INPUT_FILE_FORMAT = RK)',
      options: ['NUM', 'STR'],
    },
    {
      key: 'MATRIX_TO_RK_SORTING',
      value: 'HEAP',
      description: '#(HEAP|INSERTION): Sorting method for the first sorting (conversion of matrix to ranked lists)',
      options: ['HEAP', 'INSERTION'],
    },
    {
      key: 'NUM_INPUT_FUSION_FILES',
      value: 2,
      description: '#(TUint): Number of input files for FUSION tasks',
    },
    {
      key: 'INPUT_FILE',
      value: process.env.NEXT_PUBLIC_INPUT_FILES_DEFAULT || '',
      description: '#Path of the main input file (matrix/ranked lists) for UDL tasks',
    },
    {
      key: 'INPUT_FILE_LIST',
      value: process.env.NEXT_PUBLIC_INPUT_FILE_LIST_DEFAULT || '',
      description: '#Path of the lists file',
    },
    {
      key: 'INPUT_FILE_CLASSES',
      value: process.env.NEXT_PUBLIC_INPUT_FILE_CLASSES_DEFAULT || '',
      description: '#Path of the classes file (only used when EFFECTIVENESS_EVAL = TRUE)',
    },
    {
      key: 'INPUT_IMAGES_PATH',
      value: process.env.NEXT_PUBLIC_DATASET_IMAGES_PATH_DEFAULT || '',
      description:
        '#Path of the directory with the dataset images (this string ends with /). It is used to build the html ranked lists for output.',
    },
  ],
};
