export type AnimeEpisode = {
  name: string;
  episode: number;
  previewImage: string | null;
  video: {
    fhd: string | null;
    hd: string | null;
    sd: string | null;
  };
};

export interface IAnime {
  name: string;
  id: string | number;
  code?: string;
  genres: Array<string>;
  description: string;
  itemImage: string;
  backgroundImage: string;
  episodes: AnimeEpisode[];
}

export interface IEpisode {
  episode: number;
  name: string;
  preview: string;
  hls: {
    fhd: string | null;
    hd: string | null;
    sd: string | null;
  };
}

export interface IAnimeResponse {
  id: string;
  names: {
    ru: string;
  };
  backgroundImage?: string;
  description: string;
  genres: Array<string>;
  code: string;
  posters: {
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
    original: {
      url: string;
    };
  };
  player: {
    host: string;
    list: IEpisode[];
  };
}

export interface IPreviewAnime {
  name: string;
  poster: {
    url: string;
  };
  code: string;
  favorite?: number;
  genres: Array<string>;
}
