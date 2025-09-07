"use client";
import { lineContent } from "@/services/api/models";
import { LineContentResponse } from "@/services/api/types";
import { getImageNamesByIndexesList, getLineNumberByImageName, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";
import { Box, Card, CardHeader, CardMedia } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_RESULT_IMAGES = 20;

export default function ImagePage() {
  const router = useParams();
  const { imagename, outputname } = router as { imagename: string; outputname: string };
  const [lineNumber, setLineNumber] = useState<number | null>(null);
  const [indexesResultByCurrentInput, setIndexesResultByCurrentInput] = useState<string | null>(null);
  const [imagesCurrentPage, setImagesCurrentPage] = useState<lineContent[]>([]);

  useEffect(() => {
    const fetchLineNumber = async () => {
      try {
        console.log("Fetching line number for image:", imagename);
        const lineInfo = await getLineNumberByImageName(imagename);
        // essa é a linha do arquivo de input selecionado
        console.log("Fetched line info:", lineInfo);
        setLineNumber(lineInfo.lineNumber);
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
          console.log("Fetched image namessss:", imageNames);
          setImagesCurrentPage(imageNames);
        } catch (error) {
          console.error(`Error fetching image names for line numbers ${lineNumbers}:`, error);
        }
      };
      fetchImageNames();
    }
  }, [indexesResultByCurrentInput]);

  return (
    <div>
      <h1>Image Page</h1>
      <p>Image Name: {imagename}</p>
      <p>Line Number: {lineNumber !== null ? lineNumber : "Loading..."}</p>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {imagesCurrentPage.map((image) => {
          const imageName = image.fileInputNameLine;
          return (
            <Card key={image.fileInputNameLine} sx={{ p: 1, m: 1, width: 150, cursor: "pointer" }}>
              <CardHeader subheader={`${imageName}`} />
              <CardMedia
                alt={`${imageName}`}
                component="img"
                image={`http://localhost:8080/image-file/${imageName}`}
                onClick={() => (window.location.href = `/result/${outputname}/${imageName}`)}
              />
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
