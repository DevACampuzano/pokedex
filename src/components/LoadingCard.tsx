import { Card, Fade, Skeleton, Stack } from "@mui/material";

const LoadingCard = ({ checked }: { checked: boolean }) => {
  return (
    <Fade in={checked}>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: "#222222",
        }}
      >
        <Skeleton
          sx={{ height: "345px", width: "345px", bgcolor: "grey.800" }}
          variant="rectangular"
          animation="wave"
        />

        <Stack gap={1} padding={2}>
          <Skeleton
            sx={{ height: 40, width: "50%", bgcolor: "grey.800", mt: 2 }}
            variant="text"
            animation="wave"
          />

          <Stack gap={1}>
            <Skeleton
              sx={{ height: 25, width: "60%", bgcolor: "grey.800" }}
              variant="text"
              animation="wave"
            />
            <Skeleton
              sx={{ height: 25, width: "70%", bgcolor: "grey.800" }}
              variant="text"
              animation="wave"
            />
            <Skeleton
              sx={{ height: 30, width: "90%", bgcolor: "grey.800" }}
              variant="text"
              animation="wave"
            />
          </Stack>
        </Stack>
      </Card>
    </Fade>
  );
};

export default LoadingCard;
