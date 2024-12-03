/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Layout from "../components/Layout";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [data, setData] = useState({
    documento: "",
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const resp = await api.post("/user/login", data);
      if (resp.data.status) {
        const { token, userData } = resp.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.msg,
      });
    }
  };
  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack borderRadius={16} p={5} width="80%" bgcolor="#222" gap={2}>
        <Typography variant="h3" color="#fff">
          Login
        </Typography>

        <TextField
          label="Correo"
          sx={{
            borderColor: "#ffffff66",
            color: "#fff",
            "& label": {
              color: "#ffffff66",
            },
            "& input": {
              color: "#ffffff",
            },
          }}
          color="secondary"
          type="email"
          onChange={(e) => setData((v) => ({ ...v, correo: e.target.value }))}
        />
        <TextField
          label="Contraseña"
          type="password"
          sx={{
            borderColor: "#ffffff66",
            color: "#fff",
            "& label": {
              color: "#ffffff66",
            },
            "& input": {
              color: "#ffffff",
            },
          }}
          color="secondary"
          onChange={(e) => setData((v) => ({ ...v, password: e.target.value }))}
        />
        <Button color="secondary" variant="contained" onClick={handleSubmit}>
          Iniciar
        </Button>
      </Stack>
    </Layout>
  );
};

export default Login;
