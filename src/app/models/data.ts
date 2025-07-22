import { Country } from "./country";

export const initialState: Country[] = [
  {
    id: 2,
    label: "germany",
    desc: "In Germany ....",
    cities: [
      { id: 1, name: "Berlin", desc: "Berlin is..." },
      { id: 2, name: "Monaco", desc: "Monaco is..." },
    ],
  },
  {
    id: 1,
    label: "italy",
    desc: "in Italy",
    cities: [
      { id: 11, name: "Rome", desc: "Rome is ..." },
      { id: 22, name: "Milan", desc: "Milan is..." },
      { id: 33, name: "Palermo", desc: "Palermo is..." },
    ],
  },
  {
    id: 3,
    label: "spain",
    desc: "bla bla 3",
    cities: [{ id: 41, name: "Madrid", desc: "Madrid is..." }],
  },
];
