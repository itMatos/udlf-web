import axios from 'axios';
import config from './config';
import type { lineContent, PaginatedResponse } from './models';
import type { ImageNameLineMatch, InputFileDetail, LineContentResponse } from './types';

const udlfApi = axios.create({
  baseURL: config.udlfApi,
});

/**
 * Função interna para lidar com a lógica de download de arquivos.
 * @param fileName O nome completo do arquivo a ser baixado (ex: "output_meuarquivo.txt", "log_config.log").
 * @param endpoint O endpoint da API para download (ex: "/download-output/").
 */
const performDownload = async (fileName: string, endpoint: string) => {
  const fullEndpoint = `${endpoint}${fileName}`;

  try {
    const response = await udlfApi.get<Blob>(fullEndpoint, {
      responseType: 'blob', // Importante para receber dados binários
    });

    // Cria uma URL temporária para o Blob recebido
    const url = window.URL.createObjectURL(response.data);

    // Cria um link oculto e simula um clique para iniciar o download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // Define o nome do arquivo para download
    document.body.appendChild(link);
    link.click();

    // Limpa: remove o link e revoga a URL temporária
    link.remove();
    window.URL.revokeObjectURL(url);

    console.log(`File ${fileName} downloaded successfully!`);
  } catch (error) {
    console.error(`Error downloading file ${fileName}:`, error);
    // Relança o erro para que o chamador possa tratá-lo
    throw error;
  }
};

/**
 * Baixa um arquivo de saída formatado como "output_[nomeArquivo].txt".
 * @param outputFileName O nome base do arquivo de saída (ex: "meuarquivo").
 */
export const downloadOutputFile = async (outputFileName: string) => {
  const fileName = `output_${outputFileName}.txt`;
  await performDownload(fileName, '/download-output/');
};

/**
 * Baixa um arquivo de log formatado como "log_[nomeConfig]".
 * @param configFileName O nome base do arquivo de configuração (ex: "config_01.json").
 */
export const downloadLogFile = async (configFileName: string) => {
  const fileName = `log_${configFileName}`;
  await performDownload(fileName, '/download-output/');
};

export const uploadUDLFConfig = async (configFile: Blob, fileName: string) => {
  const formData = new FormData();
  formData.append('config_file', configFile, fileName);
  try {
    const endpointToUpload = '/upload-file';
    const response = await udlfApi.post(endpointToUpload, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading UDLF config:', error);
    throw error;
  }
};

export const executeUDLF = async (fileName: string) => {
  const formData = new FormData();
  formData.append('config_file', fileName);
  try {
    const endpointToExecute = `/execute/${fileName}`;
    const response = await udlfApi.get(endpointToExecute);
    return response.data;
  } catch (error) {
    console.error('Error executing UDLF:', error);
    throw error;
  }
};

export const getUDLFOutputs = async (outputFileName: string) => {
  try {
    const endpointToGetOutputs = `/output-file/${outputFileName}`;
    const response = await udlfApi.get(endpointToGetOutputs);
    return response.data;
  } catch (error) {
    console.error('Error fetching UDLF outputs:', error);
    throw error;
  }
};

export const getUDLFOutputFileByLine = async (outputFileName: string, lineNumber: number) => {
  try {
    const endpointToGetOutputFileByLine = `/outputs/${outputFileName}/line/${lineNumber}`;
    const response = await udlfApi.get(endpointToGetOutputFileByLine);
    return response.data as LineContentResponse;
  } catch (error) {
    console.error('Error fetching UDLF output file by line:', error);
    throw error;
  }
};

export const getImageNamesByIndexesList = async (lineNumbers: number[], configFileName?: string) => {
  const indexesAsString = lineNumbers.join(',');
  let endpointToGetImageName = `/file-input-name-by-index?indexList=${indexesAsString}`;
  
  if (configFileName) {
    endpointToGetImageName += `&configFile=${configFileName}`;
  }
  
  console.log("Fetching image names from:", endpointToGetImageName);

  try {
    const response = await udlfApi.get(endpointToGetImageName);
    return response.data as lineContent[];
  } catch (error) {
    console.error('Error fetching image name by line number:', error);
    throw error;
  }
};

export const getImageDetailsByLineNumbers = async (lineNumbers: number[], configFileName?: string): Promise<InputFileDetail> => {
  const indexesAsString = lineNumbers.join(',');
  let endpointToGetImageDetails = `/file-input-details-by-line-numbers?lineNumbers=${indexesAsString}`;
  
  if (configFileName) {
    endpointToGetImageDetails += `&configFile=${configFileName}`;
  }

  try {
    const response = await udlfApi.get(endpointToGetImageDetails);
    return response.data as InputFileDetail;
  } catch (error) {
    console.error('Error fetching image details by line numbers:', error);
    throw error;
  }
}

export const getLineNumberByImageName = async (imageName: string, configFileName: string): Promise<ImageNameLineMatch> => {
  let endpointToGetLineNumber = `/teste/get-line-by-image-name/${imageName}?configFile=${configFileName}`;
  try {
    const response = await udlfApi.get(endpointToGetLineNumber);
    return response.data as ImageNameLineMatch;
  } catch (error) {
    console.error('Error fetching line number by image name:', error);
    throw error;
  }
};

export const getImageFileByName = async (imageFileName: string, configFileName?: string) => {
  let endpointToGetImageFile = `/image-file/${imageFileName}`;
  
  if (configFileName) {
    endpointToGetImageFile += `?configFile=${configFileName}`;
  }
  
  try {
    const response = await udlfApi.get(endpointToGetImageFile, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching image file by name:', error);
  }
};

export const getPaginatedListFilenames = async (
  filename: string,
  page: number,
  pageSize: number,
  configFileName?: string
): Promise<PaginatedResponse> => {
  const endpointToGetPaginatedList = `/paginated-file-list/${filename}/page/${page}`;
  const params: any = {
    filename,
    page,
    pageSize,
  };
  
  if (configFileName) {
    params.configFile = configFileName;
  }
  
  const response = await udlfApi.get(endpointToGetPaginatedList, { params });
  return response.data as PaginatedResponse;
};

export const getAllFilenames = async (filename: string, configFileName?: string): Promise<string[]> => {
  let endpointToGetAllFilenames = `/get-all-input-file-names`;
  
  if (configFileName) {
    endpointToGetAllFilenames += `?configFile=${configFileName}`;
  }
  
  const response = await udlfApi.get(endpointToGetAllFilenames);
  return response.data as string[];
}

export const getAllClasses = async (filename: string, configFileName?: string): Promise<string[]> => {
  let endpointToGetAllClasses = `/grouped-input-class-names`;
  
  if (configFileName) {
    endpointToGetAllClasses += `?configFile=${configFileName}`;
  }
  
  const response = await udlfApi.get(endpointToGetAllClasses);
  return response.data as string[];
}

export const getInputFileDetailsByName = async (filename: string, configFileName?: string): Promise<any> => {
  let endpointToGetInputFileDetails = `/input-file-details-by-name`;
  
  if (configFileName) {
    endpointToGetInputFileDetails += `?configFile=${configFileName}`;
  }
  
  const response = await udlfApi.get(endpointToGetInputFileDetails);
  return response.data;
}

export const getInputFileDetailsByIndexesList = async (configFileName?: string): Promise<InputFileDetail> => {
  let endpointToGetInputFilenamesDetails = `/file-input-details-by-line-numbers`;
  
  if (configFileName) {
    endpointToGetInputFilenamesDetails += `?configFile=${configFileName}`;
  }
  
  const response = await udlfApi.get(endpointToGetInputFilenamesDetails);
  return response.data as InputFileDetail;
};

// New function that uses the config-specific route (recommended)
export const getPaginatedListFilenamesByConfig = async (
  configFileName: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse> => {
  const endpointToGetPaginatedList = `/paginated-file-list-by-config/${configFileName}/page/${page}`;
  const params = {
    pageSize,
  };
  
  const response = await udlfApi.get(endpointToGetPaginatedList, { params });
  return response.data as PaginatedResponse;
};
