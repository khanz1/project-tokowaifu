import cx from "clsx";
import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "./Hero.module.css";
import Link from "next/link";

export function HeroHomePage() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          From Bekasi, to Tangerang & Surabaya!
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Beta Store is Launched at Alam Sutera!
          </Text>
          <Text size="lg" className={classes.description}>
            Gamma Store is Launched at Surabaya!
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link href="https://kyou.id/stores" target="_blank">
            <Button className={classes.control} variant="white" size="lg">
              Explore Offline Store!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
