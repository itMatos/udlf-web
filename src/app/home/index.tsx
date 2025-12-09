"use client";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Appbar from "@/components/Appbar/Appbar";
import { addIconStyles, buttonStyles, cardActionsStyles, cardContentStyles, cardStyles, containerStyles, playIconStyles } from "./index.styles";

export default function Homepage() {
  const router = useRouter();
  const goToCreateConfig = () => {
    router.push("/create-config");
  };

  const goToLoadConfig = () => {
    router.push("/load-config");
  };

  return (
    <>
      <Appbar />
      <Box sx={containerStyles}>
        <Card sx={cardStyles}>
          <CardActionArea component="a" onClick={() => goToCreateConfig()}>
            <CardContent sx={cardContentStyles}>
              <AddIcon sx={addIconStyles} />
              <Typography component="h2" gutterBottom variant="h5">
                Create new config
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Start from scratch and create a new configuration file for your UDLF config
              </Typography>
            </CardContent>
            <CardActions sx={cardActionsStyles}>
              <Button endIcon={<ArrowForwardIosIcon />} size="large" sx={buttonStyles} variant="contained">
                Get Started
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>

        <Card sx={cardStyles}>
          <CardActionArea component="a" onClick={() => goToLoadConfig()}>
            <CardContent sx={cardContentStyles}>
              <PlayArrowIcon sx={playIconStyles} />
              <Typography component="h2" gutterBottom variant="h5">
                Run existing config
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Load and execute a previously saved config file
              </Typography>
            </CardContent>
            <CardActions sx={cardActionsStyles}>
              <Button color="secondary" endIcon={<ArrowForwardIosIcon />} size="large" sx={buttonStyles} variant="contained">
                Load Config
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
}
