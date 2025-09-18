"use client";
import { lineContent } from "@/services/api/models";
import { InputFileDetail } from "@/services/api/types";
import {
  getAllClasses,
  getImageDetailsByLineNumbers,
  getImageNamesByIndexesList,
  getInputFileDetailsByName,
  getLineNumberByImageName,
  getUDLFOutputFileByLine,
} from "@/services/api/UDLF-api";
import { Box, Card, CardHeader, CardMedia, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_RESULT_IMAGES = 20;

export default function ImagePage() {
  const params = useParams();
  const router = useRouter();
  const { imagename, outputname } = params as { imagename: string; outputname: string };
  const [indexesResultByCurrentInput, setIndexesResultByCurrentInput] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<InputFileDetail | null>(null);
  const [aspectRatio, setAspectRatio] = useState<"original" | "square">("square");
  const [currentImageClass, setCurrentImageClass] = useState<string | null>(null);

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
      const lineIndexes = indexesResultByCurrentInput
        .split(" ")
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !Number.isNaN(num));
      if (lineIndexes.length > MAX_RESULT_IMAGES) {
        lineIndexes.splice(MAX_RESULT_IMAGES);
      }
      console.log("Line numbers to fetch images for:", lineIndexes);
      // Fetch image names for these line numbers
      const fetchImageNames = async () => {
        try {
          const imagesDetails = await getImageDetailsByLineNumbers(lineIndexes);
          console.log("Fetched image details for line numbers:", imagesDetails);
          setSimilarImages(imagesDetails);
          console.log("Similar images set to:", imagesDetails);
          setCurrentImageClass(imagesDetails[imagename].class);
          console.log(`Image ${imagename} is of class ${imagesDetails[imagename].class} and index ${imagesDetails[imagename].lineIndexInInputFile}`);
        } catch (error) {
          console.error(`Error fetching image names for line numbers ${lineIndexes}:`, error);
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
        {similarImages &&
          currentImageClass &&
          Object.keys(similarImages).map((imageKey) => {
            return (
              <Card
                key={imageKey}
                sx={{
                  p: 1,
                  m: 1,
                  width: 150,
                  cursor: "pointer",
                  border:
                    imageKey === imagename
                      ? (theme) => `2px solid ${theme.palette.success.main}`
                      : similarImages[imageKey].class !== currentImageClass
                      ? (theme) => `2px solid ${theme.palette.error.main}`
                      : "none",
                }}
                onClick={() => router.replace(`/result/${outputname}/${imageKey}`)}
              >
                <CardHeader subheader={`${imageKey}`} />
                <CardMedia
                  alt={`${imageKey}`}
                  component="img"
                  image={`http://localhost:8080/image-file/${imageKey}`}
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
