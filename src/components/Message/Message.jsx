import { message } from "antd";

const success = (mes = "Success") => {
  message.success(mes);
};

const error = (mes = "Error", duration) => {
  message.error(mes, duration);
};

const warning = (mes = "Warning") => {
  message.warning(mes);
};

export { success, error, warning };
