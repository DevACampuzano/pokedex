import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import styles from "./styles";
import usePokemon from "./usePokemon";
import Card from "./components/Card";
import LoadingCard from "./components/LoadingCard";

// Hola! I'm a comment!

function App() {
  const { data, count, getData, loading } = usePokemon();

  return (
    <Stack>
      <Stack
        direction="row"
        component="header"
        justifyContent="space-between"
        alignItems="center"
        padding={"24px"}
        sx={{ backgroundColor: "#222222" }}
      >
        <Button
          variant="contained"
          onClick={() => getData("previous")}
          sx={{ visibility: count === 1 ? "hidden" : "" }}
        >
          Previous
        </Button>
        <Stack sx={styles.currentPage}>
          <Typography sx={{ m: 0 }} fontSize={16} fontWeight={700}>
            {count}
          </Typography>
        </Stack>

        <Button variant="contained" onClick={() => getData("next")}>
          Next
        </Button>
      </Stack>
      {loading && <LinearProgress />}
      <Stack
        component="main"
        sx={styles.root}
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        alignContent="center"
        p={5}
        gap={5}
      >
        {loading
          ? Array.from({ length: 20 }).map((_, index) => (
              <LoadingCard key={index} checked={loading} />
            ))
          : data.results.map((item) => (
              <Card
                name={item.name}
                url={item.url}
                key={item.name}
                checked={!loading}
              />
            ))}
      </Stack>
    </Stack>
  );
}

export default App;
