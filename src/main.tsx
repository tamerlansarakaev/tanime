import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/config/store.ts";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
