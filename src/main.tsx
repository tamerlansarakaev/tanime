import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "./redux/config/store.ts";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <HashRouter>
        <App />
      </HashRouter>
    </BrowserRouter>
  </Provider>
);
