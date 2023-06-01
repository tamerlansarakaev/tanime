type AnimeEpisode = {
  name: string;
  episode: number;
  previewImage: string;
  video: {
    fhd: string;
    hd: string;
    sd: string;
  };
};

export interface IAnime {
  name: string;
  id: string | number;
  genres: Array<string>;
  description: string;
  itemImage: string;
  episodes: AnimeEpisode[];
}
