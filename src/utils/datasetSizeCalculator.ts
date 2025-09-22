import { FileService } from '@/services/api/fileService';
import { countFileLines, countFileLinesFromUrl } from './helpers';

export interface DatasetSizeCalculationResult {
  success: boolean;
  size: number;
  error?: string;
}

/**
 * Calculates the dataset size based on the INPUT_FILE_LIST file
 * @param inputFileList - The path to the input file list
 * @param isLocalFile - Whether the file is a local file (File object) or a URL/path
 * @returns Promise<DatasetSizeCalculationResult> - The calculated size and status
 */
export const calculateDatasetSize = async (
  inputFileList: string | File,
  isLocalFile: boolean = false
): Promise<DatasetSizeCalculationResult> => {
  try {
    let lineCount: number;

    if (isLocalFile && inputFileList instanceof File) {
      // Count lines from a local File object
      lineCount = await countFileLines(inputFileList);
    } else if (typeof inputFileList === 'string') {
      // Check if it's a URL or a local file path
      if (inputFileList.startsWith('http://') || inputFileList.startsWith('https://')) {
        // It's a URL, fetch and count lines
        lineCount = await countFileLinesFromUrl(inputFileList);
      } else {
        // It's a local file path, use the API to count lines
        const result = await FileService.countFileLines(inputFileList);
        if (!result.success) {
          return {
            success: false,
            size: 1400, // fallback to default
            error: result.error || 'Failed to count file lines'
          };
        }
        lineCount = result.lineCount;
      }
    } else {
      throw new Error('Invalid input file list type');
    }

    return {
      success: true,
      size: lineCount
    };
  } catch (error) {
    console.error('Error calculating dataset size:', error);
    return {
      success: false,
      size: 1400, // fallback to default
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Updates the SIZE_DATASET parameter in a config template
 * @param configTemplate - The config template to update
 * @param newSize - The new size value
 * @returns Updated config template
 */
export const updateDatasetSizeInConfig = (configTemplate: any, newSize: number) => {
  return {
    ...configTemplate,
    parameters: configTemplate.parameters.map((param: any) => 
      param.key === 'SIZE_DATASET' 
        ? { ...param, value: newSize }
        : param
    )
  };
};
