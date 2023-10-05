export const metadata = {
  title: "Dubai Company Set Up",
  description:
    "Strive makes Dubai company formation easy. Learn about what company formation options are available in the UAE and the process of opening a business.",
};

import Hero from "@/components/hero-features";
import Stats from "@/components/stats";
import Zigzag from "@/components/zigzag";
import Blocks from "@/components/blocks";
import CaseStudies from "@/components/case-studies";
import Cta from "@/components/cta";
import HeroMain from "@/components/hero-main";

export default function Features() {
  return (
    <>
      {/* <Hero /> */}
      <HeroMain
        title="Setup a Company in Dubai from overseas"
        subTitle="Your one-stop shop for company structuring & formations in the UAE. We make setup quick and easier than ever before."
        showBackgroundIllustration={true}
        bodyImage="/images/hero-image-01.jpg"
        showCta={true}
      />
      <Zigzag />
      <Stats />
      
      <Blocks />
      <CaseStudies />
      <Cta />
    </>
  );
}
