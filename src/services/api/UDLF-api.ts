import axios from "axios";
import config from "./config";
import { LineContentResponse } from "./types";

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
      responseType: "blob", // Importante para receber dados binários
    });

    // Cria uma URL temporária para o Blob recebido
    const url = window.URL.createObjectURL(response.data);

    // Cria um link oculto e simula um clique para iniciar o download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Define o nome do arquivo para download
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
  await performDownload(fileName, "/download-output/");
};

/**
 * Baixa um arquivo de log formatado como "log_[nomeConfig]".
 * @param configFileName O nome base do arquivo de configuração (ex: "config_01.json").
 */
export const downloadLogFile = async (configFileName: string) => {
  const fileName = `log_${configFileName}`;
  await performDownload(fileName, "/download-output/");
};

export const uploadUDLFConfig = async (configFile: Blob, fileName: string) => {
  const formData = new FormData();
  formData.append("config_file", configFile, fileName);
  try {
    const endpointToUpload = "/upload-file";
    const response = await udlfApi.post(endpointToUpload, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading UDLF config:", error);
    throw error;
  }
};

export const executeUDLF = async (fileName: string) => {
  const formData = new FormData();
  formData.append("config_file", fileName);
  try {
    const endpointToExecute = "/execute/" + fileName;
    const response = await udlfApi.get(endpointToExecute);
    return response.data;
  } catch (error) {
    console.error("Error executing UDLF:", error);
    throw error;
  }
};

export const getUDLFOutputs = async (outputFileName: string) => {
  try {
    const endpointToGetOutputs = `/output-file/${outputFileName}`;
    const response = await udlfApi.get(endpointToGetOutputs);
    return response.data;
  } catch (error) {
    console.error("Error fetching UDLF outputs:", error);
    throw error;
  }
};

export const getUDLFOutputFileByLine = async (outputFileName: string, lineNumber: number) => {
  try {
    const endpointToGetOutputFileByLine = `/outputs/${outputFileName}/line/${lineNumber}`;
    const response = await udlfApi.get(endpointToGetOutputFileByLine);
    return response.data as LineContentResponse;
  } catch (error) {
    console.error("Error fetching UDLF output file by line:", error);
    throw error;
  }
};

export const getImageNameByLineNumber = async (lineNumber: number) => {
  const endpointToGetImageName = `/file-name-by-index/${lineNumber}`;
  try {
    const response = await udlfApi.get(endpointToGetImageName);
    return response.data as LineContentResponse;
  } catch (error) {
    console.error("Error fetching image name by line number:", error);
    throw error;
  }
};

export const getImageFileByName = async (imageFileName: string) => {
  const endpointToGetImageFile = `/image-file/${imageFileName}`;
  try {
    const response = await udlfApi.get(endpointToGetImageFile, {
      responseType: "blob", // Ensure the response is treated as a Blob
    });
    return response.data; // This will be a Blob
  } catch (error) {
    console.error("Error fetching image file by name:", error);
    throw error;
  }
};
