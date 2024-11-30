import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  height: "100%",
  color: "#ffffff",
};

export const currentPage: SxProps<Theme> = {
  height: 50,
  width: 50,

  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "#fff",
};

export default {
  root,
  currentPage,
};
