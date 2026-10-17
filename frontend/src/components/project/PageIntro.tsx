import { useState } from "react";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

interface PageIntroProps {
  title: string;
  subtitle: string;
}

export function PageIntro({ title, subtitle }: PageIntroProps) {
  const [message, setMessage] = useState("");

  const handleShare = async () => {
    try {
      const shareUrl = new URL(window.location.href);

      shareUrl.hash = "phan-khu";

      await navigator.clipboard.writeText(shareUrl.toString());

      setMessage("Đã sao chép đường dẫn phân khu");
    } catch {
      setMessage("Không thể sao chép đường dẫn");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: { xs: 2.4, md: 3 },
        }}
      >
        <Box>
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontSize: { xs: 21, md: 27 }, mb: 0.7 }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 11.5, md: 13.5 },
              lineHeight: 1.55,
              maxWidth: 820,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<ShareOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          onClick={handleShare}
          sx={{
            minWidth: 112,
            height: 42,
            px: 2.2,
            borderRadius: 1.5,
            background: "linear-gradient(135deg,#2255c7,#00b9d4)",
          }}
        >
          Chia sẻ
        </Button>
      </Box>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={2400}
        onClose={() => setMessage("")}
        message={message}
      />
    </>
  );
}
