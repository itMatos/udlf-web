export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  lastModified: string;
}

export interface DirectoryListResponse {
  success: boolean;
  data: {
    currentPath: string;
    parentPath: string;
    items: FileItem[];
    totalItems: number;
  };
}

export interface AvailablePathsResponse {
  success: boolean;
  data: {
    rootPath: string;
    availablePaths: {
      name: string;
      path: string;
      description: string;
    }[];
  };
}

export interface SearchResponse {
  success: boolean;
  data: {
    searchPath: string;
    fileName: string;
    maxDepth: number;
    results: FileItem[];
    totalFound: number;
  };
}

export interface FileExplorerProps {
  onFileSelect: (filePath: string) => void;
  selectedFiles?: string[];
  multiple?: boolean;
  fileExtensions?: string[];
  allowDirectorySelection?: boolean;
}
