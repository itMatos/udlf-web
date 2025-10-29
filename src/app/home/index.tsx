"use client";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Typography } from "@mui/material";
import Appbar from "@/components/Appbar";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();
  const goToCreateConfig = () => {
    router.push("/create-config");
  };

  const goToLoadConfig = () => {
    router.push("/load-config");
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Appbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          gap: 3,
          width: "100%",
          maxWidth: "24rem",
          margin: "0 auto",
          padding: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: "22rem",
            boxShadow: 3,
            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <CardActionArea component="a" onClick={() => goToCreateConfig()}>
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <AddIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography component="h2" gutterBottom variant="h5">
                Create New Config
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Start from scratch and create a new configuration file for your UDLF config
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", pb: 2, px: 2 }}>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                size="large"
                sx={{
                  minWidth: { xs: 150, sm: 200 },
                  width: { xs: "100%", sm: "auto" },
                }}
                variant="contained"
              >
                Get Started
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            width: "100%",
            maxWidth: "22rem",
            boxShadow: 3,
            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <CardActionArea component="a" onClick={() => goToLoadConfig()}>
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <PlayArrowIcon sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />
              <Typography component="h2" gutterBottom variant="h5">
                Run Existing Config
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Load and execute a previously saved config file
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", pb: 2, px: 2 }}>
              <Button
                color="secondary"
                endIcon={<ArrowForwardIosIcon />}
                size="large"
                sx={{
                  minWidth: { xs: 150, sm: 200 },
                  width: { xs: "100%", sm: "auto" },
                }}
                variant="contained"
              >
                Load Config
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Box>
    </Container>
  );
}
