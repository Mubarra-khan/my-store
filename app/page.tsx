// app/page.tsx - This should remain a server component
import HeroSection from "@/components/home/HeroSection";
import Categories from "@/components/home/Categories";
 import FeaturedProducts from "../components/home/FeaturedProducts";
 import Features from "@/components/home/Features";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Features />
    </div>
  );
}