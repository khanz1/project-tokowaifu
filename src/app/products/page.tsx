"use client";
import { COMMAND } from "@/constants";
import { ProductCard } from "@/features/Products/ProductPage/ProductCard";
import { FindAllOptions, TProduct } from "@/types/app.type";
import { Box, Container, Grid, Loader, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type SearchParams = FindAllOptions;

type ResProduct = {
  data: TProduct[];
  totalPages: number;
  rowsPerPage: number;
  currentPage: number;
};

export default function Page() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: {
      number: 1,
      size: 5,
    },
  });

  const fetchProducts = async (command?: COMMAND) => {
    const origin = document.location.origin;
    const url = new URL(`${origin}/api/products`);
    url.searchParams.append("page.size", searchParams.page.size.toString());
    url.searchParams.append("page.number", searchParams.page.number.toString());
    url.searchParams.append("search", searchParams.search ?? "");

    if (command === COMMAND.REFETCH) {
      url.searchParams.append("command", COMMAND.REFETCH.toString());
    }

    setIsFetching(true);

    fetch(url)
      .then((res) => res.json() as Promise<ResProduct>)
      .then((res) => {
        if (command === COMMAND.REFETCH) {
          setProducts(res.data);
        } else if (command === COMMAND.SEARCH) {
          if (res.currentPage > 1) {
            setProducts((prevState) => prevState.concat(res.data));
            setTotalPages(res.totalPages);
          } else {
            setProducts(res.data);
            setTotalPages(res.totalPages);
          }
        } else {
          setProducts((prevState) => prevState.concat(res.data));
          setTotalPages(res.totalPages);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleOnLikeClick = async (product: TProduct) => {
    if (product.wishlist) {
      await fetch("/api/wishlist/" + product.wishlist._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch("/api/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    fetchProducts(COMMAND.REFETCH);
  };

  useEffect(() => {
    if (searchParams.search) {
      fetchProducts(COMMAND.SEARCH);
    } else {
      fetchProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Container fluid size="xl" py="xl">
      <InfiniteScroll
        dataLength={products.length}
        next={() => {
          if (!isFetching) {
            if (searchParams.page.number < totalPages) {
              setSearchParams((prevState) => ({
                ...prevState,
                page: {
                  ...prevState.page,
                  number: prevState.page.number + 1,
                },
              }));
            }
          }
        }}
        hasMore={totalPages > searchParams.page.number}
        loader={<Text>Loading</Text>}
      >
        <Grid>
          <Grid.Col span={12}>
            <Grid justify="center">
              <Grid.Col span={{ base: 12, lg: 4, md: 6 }}>
                <TextInput
                  placeholder="Search..."
                  value={searchParams.search}
                  onChange={(e) => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      search: e.target.value,
                    }));
                    if (!e.target.value) {
                      setProducts([]);
                    }
                  }}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {products.map((product) => (
            <Grid.Col
              span={{ base: 12, md: 6, lg: 3 }}
              key={product._id.toString()}
            >
              <ProductCard product={product} onLikeClick={handleOnLikeClick} />
            </Grid.Col>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
