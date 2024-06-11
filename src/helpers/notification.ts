import { notifications } from "@mantine/notifications";

export type Alert = {
  title?: string;
  message: string;
}

export const alertSuccess = (props: Alert) => {
  notifications.show({
    title: props.title || "Success",
    message: props.message,
    color: "green",
  });
};

export const alertError = (props: Alert) => {
  notifications.show({
    title: props.title || "Error",
    message: props.message,
    color: "red",
  });
}