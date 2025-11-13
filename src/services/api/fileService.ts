import axios from 'axios';
import config, { getApiMode } from './config';

export interface FileLineCountResponse {
  success: boolean;
  lineCount: number;
  filePath: string;
  error?: string;
}

const api = axios.create({
  baseURL: config.udlfApi,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    ...(getApiMode() && { 'X-API-Mode': getApiMode() }),
  },
});

/**
 * Counts the number of lines in a file
 * @param filePath - The path to the file to count lines from
 * @returns Promise<FileLineCountResponse> - The response with line count
 */
export async function countFileLines(filePath: string): Promise<FileLineCountResponse> {
  try {
    const response = await api.get<FileLineCountResponse>(`/count-file-lines?filePath=${encodeURIComponent(filePath)}`);
    return response.data;
  } catch (error: unknown) {
    console.error('Error counting file lines:', error);
    return {
      success: false,
      lineCount: 0,
      filePath,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
