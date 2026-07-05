import { notFound } from "next/navigation";
import { getGuide, guidesBySlug } from "@/data/guides";
import GuideView from "@/components/GuideView";

export function generateStaticParams() {
  return Object.keys(guidesBySlug).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const prereqGuides = guide.prerequisites
    .map((s) => guidesBySlug[s])
    .filter(Boolean);

  return <GuideView guide={guide} prereqGuides={prereqGuides} />;
}
