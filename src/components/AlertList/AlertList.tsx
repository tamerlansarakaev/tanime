import { IAlertReducer } from "../../redux/reducers/alertReducer";

import styles from "./AlertList.module.scss";
import AlertModal from "../AlertModal/AlertModal";

const AlertList = ({ alertList }: IAlertReducer) => {
  return (
    <div className={styles.container}>
      {alertList.length
        ? alertList.map((alert, i) => <AlertModal alert={alert} key={i} />)
        : ""}
    </div>
  );
};

export default AlertList;
