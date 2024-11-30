/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grow,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IReponderGetPokemon } from "./interface";

interface ICard {
  name: string;
  url: string;
  checked: boolean;
}

const CardCustom = ({ name, url, checked }: ICard) => {
  const [data, setData] = useState<IReponderGetPokemon>();

  useEffect(() => {
    axios.get<IReponderGetPokemon>(url).then((response) => {
      setData(response.data);
    });
  }, []);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Grow
      in={checked}
      style={{ transformOrigin: "0 0 0" }}
      {...(checked ? { timeout: 1000 } : {})}
    >
      <Card sx={{ maxWidth: 345, backgroundColor: "#222222" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={data?.sprites.other?.["official-artwork"].front_default}
            alt={name}
          />
          <CardContent sx={{ gap: 2 }}>
            <Typography gutterBottom variant="h5" component="div" color="#fff">
              {capitalize(name)}
            </Typography>
            <Stack gap={2}>
              <Stack direction="row" gap={1}>
                <Typography variant="body2" color="#ffffff66" fontWeight={700}>
                  Types:
                </Typography>
                <Typography variant="body2" color="#ffffff66">
                  {data?.types.map((item) => item.type.name).join(", ")}
                </Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <Typography variant="body2" color="#ffffff66" fontWeight={700}>
                  Abilities:
                </Typography>
                <Typography variant="body2" color="#ffffff66">
                  {data?.abilities.map((item) => item.ability.name).join(", ")}
                </Typography>
              </Stack>
              <Stack gap={1} direction="row">
                <Typography variant="body2" color="#ffffff66" fontWeight={700}>
                  Stats:
                </Typography>
                <Stack direction="row" gap={1}>
                  <Stack direction="row" gap={1}>
                    <Box
                      component="img"
                      alt="icon-hp"
                      src="https://cdn.pixabay.com/photo/2020/09/30/07/48/heart-5614865_640.png"
                      width={20}
                      height="auto"
                    />

                    <Typography variant="body2" color="#ffffff66">
                      {data?.stats[0].base_stat}
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <Box
                      component="img"
                      alt="icon-attack"
                      src="https://cdn-icons-png.flaticon.com/512/8037/8037103.png"
                      width={20}
                    />
                    <Typography variant="body2" color="#ffffff66">
                      {data?.stats[1].base_stat}
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <Box
                      component="img"
                      alt="icon-defense"
                      src="https://cdn-icons-png.flaticon.com/512/9414/9414678.png"
                      width={20}
                      height="auto"
                    />
                    <Typography variant="body2" color="#ffffff66">
                      {data?.stats[2].base_stat}
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={1}>
                    <Box
                      component="img"
                      alt="icon-speed"
                      src="https://cdn-icons-png.flaticon.com/512/926/926114.png"
                      width={20}
                      height="auto"
                    />
                    <Typography variant="body2" color="#ffffff66">
                      {data?.stats[5].base_stat}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
};

export default CardCustom;
