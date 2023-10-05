export const metadata: Metadata = {
  title: "About Us",
  description:
    "Strive is your one-stop shop for company formation and set up in UAE • Get your Mainland & Free zone company set up in Dubai today at low cost",
  alternates: {
    canonical: "about",
  },
};
import HeroAbout from "@/components/hero-about";
import TeamImages from "@/components/team-images";
import Timeline from "@/components/timeline";
import Team from "@/components/team";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import Career from "@/components/career";
import Clients from "@/components/clients";
import Newsletter from "@/components/newsletter";
import { Metadata } from "next";
import HeroMain from "@/components/hero-main";

export default function About() {
  return (
    <>
      <HeroMain
        title="Making setting up in Dubai easy"
        subTitle="We help businesses from Europe, North America and beyond expand into the Middle East"
        backgroundImagePath="/images/about-hero.jpg" showBackgroundIllustration={false}      />
      {/* <HeroAbout /> */}
      <TeamImages />
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h2 className="h2 mb-4">Making setting up in Dubai easy</h2>
              <p className="text-xl text-gray-400">
                At Strive we try to put service ahead of anything else. We focus
                on quality of service rather than the quantity of clients that
                we take on board. Providing clear and transparent information to
                clients is what we feel makes us unique.
              </p>
              <p className="text-xl text-gray-400 mt-8">
                At Strive we try to put service ahead of anything else. We focus
                on quality of service rather than the quantity of clients that
                we take on board. Providing clear and transparent information to
                clients is what we feel makes us unique.
              </p>

              <ul className="text-xl text-gray-400 mt-8">
                <li>Communication with a personal touch.</li>

                <li>Transparency that builds trust.</li>

                <li>Dedication toward support and service.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <Timeline /> */}
      <Team />
      {/* <TestimonialsCarousel /> */}
      {/* <Career /> */}
      <Clients />
      {/* <Newsletter /> */}
    </>
  );
}
