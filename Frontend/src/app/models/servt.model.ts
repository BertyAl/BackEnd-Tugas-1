// anime.model.ts

export interface Servt {
  _id: string; // MongoDB ObjectId
  title: string;
  description: string;
  image: string;
  genre: string;
  releaseDate: string;
  rating: number;
}
