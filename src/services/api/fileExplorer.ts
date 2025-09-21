import type { AvailablePathsResponse, DirectoryListResponse, SearchResponse } from '@/ts/types/fileExplorer';
import config from './config';

const API_BASE_URL = config.udlfApi;

const makeRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const FileExplorerService = {
  listDirectory: (path?: string): Promise<DirectoryListResponse> => {
    const queryParam = path ? `?path=${encodeURIComponent(path)}` : '';
    return makeRequest<DirectoryListResponse>(`/api/directory/list${queryParam}`);
  },

  getAvailablePaths: (): Promise<AvailablePathsResponse> => {
    return makeRequest<AvailablePathsResponse>('/api/directory/available-paths');
  },

  searchFiles: (fileName: string, searchPath?: string, maxDepth?: number): Promise<SearchResponse> => {
    const params = new URLSearchParams({
      fileName,
      ...(searchPath && { path: searchPath }),
      ...(maxDepth && { maxDepth: maxDepth.toString() }),
    });

    return makeRequest<SearchResponse>(`/api/directory/search?${params.toString()}`);
  },

  getFileInfo: (path: string): Promise<Record<string, unknown>> => {
    const encodedPath = encodeURIComponent(path);
    return makeRequest<Record<string, unknown>>(`/api/directory/info/${encodedPath}`);
  },
};
