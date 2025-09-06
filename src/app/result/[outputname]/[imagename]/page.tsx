"use client";
import { lineContent } from "@/services/api/models";
import { LineContentResponse } from "@/services/api/types";
import { getLineNumberByImageName, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";
import { Box, Card, CardHeader, CardMedia } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImagePage() {
  const router = useParams();
  const { imagename, outputname } = router as { imagename: string; outputname: string };
  const [lineNumber, setLineNumber] = useState<number | null>(null);
  const [imagesCurrentPage, setImagesCurrentPage] = useState<lineContent[]>([]);

  useEffect(() => {
    const fetchLineNumber = async () => {
      try {
        console.log("Fetching line number for image:", imagename);
        const lineInfo = await getLineNumberByImageName(imagename);
        console.log("Fetched line info:", lineInfo);
        setLineNumber(lineInfo.lineNumber);
        fetchResultByLine(lineInfo.lineNumber);
      } catch (error) {
        console.error(`Error fetching line number for image ${imagename}:`, error);
      }
    };
    fetchLineNumber();
  }, [imagename]);

  const fetchResultByLine = async (lineNumber: number) => {
    console.log("outputname:", outputname);
    if (lineNumber !== null) {
      try {
        const result = await getUDLFOutputFileByLine(outputname, lineNumber);
        console.log("Fetched result by line:", result);
      } catch (error) {
        console.error(`Error fetching result for line ${lineNumber}:`, error);
      }
    }
  };

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
          const imageName = image.content;
          return (
            <Card key={image.content} sx={{ p: 1, m: 1, width: 150, cursor: "pointer" }}>
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
