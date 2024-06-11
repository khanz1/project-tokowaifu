import { COOKIE_NAME } from "@/constants";
import { Button, Group } from "@mantine/core";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AuthenticationButton() {
  const cookiesStore = cookies();
  const auth = cookiesStore.get(COOKIE_NAME.AUTH);
  console.log(auth, "<<<AUTH");
  if (auth?.value) {
    return <LogoutButton />;
  }
  return (
    <Group>
      <Link href="/login">
        <Button variant="default">Log in</Button>
      </Link>
      <Link href="/register">
        <Button>Sign up</Button>
      </Link>
    </Group>
  );
}
