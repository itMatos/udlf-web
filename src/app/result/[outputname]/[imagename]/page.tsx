"use client";
import { Box, MenuItem, Select, type SelectChangeEvent, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ImageCard } from "@/components/Results/ImageCard";
import config from "@/services/api/config";
import type { InputFileDetail } from "@/services/api/types";
import { getImageDetailsByLineNumbers, getLineNumberByImageName, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";

const MAX_RESULT_IMAGES = 20;
const OUTPUT_PREFIX_REGEX = /^output_/;
const TXT_SUFFIX_REGEX = /\.txt$/;

export default function ImagePage() {
  const params = useParams();
  const router = useRouter();
  const { imagename, outputname } = params as { imagename: string; outputname: string };

  // Extract config file name from output name
  // e.g., "output_ContextRR_3m172i0.ini.txt" -> "ContextRR_3m172i0.ini"
  const getConfigFileName = useCallback((outputName: string): string => {
    // Remove "output_" prefix and ".txt" suffix
    const withoutPrefix = outputName.replace(OUTPUT_PREFIX_REGEX, "");
    const withoutSuffix = withoutPrefix.replace(TXT_SUFFIX_REGEX, "");
    return withoutSuffix;
  }, []);

  const configFileName = getConfigFileName(outputname);
  const [indexesResultByCurrentInput, setIndexesResultByCurrentInput] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<InputFileDetail | null>(null);
  const [aspectRatio, setAspectRatio] = useState<"original" | "square">("square");
  const [currentImageClass, setCurrentImageClass] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

  const getListIndexesResultByLine = useCallback(
    async (lineNumber: number) => {
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
    },
    [outputname]
  );

  useEffect(() => {
    const fetchLineNumber = async () => {
      try {
        console.log("Fetching line number for image:", imagename);
        const lineInfo = await getLineNumberByImageName(imagename, configFileName);
        console.log("Fetched line info:", lineInfo);
        getListIndexesResultByLine(lineInfo.lineNumber);
      } catch (error) {
        console.error(`Error fetching line number for image ${imagename}:`, error);
      }
    };
    fetchLineNumber();
  }, [imagename, configFileName, getListIndexesResultByLine]);

  useEffect(() => {
    if (indexesResultByCurrentInput !== null) {
      const lineIndexes = indexesResultByCurrentInput
        .split(" ")
        .map((num) => Number.parseInt(num.trim(), 10))
        .filter((num) => !Number.isNaN(num));
      if (lineIndexes.length > MAX_RESULT_IMAGES) {
        lineIndexes.splice(MAX_RESULT_IMAGES);
      }
      console.log("Line numbers to fetch images for:", lineIndexes);
      // Fetch image names for these line numbers
      const fetchImageNames = async () => {
        try {
          const imagesDetails = await getImageDetailsByLineNumbers(lineIndexes, configFileName);
          console.log("Fetched image details for line numbers:", imagesDetails);
          setSimilarImages(imagesDetails);
          console.log("Similar images set to:", imagesDetails);
          setCurrentImageClass(imagesDetails[imagename].class);
          console.log(`Image ${imagename} is of class ${imagesDetails[imagename].class} and index ${imagesDetails[imagename].lineIndexInInputFile}`);
          // Reset loading states when images change
          setLoadingImages(new Set());
          setLoadedImages(new Set());
          setErrorImages(new Set());
        } catch (error) {
          console.error(`Error fetching image names for line numbers ${lineIndexes}:`, error);
        }
      };
      fetchImageNames();
    }
  }, [indexesResultByCurrentInput, imagename, configFileName]);

  const handleAspectRatioChange = (event: SelectChangeEvent) => {
    setAspectRatio(event.target.value as "original" | "square");
  };

  const handleImageLoad = (imageKey: string) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageKey);
      return newSet;
    });
    setLoadedImages((prev) => new Set(prev).add(imageKey));
  };

  const handleImageError = (imageKey: string) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageKey);
      return newSet;
    });
    setErrorImages((prev) => new Set(prev).add(imageKey));
  };

  const handleImageStartLoad = (imageKey: string) => {
    const isNotLoaded = !loadedImages.has(imageKey);
    const hasNoError = !errorImages.has(imageKey);
    if (isNotLoaded && hasNoError) {
      setLoadingImages((prev) => new Set(prev).add(imageKey));
    }
  };

  const getCardBorder = (imageKey: string) => {
    if (imageKey === imagename) {
      return (theme: { palette: { success: { main: string } } }) => `2px solid ${theme.palette.success.main}`;
    }
    if (similarImages && similarImages[imageKey]?.class !== currentImageClass) {
      return (theme: { palette: { error: { main: string } } }) => `2px solid ${theme.palette.error.main}`;
    }
    return "none";
  };

  return (
    <div>
      <h1>Ranked list for image: {imagename} </h1>
      <Box sx={{ my: 2, mx: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Typography sx={{ mr: 2 }} variant="body1">
          Aspect Ratio:
        </Typography>
        <Select
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          onChange={handleAspectRatioChange}
          sx={{
            width: 150,
          }}
          value={aspectRatio}
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
            const isLoading = loadingImages.has(imageKey);
            const hasError = errorImages.has(imageKey);
            const imageUrl = `${config.udlfApi}/image-file/${imageKey}?configFile=${configFileName}`;
            const cardBorder = getCardBorder(imageKey);

            return (
              <Box
                key={imageKey}
                sx={{
                  border: cardBorder,
                  borderRadius: 1,
                }}
              >
                <ImageCard
                  aspectRatio={aspectRatio}
                  hasError={hasError}
                  imageKey={imageKey}
                  imageUrl={imageUrl}
                  isLoading={isLoading}
                  onClick={() => router.replace(`/result/${outputname}/${imageKey}`)}
                  onError={() => handleImageError(imageKey)}
                  onLoad={() => handleImageLoad(imageKey)}
                  onLoadStart={() => handleImageStartLoad(imageKey)}
                />
              </Box>
            );
          })}
      </Box>
    </div>
  );
}
