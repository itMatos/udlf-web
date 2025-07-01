"use client";
import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, LinearProgress } from "@mui/material";
import Appbar from "@/components/Appbar";
import { getImageNameByLineNumber, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";

export default function Result() {
  const [lineContent, setLineContent] = useState<string>("");
  const imagesPerPage = IMAGES_PER_PAGE_DEFAULT;
  const [imagesToShow, setImagesToShow] = useState<number[]>([]);
  const [objectIndexNameFile, setObjectIndexNameFile] = useState<{ [key: number]: string }>({});

  const fetchOutputFileByLine = async (lineNumber: number) => {
    try {
      const outputFileName = "teste3-30jun.txt";
      const response = await getUDLFOutputFileByLine(outputFileName, lineNumber);
      console.log(`Fetched output for line ${lineNumber}:`, response);
      setLineContent(response.lineContent || "");
    } catch (error) {
      console.error(`Error fetching output for line ${lineNumber}:`, error);
    }
  };

  useEffect(() => {
    fetchOutputFileByLine(1);
  }, []);

  useEffect(() => {
    if (lineContent) {
      console.log("Line content fetched:", lineContent);
      const elementsArray = lineContent.split(" ");
      const images = elementsArray.slice(0, imagesPerPage).map(Number);
      console.log("images to show:", images);
      setImagesToShow(images);
      console.log("Images to show:", images);
    } else {
      console.warn("No line content available.");
    }
  }, [lineContent, imagesPerPage]);

  useEffect(() => {
    const fetchImageNames = async () => {
      const newObject: { [key: number]: string } = {};

      for (const number of imagesToShow) {
        try {
          const imageName = await getImageNameByLineNumber(number);
          newObject[number] = imageName.lineContent;
        } catch (error) {
          console.error(`Error fetching image name for line ${number}:`, error);
        }
      }
      setObjectIndexNameFile(newObject);
    };

    fetchImageNames();
  }, [imagesToShow]);

  return (
    <React.Fragment>
      <Appbar />
      <h1>Resultados</h1>
      {objectIndexNameFile && Object.keys(objectIndexNameFile).length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {imagesToShow.map((imageIndex) => (
            <Card key={imageIndex} sx={{ p: 1 }}>
              <CardMedia
                component="img"
                height="70"
                image={"http://localhost:8080/image-file/" + objectIndexNameFile[imageIndex]}
                alt={`${objectIndexNameFile[imageIndex]}`}
              />
            </Card>
          ))}
        </Box>
      ) : (
        <LinearProgress />
      )}
    </React.Fragment>
  );
}
