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

  export interface CharacterDetail {
      properties: {
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
      };
      description: string;
      _id: string;
      uid: string;
      __v: number;
  }

export interface PlanetResponse {
  message: string;
  result: Planet;
  _id: string;
  uid: string;
  __v: number;
}

export interface Planet {
  properties: {
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
  };
  description: string;
}
