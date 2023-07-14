import React from "react";
import { useAppDispatch, useAppSelector } from "./redux/config";
import { loadAnime, updateStatusSearch } from "./redux/reducers/dataReducer";

// API
import ApiService from "./api/actions/index";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { Modal } from "@mui/material";
import AlertList from "./components/AlertList/AlertList";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import WatchPage from "./pages/WatchPage/WatchPage";
import SearchPage from "./pages/SearchPage/SearchPage";

// Interfaces and Types
import { IAnime } from "./types";

// Styles
import "./App.css";
import "./defaultStyles/index.scss";

import { IAlert, updateAlertList } from "./redux/reducers/alertReducer";

function App() {
  const [modalStatus, setModalStatus] = React.useState(true);
  const dispatch = useAppDispatch();
  const animeList = useAppSelector((state) => state.dataReducer.animeList);
  const alertList = useAppSelector((state) => state.alertReducer.alertList);

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
      try {
        ApiService.getAllAnime().then(async (data) => {
          const newAnimeList = data as IAnime[];

          dispatch(loadAnime({ animeList: newAnimeList, page: 1 }));
          setModalStatus(false);

          loadAllAnimeForServer().then((status) => {
            if (!status) return;

            ApiService.getAnimeFromSearch("наруто").then((status) => {
              if (status) {
                const infoAlertItem: IAlert = {
                  id: alertList.length + 1,
                  title: "Данные загружены.",
                  type: "success",
                };
                const newArray = [...alertList, infoAlertItem];

                dispatch(
                  updateAlertList({
                    alertList: newArray,
                  })
                );
                dispatch(
                  updateStatusSearch({
                    animeList: newAnimeList,
                    statusSearch: true,
                  })
                );
              }
              if (!status) {
                const infoAlertItem: IAlert = {
                  id: alertList.length + 1,
                  title: "Данные не загружены",
                  type: "error",
                  message: "Поиск будет отключен",
                };
                const newArray = [...alertList, infoAlertItem];

                dispatch(
                  updateAlertList({
                    alertList: newArray,
                  })
                );
                dispatch(
                  updateStatusSearch({
                    animeList: newAnimeList,
                    statusSearch: false,
                  })
                );
              }
            });
          });
          ApiService.getAnimeFromSearch("наруто").then((status) => {
            if (status) {
              const infoAlertItem: IAlert = {
                id: alertList.length + 1,
                title: "Данные загружены.",
                type: "success",
              };
              const newArray = [...alertList, infoAlertItem];

              dispatch(
                updateAlertList({
                  alertList: newArray,
                })
              );
              dispatch(
                updateStatusSearch({
                  animeList: newAnimeList,
                  statusSearch: true,
                })
              );
            }
            if (!status) {
              const infoAlertItem: IAlert = {
                id: alertList.length + 1,
                title: "Данные не загружены",
                type: "error",
                message: "Поиск будет отключен",
              };
              const newArray = [...alertList, infoAlertItem];

              dispatch(
                updateAlertList({
                  alertList: newArray,
                })
              );
              dispatch(
                updateStatusSearch({
                  animeList: newAnimeList,
                  statusSearch: false,
                })
              );
            }
          });
        });
      } catch (error) {
        ApiService.getAllAnime().then(async (data) => {
          dispatch(loadAnime({ animeList: data as IAnime[], page: 1 }));
          setModalStatus(false);

          loadAllAnimeForServer();
          return error;
        });
      }
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter basename="/">
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
      <AlertList alertList={alertList} />
    </div>
  );
}

export default App;
