import { api } from "..";
import { IAnimeResponse } from "../../types";

class ApiService {
  async getAllAnime() {
    const response = (await api.get("/list/last")).data;
    const resultData = response.map((anime: IAnimeResponse) => {
      const player = anime.player.host;
      if (!anime.player.list) return;
      const seriesList = Object.values(anime.player.list);
      const resultEpisodesData = seriesList.map((episode) => {
        return {
          episode: episode.episode,
          name: episode.name,
          previewImage: episode.preview
            ? "https://www.anilibria.tv/" + episode.preview
            : null,
          video: {
            fhd: "https://" + player + episode.hls.fhd,
            hd: "https://" + player + episode.hls.hd,
            sd: "https://" + player + episode.hls.sd,
          },
        };
      });
      return {
        name: anime.names.ru,
        id: anime.id,
        code: anime.code,
        description: anime.description,
        genres: anime.genres,
        itemImage: "https://www.anilibria.tv" + anime.posters.small.url,
        backgroundImage:
          "https://www.anilibria.tv" + anime.posters.original.url,
        episodes: resultEpisodesData,
      };
    });
    return resultData;
  }
  async getAnimeFromPage(page: number) {
    try {
      const response = (await api.get(`/list/${page}`)).data;
      const resultData = response.map((anime: any) => {
        const player = anime.player.host;
        if (!anime.player.list) return;
        const seriesList = Object.values(anime.player.list);
        const resultEpisodesData = seriesList.map((episode: any) => {
          return {
            episode: episode.episode,
            name: episode.name,
            previewImage: "https://www.anilibria.tv/" + episode.preview,
            video: {
              fhd: "https://" + player + episode.hls.fhd,
              hd: "https://" + player + episode.hls.hd,
              sd: "https://" + player + episode.hls.sd,
            },
          };
        });
        return {
          id: anime.id,
          name: anime.names.ru,
          code: anime.code,
          description: anime.description,
          genres: anime.genres,
          itemImage: "https://www.anilibria.tv" + anime.posters.small.url,
          backgroundImage:
            "https://www.anilibria.tv" + anime.posters.original.url,
          episodes: resultEpisodesData,
        };
      });
      return resultData;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ApiService();
