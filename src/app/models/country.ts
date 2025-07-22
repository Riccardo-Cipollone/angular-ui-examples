export interface Country {
  id: number;
  label: string;
  desc: string;
  cities: City[];
}

export interface City {
  id: number;
  name: string;
  desc: string;
}
