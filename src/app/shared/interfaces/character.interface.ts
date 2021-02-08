export interface Character {
  id: number;
  name: string;
  image?: string;
  species: string;
  gender: string;
  created: string;
  status: string;
  episode: string[];
  location?: object;
  origin?: object;
  type?: string;
  url?: string;
}
