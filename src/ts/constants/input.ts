import type { InputSettingsData } from '../interfaces/input';

export const INPUT_TYPES = [
  {
    value: 'AUTO',
    label: 'Auto',
    description: 'Use auto input format detection',
  },
  { value: 'MATRIX', label: 'Matrix', description: 'Use matrix input format' },
  {
    value: 'RK',
    label: 'Ranked lists',
    description: 'Use ranked lists input format',
  },
] as const;

export const DEFAULT_INPUT_SETTINGS: InputSettingsData = {
  inputType: 'AUTO',
  inputFiles: [process.env.NEXT_PUBLIC_INPUT_FILES_DEFAULT || ''],
  inputFileList: process.env.NEXT_PUBLIC_INPUT_FILE_LIST_DEFAULT || '',
  inputFileClasses: process.env.NEXT_PUBLIC_INPUT_FILE_CLASSES_DEFAULT || '',
  datasetImagesPath: process.env.NEXT_PUBLIC_DATASET_IMAGES_PATH_DEFAULT || '',
} as const;
