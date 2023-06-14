import React from "react";
import { useAppDispatch, useAppSelector } from "./redux/config";

// API
import ApiService from "./api/actions/index";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import WatchPage from "./pages/WatchPage/WatchPage";

// Interfaces and Types
import { loadAnime } from "./redux/reducers/dataReducer";
import { IAnime } from "./types";

// Styles
import "./App.css";
import "./defaultStyles/index.scss";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);

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
          <Header logoTitle="Tanime" />
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<WatchPage />} path="/anime/:name" />
            <Route element={<SearchPage />} path="/anime/search/" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
