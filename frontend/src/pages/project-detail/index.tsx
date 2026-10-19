import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPhases } from "../../api/phase-api";
import { project } from "../../data/project";
import { PageBreadcrumbs, PageIntro } from "../../components/core";
import { SiteLayout } from "../../components/layouts";
import { SectionTabs, ZoneCard } from "../../components/composites";
import styles from "./style.module.scss";

const PAGE_SIZE = 4;

export function ProjectDetailPage() {
  const [page, setPage] = useState(1);
  const {
    data: response,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["phases", 100, page, PAGE_SIZE],
    queryFn: () =>
      getPhases({
        pageNumber: page - 1,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  });

  const phases = response?.data ?? [];
  const totalPages = response?.totalPages ?? 0;

  return (
    <SiteLayout>
      <Container>
        <PageBreadcrumbs
          items={[{ label: "Dự án" }, { label: "Vinhomes Ocean Park 3" }]}
        />
        <PageIntro title={project.name} subtitle={project.tagline} />

        <Box
          id="tong-quan"
          sx={{
            position: "relative",
            mb: { xs: 2, md: 2.5 },
            overflow: "hidden",
            borderRadius: 1.5,
            bgcolor: "#e7f6fb",
          }}
        >
          <Box
            component="img"
            src={project.heroImage}
            alt="Toàn cảnh Vinhomes Ocean Park 2 và 3"
            sx={{
              width: "100%",
              height: "auto",
              aspectRatio: { xs: "1.35", sm: "1.9" },
              objectFit: "cover",
              objectPosition: "center 58%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: 13,
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.7,
            }}
          >
            {[0, 1, 2].map((item) => (
              <Box
                key={item}
                sx={{
                  width: item === 0 ? 21 : 7,
                  height: 7,
                  borderRadius: 999,
                  bgcolor: item === 0 ? "#0aaed0" : "rgba(255,255,255,.86)",
                }}
              />
            ))}
          </Box>
        </Box>

        <SectionTabs active="zones" />

        <Box
          id="phan-khu"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0,1fr))",
              lg: "repeat(4, minmax(0,1fr))",
            },
            gap: { xs: 3, md: 2.2 },
            mt: { xs: 3, md: 3.5 },
            opacity: isFetching && !isPending ? 0.55 : 1,
            transition: "opacity 160ms ease",
          }}
          aria-busy={isFetching}
        >
          {isPending && (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Alert severity="error" sx={{ gridColumn: "1 / -1" }}>
              {error instanceof Error
                ? error.message
                : "Không thể tải danh sách phân khu"}
            </Alert>
          )}

          {!isPending && !isError && phases.length === 0 && (
            <Typography sx={{ gridColumn: "1 / -1", py: 4 }}>
              Chưa có phân khu nào.
            </Typography>
          )}

          {phases.map((phase) => (
            <ZoneCard key={phase.id} phase={phase} />
          ))}
        </Box>

        {!isPending && !isError && totalPages > 1 && (
          <Box
            component="nav"
            aria-label="Phân trang phân khu"
            className={styles.paginationNav}
          >
            <Pagination
              className={styles.pagination}
              page={page}
              count={totalPages}
              onChange={(_, nextPage) => setPage(nextPage)}
              disabled={isFetching}
              shape="rounded"
              showFirstButton
              showLastButton
              siblingCount={0}
            />
          </Box>
        )}
      </Container>
    </SiteLayout>
  );
}
