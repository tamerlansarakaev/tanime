import { api } from "..";
import { IAnimeResponse } from "../../types";
import Anime from "../Anime";

class ApiService {
  async getAllAnime() {
    try {
      const response = (await api.get("/list/last")).data;
      const resultData = response.map((anime: IAnimeResponse) => {
        if (!anime.player.list) return;
        return new Anime({ ...anime }).details;
      });
      return resultData;
    } catch (error) {
      return error;
    }
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

  async getAnimeFromSearch(text: string) {
    try {
      const response = await api
        .post("/search", { name: text.toLowerCase() })
        .then((data) => data.data);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ApiService();
