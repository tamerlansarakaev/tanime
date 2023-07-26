import {
  AnimeEpisode,
  IAnime,
  IAnimeResponse,
  IEpisode,
  IPreviewAnime,
} from "../types";

const videoURL = "https://cache.libria.fun";
const defaultURL = "https://www.anilibria.tv/";

export default class Anime implements IAnime {
  name: string;
  episodes: AnimeEpisode[];
  id: string | number;
  itemImage: string;
  backgroundImage: string;
  code?: string | undefined;
  description: string;
  genres: string[];

  constructor(anime: IAnimeResponse) {
    this.name = anime.names.ru;
    this.episodes = this.fixEpisodePreview(Object.values(anime.player.list));
    this.id = anime.id;
    this.itemImage = defaultURL + anime.posters.small.url;
    this.backgroundImage = defaultURL + anime.posters.original.url;
    this.code = anime.code;
    this.description = anime.description;
    this.genres = anime.genres;
  }

  fixEpisodePreview(list: IEpisode[]) {
    const result = list.map((state) => {
      return {
        ...state,
        previewImage: state.preview ? defaultURL + state.preview : null,
        video: {
          fhd: state.hls.fhd ? videoURL + state.hls.fhd : null,
          hd: state.hls.hd ? videoURL + state.hls.hd : null,
          sd: state.hls.sd ? videoURL + state.hls.sd : null,
        },
      };
    });
    return result;
  }

  get details() {
    return { ...this };
  }
}

export class PreviewAnime implements IPreviewAnime {
  name: string;
  code: string;
  poster: { url: string };
  favorite: number;
  genres: string[];

  constructor(anime: IPreviewAnime) {
    this.name = anime.name;
    this.code = anime.code;
    this.poster = {
      url: defaultURL + anime.poster.url,
    };
    this.favorite = anime.favorite || 0;
    this.genres = anime.genres;
  }

  get details() {
    return { ...this };
  }
}
