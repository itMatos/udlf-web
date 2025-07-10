"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Appbar from "@/components/Appbar";
import { getImageNameByLineNumber, getUDLFOutputFileByLine } from "@/services/api/UDLF-api";
import { IMAGES_PER_PAGE_DEFAULT } from "@/ts/constants/common";
import { useParams } from "next/navigation";

export default function Result() {
  const router = useParams();
  let outputname = router?.outputname || "";
  if (Array.isArray(outputname)) {
    outputname = outputname[0] || "";
  }
  console.log("Output name from params:", outputname);
  console.log("Router:", router);

  console.log("Output file name from query:", outputname);
  const [lineContent, setLineContent] = useState<string>("");
  const [imagesPerPage, setImagesPerPage] = useState<number>(IMAGES_PER_PAGE_DEFAULT);
  const [imagesToShow, setImagesToShow] = useState<number[]>([]);
  const [objectIndexNameFile, setObjectIndexNameFile] = useState<{ [key: number]: string }>({});

  const fetchOutputFileByLine = async (lineNumber: number) => {
    try {
      const response = await getUDLFOutputFileByLine(outputname, lineNumber);
      console.log(`Fetched output for line ${lineNumber}:`, response);
      setLineContent(response.lineContent || "");
    } catch (error) {
      console.error(`Error fetching output for line ${lineNumber}:`, error);
    }
  };

  useEffect(() => {
    fetchOutputFileByLine(1);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = Number(event.target.value);
    setImagesPerPage(selectedValue);
  };

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "100%",
          p: 2,
        }}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Images</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={imagesPerPage.toString()}
            label="images"
            onChange={handleChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <h1>Resultados</h1>
      {objectIndexNameFile && Object.keys(objectIndexNameFile).length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
          }}
        >
          {imagesToShow.map((imageIndex) => (
            <Card key={imageIndex} sx={{ p: 1, m: 1, width: 150, cursor: "pointer" }}>
              <CardHeader subheader={`${objectIndexNameFile[imageIndex]}`} />
              <CardMedia
                component="img"
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
