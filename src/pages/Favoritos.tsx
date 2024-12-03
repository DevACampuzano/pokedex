/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import Layout from "../components/Layout";
import Card from "../components/Card";
import styles from "../styles";
import LoadingCard from "../components/LoadingCard";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../api";
import { Link as RouterLink } from "react-router-dom";

interface FavoritosProps {
  nombre: string;
  url: string;
  id: number;
}
const Favoritos = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FavoritosProps[]>([]);
  const isSmallScreen = useMediaQuery("(max-width:810px)");

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await api.get("/favoritos/getFavoritosByUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.data.status) {
        setData(resp.data.favoritos);
      }
      setLoading(false);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout contectHeaderComponent={HeaderComponent} headerShow>
      <Stack
        component="main"
        sx={styles.root}
        direction="row"
        flexWrap="wrap"
        justifyContent={!isSmallScreen ? "space-between" : "center"}
        alignContent="center"
        p={5}
        gap={5}
      >
        {loading
          ? Array.from({ length: 21 }).map((_, index) => (
              <LoadingCard key={index} checked={loading} />
            ))
          : data.map((item) => (
              <Card
                name={item.nombre}
                url={item.url}
                key={item.nombre}
                checked={!loading}
                favoriteCheck={true}
                id={item.id}
                onReload={getData}
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
    return <></>;
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
          to="/"
        >
          <Typography fontWeight={500}>Home</Typography>
        </Link>
        <Button onClick={logout} variant="contained">
          Salir
        </Button>
      </Stack>
    </>
  );
};

export default Favoritos;
