import { api } from "../index";
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

  // async getAnimeFromSearch(text: string) {
  //   try {
  //     const response = await api
  //       .post("/search", { name: text.toLowerCase() })
  //       .then((data) => data.data);
  //     const resultData = response.map((anime: IAnimeResponse) => {
  //       if (!anime.player.list) return;
  //       return new Anime({ ...anime }).details;
  //     });
  //     return resultData;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async getAnimeFromSearch(text: string) {
    try {
      const resultText = text.replace(/[ ]/g, "-");
      const encodeText = encodeURIComponent(resultText);
      const response = await api
        .get(`/search/${encodeText}`)
        .then((data) => data.data);
      const resultData = response.map((anime: IAnimeResponse) => {
        if (!anime.player.list) return;
        return new Anime({ ...anime }).details;
      });
      return resultData;
    } catch (error) {
      return error;
    }
  }

  async loadAllAnimeForServer() {
    try {
      const response = await api.get(`/load`);
      return response ? true : false;
    } catch (error) {
      return false;
    }
  }
}

export default new ApiService();
