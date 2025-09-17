"use client";
import { lineContent } from "@/services/api/models";
import { LineContentResponse } from "@/services/api/types";
import { getImageNamesByIndexesList, getLineNumberByImageName, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";
import { Box, Card, CardHeader, CardMedia, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_RESULT_IMAGES = 20;

export default function ImagePage() {
  const params = useParams();
  const router = useRouter();
  const { imagename, outputname } = params as { imagename: string; outputname: string };
  const [indexesResultByCurrentInput, setIndexesResultByCurrentInput] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<lineContent[]>([]);
  const [aspectRatio, setAspectRatio] = useState<"original" | "square">("square");

  useEffect(() => {
    const fetchLineNumber = async () => {
      try {
        console.log("Fetching line number for image:", imagename);
        const lineInfo = await getLineNumberByImageName(imagename);
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

  const handleAspectRatioChange = (event: SelectChangeEvent) => {
    setAspectRatio(event.target.value as "original" | "square");
  };

  return (
    <div>
      <h1>Ranked list for image: {imagename} </h1>
      <Box sx={{ my: 2, mx: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Aspect Ratio:
        </Typography>
        <Select
          value={aspectRatio}
          onChange={handleAspectRatioChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            width: 150,
          }}
        >
          <MenuItem value="original">Original</MenuItem>
          <MenuItem value="square">1:1</MenuItem>
        </Select>
      </Box>
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
              <CardMedia
                alt={`${imageName}`}
                component="img"
                image={`http://localhost:8080/image-file/${imageName}`}
                sx={{
                  ...(aspectRatio === "square" && {
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    height: 150,
                  }),
                }}
              />
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
