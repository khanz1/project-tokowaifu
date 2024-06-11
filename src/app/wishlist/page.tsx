"use client";
import { ProductCard } from "@/features/Products/ProductPage/ProductCard";
import { WishlistCard } from "@/features/Wishlist/WishlistCard";
import { Wishlist } from "@/types/app.type";
import { TWishlist } from "@/validators/wishlist.validator";
import { Box, Container, Grid, Loader, Text, TextInput } from "@mantine/core";
import { WithId } from "mongodb";
import { useEffect, useState } from "react";

export default function Page() {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);

  const fetchWishlist = async () => {
    const res = await fetch("/api/wishlist");
    const data = await res.json();
    setWishlist(data);
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleOnUnLikeClick = async (wish: Wishlist) => {
    await fetch("/api/wishlist/" + wish._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchWishlist();
  };
  return (
    <Container fluid size="xl" py="xl">
      <Grid>
        {wishlist.map((wish) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={wish._id.toString()}>
            <WishlistCard wish={wish} onUnLikeClick={handleOnUnLikeClick} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
