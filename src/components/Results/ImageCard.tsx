import { Box, Card, CardHeader, CardMedia, Skeleton } from "@mui/material";
import type { ImageCardProps } from "@/ts/types/results";

export const ImageCard = ({ imageKey, imageUrl, isLoading, hasError, aspectRatio, onLoad, onError, onLoadStart, onClick }: ImageCardProps) => (
  <Card
    onClick={onClick}
    sx={{
      p: 1,
      m: 1,
      width: 150,
      cursor: "pointer",
    }}
  >
    <CardHeader subheader={imageKey} />
    <Box
      sx={{
        position: "relative",
        width: "100%",
        ...(aspectRatio === "square" && {
          aspectRatio: "1 / 1",
          height: 150,
        }),
      }}
    >
      {isLoading && (
        <Skeleton
          height={aspectRatio === "square" ? 150 : "100%"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 1,
          }}
          variant="rectangular"
          width="100%"
        />
      )}
      {hasError ? (
        <Box
          sx={{
            width: "100%",
            height: aspectRatio === "square" ? 150 : "auto",
            aspectRatio: aspectRatio === "square" ? "1 / 1" : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
            color: "text.secondary",
            fontSize: "0.75rem",
          }}
        >
          Erro ao carregar
        </Box>
      ) : (
        <CardMedia
          alt={imageKey}
          component="img"
          image={imageUrl}
          onError={onError}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          sx={{
            position: "relative",
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
            ...(aspectRatio === "square" && {
              aspectRatio: "1 / 1",
              objectFit: "cover",
              height: 150,
            }),
          }}
        />
      )}
    </Box>
  </Card>
);
