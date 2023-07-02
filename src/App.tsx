import React from "react";
import { useAppDispatch, useAppSelector } from "./redux/config";

// API
import ApiService from "./api/actions/index";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { Modal } from "@mui/material";

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
  const [modalStatus, setModalStatus] = React.useState(true);

  const loadAllAnimeForServer = async () => {
    try {
      const loadAnime = await ApiService.loadAllAnimeFromServer();
      setModalStatus(false);
      return loadAnime;
    } catch (err) {
      return err;
    }
  };

  React.useEffect(() => {
    if (!animeList.length) {
      ApiService.getAllAnime().then(async (data) => {
        dispatch(loadAnime({ animeList: data as IAnime[], page: 1 }));
        setModalStatus(false);

        try {
          loadAllAnimeForServer();
        } catch (error) {
          setModalStatus(false);
        }
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
      <Modal
        open={modalStatus}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          border: "none",
          color: "#fff",

          "& .MuiModal-backdrop": {
            background: "#000000c4",
          },
        }}
      >
        <div className="LoadingModalTitle">
          <p className="description">
            Возможна долгая загрузка проекта из-за ограниченных ресурсов
            бесплатного хостинга.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
