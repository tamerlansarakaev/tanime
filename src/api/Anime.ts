import { AnimeEpisode, IAnime, IAnimeResponse, IEpisode } from "../types";

const videoURL = "https://cache.libria.fun";
const defaultURL = "https://www.anilibria.tv/";

class Anime implements IAnime {
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
          fhd: videoURL + state.hls.fhd,
          hd: videoURL + state.hls.hd,
          sd: videoURL + state.hls.sd,
        },
      };
    });
    return result;
  }

  get details() {
    return { ...this };
  }
}

export default Anime;
