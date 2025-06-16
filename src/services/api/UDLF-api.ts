import axios from "axios";
import config from "./config";

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
