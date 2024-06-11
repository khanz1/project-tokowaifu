"use client";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
} from "@mantine/core";
import classes from "./ProductCard.module.css";
import { TProduct } from "@/types/app.type";
import { trimWords } from "@/helpers/functions";
import Link from "next/link";

export type ProductCardProps = {
  product: TProduct;
  onLikeClick: (product: TProduct) => void;
};

export function ProductCard({ product, onLikeClick }: ProductCardProps) {
  const handleOnClickLike = () => {
    onLikeClick(product)
  }
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section pos="relative" style={{ cursor: "pointer" }}>
        <Link href={`/products/${product.slug}`}>
          <Image src={product.thumbnail} alt={product.name} height={320} />
        </Link>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Group>
            <Text w="100%" fz="h5" fw={500}>
              {trimWords(product.name, 40)}
            </Text>
          </Group>
          <ActionIcon
            pos="absolute"
            bottom={0}
            right={0}
            variant="transparent"
            radius="xs"
            size={36}
            onClick={handleOnClickLike}
          >
            {product.wishlist ? (
              <IconHeartFilled className={classes.like} stroke={1.5} />
            ) : (
              <IconHeart className={classes.like} stroke={1.5} />
            )}
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  );
}
