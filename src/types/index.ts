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
  code?: string;
  genres: Array<string>;
  description: string;
  itemImage: string;
  backgroundImage: string;
  episodes: AnimeEpisode[];
}

interface IEpisode {
  episode: number;
  name: string;
  preview: string;
  hls: {
    fhd: string;
    hd: string;
    sd: string;
  };
}

export interface IAnimeResponse {
  id: string;
  names: {
    ru: string;
  };
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
