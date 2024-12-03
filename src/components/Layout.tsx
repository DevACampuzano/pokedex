import { LinearProgress, Stack, SxProps, Theme } from "@mui/material";

import { FC } from "react";

interface LayoutProps {
  loading?: boolean;
  headerShow?: boolean;
  children: React.ReactNode;
  contectHeaderComponent?: () => JSX.Element;
  style?: SxProps<Theme>;
}
const Layout: FC<LayoutProps> = ({
  children,
  loading,
  contectHeaderComponent,
  headerShow,
  style = {},
}) => {
  return (
    <Stack sx={style}>
      {headerShow && (
        <Stack
          direction="row"
          component="header"
          justifyContent="space-between"
          alignItems="center"
          padding={"24px"}
          sx={{ backgroundColor: "#222222" }}
        >
          {contectHeaderComponent && contectHeaderComponent()}
        </Stack>
      )}

      {loading && <LinearProgress />}
      {children}
    </Stack>
  );
};

export default Layout;
