// Global
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/config";

// Components
import { Alert, AlertTitle } from "@mui/material";

// Styles
import styles from "./AlertModal.module.scss";

// Other
import { IAlert, updateAlertList } from "../../redux/reducers/alertReducer";

interface IAlertModal {
  alert: IAlert;
}

const AlertModal = ({ alert }: IAlertModal) => {
  const [status, setStatus] = React.useState(true);
  const alertList = useAppSelector((state) => state.alertReducer.alertList);
  const dispatch = useAppDispatch();
  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const validateStatus = status ? 1 : 0;
  const timeoutDuration = 1000;

  const handleDeleteItem = (id: number) => {
    if (!id) return;
    const filteredList = alertList.filter((state) => state.id !== id);

    dispatch(updateAlertList({ alertList: filteredList }));
  };

  const handleMouseMove = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setStatus(false);
    }, timeoutDuration);
  };

  React.useEffect(() => {
    if (status) {
      timeoutId.current = setTimeout(() => {
        setStatus(false);
      }, timeoutDuration);
    }
  }, []);

  return (
    <Alert
      className={`${styles.container}`}
      onMouseMove={handleMouseMove}
      severity={alert.type}
      sx={{
        opacity: validateStatus,
      }}
      onTransitionEnd={() => handleDeleteItem(alert.id)}
    >
      <AlertTitle
        sx={{
          margin: 0,
        }}
      >
        {alert.title}
      </AlertTitle>
      {alert.message && <p>{alert.message}</p>}
    </Alert>
  );
};

export default AlertModal;
