/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

export interface IResponderPokemon {
  count: number;
  next: string;
  previous: string | null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export default () => {
  const [count, setCount] = useState<number>(1);
  const [data, setData] = useState<IResponderPokemon>({
    count: 0,
    next: "https://pokeapi.co/api/v2/pokemon",
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async (operation?: "next" | "previous") => {
    setLoading(() => true);
    if (operation === "next") {
      setCount((prev) => prev + 1);
      const list = await axios.get<IResponderPokemon>(data.next);
      setData(() => list.data);
    } else if (data.previous) {
      setCount((prev) => prev - 1);
      const list = await axios.get<IResponderPokemon>(data.previous);
      setData(() => list.data);
    } else {
      const list = await axios.get<IResponderPokemon>(data.next);
      setData(() => list.data);
    }
    setTimeout(() => {
      setLoading(() => false);
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    count,
    getData,
    loading,
  };
};
