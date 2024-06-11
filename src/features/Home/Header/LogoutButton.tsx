"use client";
import { logout } from "@/actions/user.action";
import { alertError, alertSuccess } from "@/helpers/notification";
import { Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleOnLogout = async () => {
    const response = await logout();
    if (response.ok) {
      alertSuccess({ message: response.data.message });
      return router.push("/login");
    }

    alertError({ message: response.data.message });
  };
  return (
    <Button color="red" onClick={handleOnLogout}>
      Log out
    </Button>
  );
}
