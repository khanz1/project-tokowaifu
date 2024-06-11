
import { Box, Button } from "@mantine/core";
import Link from "next/link";

export const ProductNavigator = () => {
  return (
    <Box w="100%" display="flex" style={{ justifyContent: "center" }}>
      <Link href="/products">
        <Button justify="center">See other products...</Button>
      </Link>
    </Box>
  );
}