import { api } from "..";
import { IAnimeResponse } from "../../types";
import Anime from "../Anime";

class ApiService {
  async getAllAnime() {
    const response = (await api.get("/list/last")).data;
    const resultData = response.map((anime: IAnimeResponse) => {
      if (!anime.player.list) return;
      return new Anime({ ...anime }).details;
    });
    return resultData;
  }
  async getAnimeFromPage(page: number) {
    try {
      const response = (await api.get(`/list/${page}`)).data;
      const resultData = response.map((anime: IAnimeResponse) => {
        if (!anime.player.list) return;
        return new Anime({ ...anime }).details;
      });
      return resultData;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ApiService();
