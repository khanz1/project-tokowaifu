import Product from "@/db/models/product.model";
import { FeaturedProduct } from "@/features/Home/FeaturedProduct";
import { FeaturedServices } from "@/features/Home/FeaturedServices";
import { Footer } from "@/features/Home/Footer";
import { HeroHomePage } from "@/features/Home/HomePage/Hero";
import { ProductNavigator } from "@/features/Home/ProductNavigator";
import "@mantine/carousel/styles.css";

export default async function Home() {
  const products = await Product.findMostPopular();
  return (
    <main>
      <HeroHomePage />
      <FeaturedServices />
      <FeaturedProduct products={products} />
      <ProductNavigator />
      <Footer />
    </main>
  );
}
