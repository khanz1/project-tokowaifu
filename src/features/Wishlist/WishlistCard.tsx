"use client";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { Card, Image, Text, Group, ActionIcon } from "@mantine/core";
import classes from "./WishlistCard.module.css";
import { TProduct, Wishlist } from "@/types/app.type";
import { trimWords } from "@/helpers/functions";
import Link from "next/link";

export type WishlistCardProps = {
  wish: Wishlist;
  onUnLikeClick: (wish: Wishlist) => void;
};

export function WishlistCard({ wish, onUnLikeClick }: WishlistCardProps) {
  const handleOnClickUnLike = () => {
    onUnLikeClick(wish);
  };
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section pos="relative" style={{ cursor: "pointer" }}>
        <Link href={`/products/${wish.product.slug}`}>
          <Image
            src={wish.product.thumbnail}
            alt={wish.product.name}
            height={320}
          />
        </Link>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Group>
            <Text w="100%" fz="h5" fw={500}>
              {trimWords(wish.product.name, 40)}
            </Text>
          </Group>
          <ActionIcon
            pos="absolute"
            bottom={0}
            right={0}
            variant="transparent"
            radius="xs"
            size={36}
            onClick={handleOnClickUnLike}
          >
            {" "}
            <IconHeartFilled className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  );
}
