import config from './config';

export interface FileLineCountResponse {
  success: boolean;
  lineCount: number;
  filePath: string;
  error?: string;
}

export class FileService {
  private static baseUrl = config.udlfApi;

  /**
   * Counts the number of lines in a file
   * @param filePath - The path to the file to count lines from
   * @returns Promise<FileLineCountResponse> - The response with line count
   */
  static async countFileLines(filePath: string): Promise<FileLineCountResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/count-file-lines?filePath=${encodeURIComponent(filePath)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error counting file lines:', error);
      return {
        success: false,
        lineCount: 0,
        filePath,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
