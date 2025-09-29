import axios from 'axios';
import type { AvailablePathsResponse, DirectoryListResponse, SearchResponse } from '@/ts/types/fileExplorer';
import config from './config';

const udlfApi = axios.create({
  baseURL: config.udlfApi,
});

const makeRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await udlfApi.get<T>(endpoint);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const FileExplorerService = {
  listDirectory: (path?: string): Promise<DirectoryListResponse> => {
    console.log('listDirectory', path);
    const queryParam = path ? `?path=${encodeURIComponent(path)}` : '';
    console.log('queryParam', queryParam);
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
