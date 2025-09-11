"use client";
import { lineContent } from "@/services/api/models";
import { LineContentResponse } from "@/services/api/types";
import { getImageNamesByIndexesList, getLineNumberByImageName, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";
import { Box, Card, CardHeader, CardMedia } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_RESULT_IMAGES = 20;

export default function ImagePage() {
  const params = useParams();
  const router = useRouter();
  const { imagename, outputname } = params as { imagename: string; outputname: string };
  const [indexesResultByCurrentInput, setIndexesResultByCurrentInput] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<lineContent[]>([]);

  useEffect(() => {
    const fetchLineNumber = async () => {
      try {
        console.log("Fetching line number for image:", imagename);
        const lineInfo = await getLineNumberByImageName(imagename);
        // essa é a linha do arquivo de input selecionado
        console.log("Fetched line info:", lineInfo);
        getListIndexesResultByLine(lineInfo.lineNumber);
      } catch (error) {
        console.error(`Error fetching line number for image ${imagename}:`, error);
      }
    };
    fetchLineNumber();
  }, [imagename]);

  const getListIndexesResultByLine = async (lineNumber: number) => {
    console.log("outputname:", outputname);
    if (lineNumber !== null) {
      try {
        const result = await getUDLFOutputFileByLine(outputname, lineNumber);
        console.log("Fetched result by line:", result);
        setIndexesResultByCurrentInput(result.lineContent);
      } catch (error) {
        console.error(`Error fetching result for line ${lineNumber}:`, error);
      }
    }
  };

  useEffect(() => {
    if (indexesResultByCurrentInput !== null) {
      const lineNumbers = indexesResultByCurrentInput
        .split(" ")
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !Number.isNaN(num));
      console.log("Parsed line numbers:", lineNumbers);
      if (lineNumbers.length > MAX_RESULT_IMAGES) {
        lineNumbers.splice(MAX_RESULT_IMAGES);
      }
      console.log("Line numbers to fetch images for:", lineNumbers);
      // Fetch image names for these line numbers
      const fetchImageNames = async () => {
        try {
          const imageNames = await getImageNamesByIndexesList(lineNumbers);
          console.log("Fetched image names:", imageNames);
          setSimilarImages(imageNames);
        } catch (error) {
          console.error(`Error fetching image names for line numbers ${lineNumbers}:`, error);
        }
      };
      fetchImageNames();
    }
  }, [indexesResultByCurrentInput]);

  return (
    <div>
      <h1>Ranked list for image: {imagename} </h1>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {similarImages.map((image) => {
          const imageName = image.fileInputNameLine;
          return (
            <Card
              key={image.fileInputNameLine}
              sx={{ p: 1, m: 1, width: 150, cursor: "pointer" }}
              onClick={() => router.replace(`/result/${outputname}/${imageName}`)}
            >
              <CardHeader subheader={`${imageName}`} />
              <CardMedia alt={`${imageName}`} component="img" image={`http://localhost:8080/image-file/${imageName}`} />
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
