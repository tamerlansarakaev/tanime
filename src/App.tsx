import React from "react";
import { api } from "./api";
import { useAppDispatch } from "./redux/config";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

// Pages
import HomePage from "./pages/HomePage/HomePage";

// BackgroundImage
import BackgroundImage from "./assets/images/background.webp";

import "./App.css";
import "./defaultStyles/index.scss";
import { loadAnime } from "./redux/reducers/dataReducer";
import { IAnime } from "./types";

function App() {
  const dispatch = useAppDispatch();
  const defaultLinks = [
    { title: "Главная", src: "/" },
    { title: "лучшие аниме", src: "/" },
    { title: "Случайное аниме", src: "/" },
  ];

  async function getLastAnime() {
    const response = (await api.get("/list")).data;
    return response;
  }

  React.useEffect(() => {
    getLastAnime().then((data) => {
      const resultData = data.map((anime: any) => {
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
          itemImage: anime.posters.original,
          episodes: resultEpisodesData,
        };
      });
      dispatch(loadAnime({ animeList: resultData as IAnime[] }));
    });
  }, []);

  return (
    <div className="App">
      <img src={BackgroundImage} className="bg" />
      <div className="container">
        <BrowserRouter>
          <Header logoTitle="Tanime" links={defaultLinks} />
          <Routes>
            <Route element={<HomePage />} path="/" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
