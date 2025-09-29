import axios from 'axios';
import type { AvailablePathsResponse, DirectoryListResponse, SearchResponse } from '@/ts/types/fileExplorer';
import config from './config';

const udlfApi = axios.create({
  baseURL: config.udlfApi,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

const makeRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    console.log('Making request to endpoint:', endpoint);
    console.log('Full URL will be:', `${config.udlfApi}${endpoint}`);
    const response = await udlfApi.get<T>(endpoint);
    console.log('Response received:', response.status, response.statusText);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API request failed:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    }
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
    console.log('getAvailablePaths called');
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

  // Método de teste para debug
  testConnection: async (): Promise<void> => {
    console.log('Testing API connection...');
    try {
      // Testar primeiro o endpoint available-paths
      console.log('Testing /api/directory/available-paths...');
      const availablePaths = await makeRequest<AvailablePathsResponse>('/api/directory/available-paths');
      console.log('Available paths result:', availablePaths);

      // Testar o endpoint list sem parâmetros
      console.log('Testing /api/directory/list without parameters...');
      const rootList = await makeRequest<DirectoryListResponse>('/api/directory/list');
      console.log('Root list result:', rootList);

      // Testar o endpoint list com /app/Datasets
      console.log('Testing /api/directory/list with path=/app/Datasets...');
      const datasetsList = await makeRequest<DirectoryListResponse>('/api/directory/list?path=%2Fapp%2FDatasets');
      console.log('Datasets list result:', datasetsList);

    } catch (error) {
      console.error('Test connection failed:', error);
      throw error;
    }
  },
};
