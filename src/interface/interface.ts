export interface Character {
  characterInfo: Record<string, any>[];
  totalNumberOfCharacters: number;
  totalHeightOfCharacters: string;
}

export interface WarRes {
  id?: number;
  movie_title: string;
  opening_crawl: string;
  comments?: string;
}
