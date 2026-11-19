import { TrustStrip } from "@/components/TrustStrip";
import { OpeningHero } from "@/components/home/OpeningHero";
import { HeroIntro } from "@/components/home/HeroIntro";
import { AcceleratorCatalog } from "@/components/home/AcceleratorCatalog";
import { PlatformStack } from "@/components/home/PlatformStack";
import { StackSection } from "@/components/home/StackSection";
import { HowWeShip } from "@/components/home/HowWeShip";
import { SuccessStories } from "@/components/home/SuccessStories";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { FinalCta } from "@/components/home/FinalCta";
import { principles } from "@/lib/home";

// Homepage (CLAUDE.md §5). Each section is a server component; client JS is limited to the
// agent console, the 3D scenes, the stack highlight and the pipeline rail.
export default function Home() {
  return (
    <>
      <OpeningHero />
      <HeroIntro />
      <TrustStrip principles={principles} />
      <AcceleratorCatalog />
      <PlatformStack />
      <StackSection />
      <HowWeShip />
      <SuccessStories />
      <WhoWeAre />
      <FinalCta />
    </>
  );
}
