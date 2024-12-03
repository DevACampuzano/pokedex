import { Button, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import styles from "../styles";
import Card from "../components/Card";
import LoadingCard from "../components/LoadingCard";
import usePokemon from "../hooks/usePokemon";
import Layout from "../components/Layout";
import { Link as RouterLink } from "react-router-dom";
const Home = () => {
  const { data, count, getData, loading } = usePokemon();
  const isSmallScreen = useMediaQuery("(max-width:810px)");

  return (
    <Layout
      loading={loading}
      contectHeaderComponent={HeaderComponent}
      headerShow
    >
      <Stack
        component="main"
        sx={styles.root}
        direction="row"
        flexWrap="wrap"
        justifyContent={!isSmallScreen ? "space-between" : "center"}
        alignContent="center"
        p={5}
        pt={0}
        gap={5}
      >
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={"10px"}
          px={"24px"}
          pt={4}
        >
          <Button
            variant="contained"
            onClick={() => getData("previous")}
            sx={{ visibility: count === 1 ? "hidden" : "" }}
          >
            Previous
          </Button>
          <Stack sx={styles.currentPage}>
            <Typography
              sx={{ m: 0, color: "#000" }}
              fontSize={16}
              fontWeight={700}
            >
              {count}
            </Typography>
          </Stack>

          <Button variant="contained" onClick={() => getData("next")}>
            Next
          </Button>
        </Stack>
        {loading
          ? Array.from({ length: 21 }).map((_, index) => (
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
    </Layout>
  );
};

const HeaderComponent = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };
  if (!token) {
    return (
      <>
        <Link
          component={RouterLink}
          sx={{
            textDecoration: "none",
          }}
          to="/login"
        >
          <Typography fontWeight={500}>Iniciar Sesión</Typography>
        </Link>
        <Link
          component={RouterLink}
          sx={{
            textDecoration: "none",
          }}
          to="/register"
        >
          <Typography fontWeight={500}>Registrarse</Typography>
        </Link>
      </>
    );
  }
  return (
    <>
      <Typography color="#fff">
        {userData?.nombre} {userData?.apellido}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <Link
          component={RouterLink}
          sx={{
            textDecoration: "none",
          }}
          to="/favotios"
        >
          <Typography fontWeight={500}>Favoritos</Typography>
        </Link>
        <Button onClick={logout} variant="contained">
          Salir
        </Button>
      </Stack>
    </>
  );
};

export default Home;
