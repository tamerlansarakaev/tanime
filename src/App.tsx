import React from "react";
import { useAppDispatch, useAppSelector } from "./redux/config";

// API
import ApiService from "./api/actions/index";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

// Pages
import HomePage from "./pages/HomePage/HomePage";

// Interfaces and Types
import { loadAnime } from "./redux/reducers/dataReducer";
import { IAnime } from "./types";

// BackgroundImage

import "./App.css";
import "./defaultStyles/index.scss";
import WatchPage from "./pages/WatchPage/WatchPage";

function App() {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const defaultLinks = [
    { title: "Главная", src: "/" },
    { title: "лучшие аниме", src: "/" },
    { title: "Случайное аниме", src: "/" },
  ];

  React.useEffect(() => {
    if (!animeList.length) {
      ApiService.getAllAnime().then((data) => {
        dispatch(loadAnime({ animeList: data as IAnime[], page: 1 }));
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Header logoTitle="Tanime" links={defaultLinks} />
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<WatchPage />} path="/anime/:name" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
