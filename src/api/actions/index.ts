import { api } from "..";

class ApiService {
  async getAllAnime() {
    const response = (await api.get("/list/last")).data;
    const resultData = response.map((anime: any) => {
      if (!anime.player.list) return;
      const seriesList = Object.values(anime.player.list);
      const resultEpisodesData = seriesList.map((episode: any) => {
        return {
          episode: episode.episode,
          name: episode.name,
          previewImage: episode.preview,
          video: {
            fhd: episode.hls.fhd,
            hd: episode.hls.hd,
            sd: episode.hls.sd,
          },
        };
      });

      return {
        name: anime.names.ru,
        id: anime.id,
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
        if (!anime.player.list) return;
        const seriesList = Object.values(anime.player.list);
        const resultEpisodesData = seriesList.map((episode: any) => {
          return {
            episode: episode.episode,
            name: episode.name,
            previewImage: episode.preview,
            video: {
              fhd: episode.hls.fhd,
              hd: episode.hls.hd,
              sd: episode.hls.sd,
            },
          };
        });

        return {
          name: anime.names.ru,
          id: anime.id,
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
