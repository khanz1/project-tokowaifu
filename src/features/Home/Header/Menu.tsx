"use client";
import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import classes from "./header.module.css";
import Link from "next/link";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconHome } from "@tabler/icons-react";

export type MenuProps = {
  readonly children: React.ReactNode;
};

export default function Menu({ children }: MenuProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/" style={{ cursor: "pointer" }}>
            {/* <MantineLogo size={30} /> */}
            <IconHome size={30} />
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/products" className={classes.link}>
              Products
            </Link>
            <Link href="/wishlist" className={classes.link}>
              Wishlist
            </Link>
          </Group>

          {children}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Link href="/products" className={classes.link}>
            Products
          </Link>
          <Link href="/wishlist" className={classes.link}>
            Wishlist
          </Link>

          <Divider my="sm" />

          {children}
        </ScrollArea>
      </Drawer>
    </>
  );
}
