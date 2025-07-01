import axios from "axios";
import config from "./config";
import { LineContentResponse } from "./types";

const udlfApi = axios.create({
  baseURL: config.udlfApi,
});

export const executeUDLF = async (configFile: Blob, fileName: string) => {
  const formData = new FormData();
  formData.append("config_file", configFile, fileName);
  try {
    const endpointToExecute = "/execute";
    const response = await udlfApi.post(endpointToExecute, formData);
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
