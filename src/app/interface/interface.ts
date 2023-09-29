export interface Character {
  uid: string;
  name: string;
  url: string;
}

export interface CharacterResponse {
  results: Character[];
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
}

export interface Detail {
  properties: PlanetProperties | CharacterProperties | any;
  description: string;
  _id: string;
  uid: string;
  __v: number;
  url: string;
}

export interface DetailResponse {
  message: string;
  result: Detail;
}


interface CharacterProperties {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  name: string;
  homeworld: string;
  url: string;
}

interface PlanetProperties {
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  created: string;
  edited: string;
  name: string;
  url: string;
}
