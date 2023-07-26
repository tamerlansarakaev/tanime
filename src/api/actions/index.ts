import { api } from "../index";
import { IAnimeResponse, IPreviewAnime } from "../../types";
import Anime, { PreviewAnime } from "../Anime";
import axios from "axios";

const url =
  "https://tanime-e1e71-default-rtdb.europe-west1.firebasedatabase.app";

class ApiService {
  // async getAllAnime() {
  //   try {
  //     const response = (await api.get("/anime/list/last")).data;
  //     const resultData = response.map((anime: IAnimeResponse) => {
  //       if (!anime.player.list) return;
  //       return new Anime({ ...anime }).details;
  //     });
  //     return resultData;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async getAnimeFromPage(page: number) {
    try {
      const response = (await api.get(`/anime/list/${page}`)).data;
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
        .get(`/anime/search/${encodeText}`)
        .then((res) => {
          return res.data;
        });
      const resultData = response.map((anime: IAnimeResponse) => {
        if (!anime.player.list) return;
        return new Anime({ ...anime }).details;
      });
      return resultData;
    } catch (error) {
      return false;
    }
  }

  async loadAllAnimeFromServer() {
    try {
      const response = await api.get(`/load/anime`);
      return response ? true : false;
    } catch (error) {
      return false;
    }
  }

  async getPagesLength() {
    try {
      const response = (await api.get(`/anime/pagesLength`)).data;
      return response.length;
    } catch (error) {
      return false;
    }
  }

  async getAnimeWithCode(code: string): Promise<any> {
    try {
      const response = await api
        .get(`/anime/searchWithCode/${code}`)
        .then((anime) => {
          return new Anime({ ...anime.data }).details;
        });
      return response;
    } catch (error) {
      return Error();
    }
  }

  async publishAnime() {
    try {
      const response = await api.get(`/anime/publish`);
      return response;
    } catch (error) {
      return Error();
    }
  }

  async getAllAnime() {
    try {
      const response = (await axios(`${url}/anime/list.json`)).data;
      const resultData = response.map((anime: IPreviewAnime) => {
        return new PreviewAnime({ ...anime }).details;
      });
      return resultData;
    } catch (error) {
      return error;
    }
  }
}

export default new ApiService();
