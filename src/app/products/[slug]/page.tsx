import { Card, Image, Avatar, Text, Group, Stack, Box } from "@mantine/core";
import classes from "@/styles/detailProduct.module.css";
import Product from "@/db/models/product.model";
import { Metadata } from "next";
import React from "react";

export type PageProps = {
  params: {
    slug: string;
  };
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await Product.findOneBySlug(params.slug);
  if (!product) {
    return {
      title: "Tokowaifu",
      description: "Buy/Sell Genshin Impact Action Figure",
    };
  }
  return {
    title: product.name,
    description: product.excerpt,
    icons: {
      icon: product.thumbnail,
      shortcut: "/shortcut-icon.png",
      apple: "/apple-icon.png",
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.excerpt,
      images: [product.thumbnail], // Must be an absolute URL
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: product.name,
      description: product.excerpt,
      images: [
        {
          url: product.thumbnail, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const product = await Product.findOneBySlug(params.slug);
  const convertNewlinesToBr = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  if (!product) {
    return null;
  }

  return (
    <Group grow>
      <Image src={product.thumbnail} alt={product.name} />
      <div className={classes.body}>
        <Stack>
          <Box>
            <Text size="lg" className={classes.title} mt="xs">
              {product.name}
            </Text>
            <Group wrap="nowrap" gap="xs">
              {product.tags.map((tag) => (
                <Text size="xs" c="dimmed" key={tag}>
                  #{tag}
                </Text>
              ))}
            </Group>
          </Box>

          <Text size="lg" fw="bold">
            ${product.price}
          </Text>
          {product.description && (
            <>
              <Text fw="bold">Description:</Text>
              <Text size="sm" style={{ whiteSpace: "pre-warp" }}>
                {convertNewlinesToBr(product.description)}
              </Text>
            </>
          )}
        </Stack>
      </div>
    </Group>
  );
}
