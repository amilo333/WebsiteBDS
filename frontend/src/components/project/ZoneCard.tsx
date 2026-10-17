import { Box, Card, CardContent, Typography } from "@mui/material";
import type { Phase } from "../../types/project";
import fallbackImage from "../../assets/projects/phankhu.png";

interface ZoneCardProps {
  phase: Phase;
}

export function ZoneCard({ phase }: ZoneCardProps) {
  const name = phase.name.trim() || "Chưa có tên";
  const image = phase.fileInfo?.fullLink || fallbackImage;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 0,
        overflow: "visible",
        bgcolor: "transparent",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={`Phối cảnh ${name}`}
        loading="lazy"
        sx={{
          width: "100%",
          aspectRatio: "1.45",
          objectFit: "cover",
          borderRadius: 1.5,
        }}
      />

      <CardContent sx={{ px: 0, pt: 1.3, pb: "0 !important" }}>
        <Typography
          sx={{
            color: "#174da6",
            fontSize: 12.5,
            fontWeight: 600,
            mb: 0.8,
          }}
        >
          {name}
        </Typography>

        <Typography sx={{ fontSize: 11, color: "#6b7890" }}>
          {phase.shortDescription?.trim() || "Thông tin đang được cập nhật"}
        </Typography>
      </CardContent>
    </Card>
  );
}
