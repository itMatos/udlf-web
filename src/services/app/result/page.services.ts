import { getUDLFOutputs } from "@/services/api/UDLF-api";

export const fetchOutputs = async () => {
  try {
    const outputFileName = "teste3-30jun.txt";
    const response = await getUDLFOutputs(outputFileName);
    console.log("Fetched outputs:", response);
  } catch (error) {
    console.error("Error fetching outputs:", error);
  }
};
