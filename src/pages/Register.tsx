/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography, TextField, Button } from "@mui/material";
import Layout from "../components/Layout";
import api from "../api";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
      const resp = await api.post("/user/", data);
      if (resp.data.status) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          text: "El usuario ha sido creado correctamente",
        }).then(() => {
          navigate("/login");
        });
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
          Registro de usuario
        </Typography>
        <TextField
          label="Nombre"
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
          onChange={(e) => setData((v) => ({ ...v, nombre: e.target.value }))}
        />
        <TextField
          label="Apellido"
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
          onChange={(e) => setData((v) => ({ ...v, apellido: e.target.value }))}
        />
        <TextField
          label="Documento"
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
          onChange={(e) =>
            setData((v) => ({ ...v, documento: e.target.value }))
          }
        />
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
          Registrar
        </Button>
      </Stack>
    </Layout>
  );
};

export default Register;
