"use client";
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
import classes from "@/styles/register.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { alertError, alertSuccess } from "@/helpers/notification";
import { type RegisterForm } from "@/types/app.type";
import { register } from "@/actions/user.action";

const defaultFormValue: RegisterForm = {
  name: "Angga Maulana",
  username: "sonangga",
  email: "amaulana.work@gmail.com",
  password: "12345678",
};

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>(defaultFormValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await register(form);

    if (response.ok) {
      alertSuccess({ message: "Register success" });
      return router.push("/login");
    }
    
    alertError({ message: response.data.message });
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Have an account?{" "}
        <Link href="/login" passHref>
          <Anchor size="sm" component="button">
            Sign in
          </Anchor>
        </Link>
      </Text>

      <form onSubmit={handleOnSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            name="name"
            label="Name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleOnChange}
          />
          <TextInput
            name="username"
            label="Username"
            placeholder="Your Username"
            required
            value={form.username}
            onChange={handleOnChange}
          />
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
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
