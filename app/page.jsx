import { guidesInOrder, guidesBySlug } from "@/data/guides";
import HomeView from "@/components/HomeView";

export default function Home() {
  const essentials = guidesInOrder.filter((g) => g.category === "essential" && g.phase === "after-arrival");
  const extras = guidesInOrder.filter((g) => g.category === "extra");
  const visa = guidesBySlug["before-you-arrive"] || null;
  return <HomeView essentials={essentials} extras={extras} visa={visa} />;
}
