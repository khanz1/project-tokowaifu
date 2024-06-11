"use client"
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { login } from "@/actions/user.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type LoginForm } from "@/types/app.type";
import { alertError, alertSuccess } from "@/helpers/notification";

export type PageProps = {
  searchParams: { ok: "false" | "true"; message: string };
}

const defaultFormValue: LoginForm = {
  email: "assistance.khanz@gmail.com",
  password: "khanz!",
};
export default function Page(props: PageProps) {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>(defaultFormValue);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(form);
    if (response.ok) {
      alertSuccess({ message: response.data.message })
      return router.push("/");
    }

    alertError({ message: response.data.message });
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don&#39;t Have an account yet?{" "}
        <Link href="/register" passHref>
          <Anchor size="sm" component="button">
            Sign up
          </Anchor>
        </Link>
      </Text>

      <form onSubmit={handleLogin}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            name="email"
            label="Email"
            placeholder="you@khanz1.dev"
            required
            value={form.email}
            onChange={handleOnChange}
          />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={form.password}
            onChange={handleOnChange}
          />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
        {props.searchParams?.ok === "false" && (
          <Text c="red" mt={10} ta="center">
            {props.searchParams.message}
          </Text>
        )}
      </form>
    </Container>
  );
}
