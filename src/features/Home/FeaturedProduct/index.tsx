"use client";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  Paper,
  Text,
  Title,
  useMantineTheme,
  rem,
  Container,
  Box,
  Badge,
  Group,
} from "@mantine/core";
import classes from "./featured-product.module.css";
import Link from "next/link";
import { TProduct } from "@/types/app.type";

interface CardProps {
  product: TProduct
}

function Card({ product }: CardProps) {
  return (
    <Box
      component={Link}
      href={`/products/${product.slug}`}
      className={classes.item}
      style={{ zIndex: 1 }}
    >
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(${product.thumbnail})` }}
        className={classes.card}
      >
        {/* <div>
          <Badge color="blue" size="lg">
            {product.}
          </Badge>
        </div> */}
      </Paper>
    </Box>
  );
}

const data = [
  {
    image:
      "https://cdn.kyou.id/items/240102-revive-pvc-figure-17-keqing-driving-thunder-ver-genshin-impact.jpg.webp",
    title: "PVC Figure 1/7 Keqing - Driving Thunder Ver. Genshin Impact",
    category: "keqing",
  },
  {
    image:
      "https://cdn.kyou.id/items/165611-arctech-action-figure-18-qiqi-nana-genshin-impact.jpg.webp",
    title: "ARCTECH Action Figure 1/8 Qiqi / Nana - Genshin Impact",
    category: "Nana",
  },
  {
    image:
      "https://cdn.kyou.id/items/234030-pvc-figure-17-klee-spark-knight-ver-genshin-impact.jpg.webp",
    title: "PVC Figure 1/7 Klee - Spark Knight Ver. - Genshin Impact",
    category: "Klee",
  },
  {
    image:
      "https://cdn.kyou.id/items/255427-pvc-figure-17-fischl-with-oz-genshin-impact.jpg.webp",
    title: "PVC Figure 1/7 Fischl with Oz - Genshin Impact",
    category: "Fischl",
  },
  {
    image:
      "https://cdn.kyou.id/items/197368-flash-po-pvc-figure-17-ningguang-hidden-moon-tianquan-ver.jpg.webp",
    title: "PVC Figure 1/7 Ningguang - Hidden Moon Tianquan Ver.",
    category: "Ningguang",
  },
  {
    image:
      "https://cdn.kyou.id/items/113554-pvc-figure-17-barbara-genshin-impact.jpg.webp",
    title: "PVC Figure 1/7 Barbara - Genshin Impact",
    category: "Barbara",
  },
];

export type FeaturedProductProps = {
  products: TProduct[]
}

export function FeaturedProduct({ products }: FeaturedProductProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Container mt={30} mb={30} size="lg">
      <Group justify="center" pb="xl">
        <Title order={2} className={classes.categoryTitle} ta="center" mt="sm">
          Our Most Selling Products
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Discover the must-have Genshin Impact figures that every Traveler
          desires. Bring home the essence of Teyvat with our bestsellers,
          crafted to perfection and adored by fans worldwide.
        </Text>
      </Group>
      <Carousel
        slideSize={{ base: "100%", sm: "33%" }}
        slideGap={{ base: rem(2), sm: "xl" }}
        align="start"
        slidesToScroll={mobile ? 1 : 3}
        loop
        dragFree
        draggable
      >
        {products.map((product) => (
          <Carousel.Slide key={product._id.toString()}>
            <Card product={product} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}
