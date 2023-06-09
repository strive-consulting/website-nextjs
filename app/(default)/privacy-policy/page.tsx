import { createClient } from "@/prismicio";
import { TextPageDocument } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient();
  const page : TextPageDocument = await client.getByUID("text_page", "privacy-policy");
  const data = page.data;

  return {
    title: data.meta_title,
    description: data.meta_description

  }
}


export default async function Privacy() {
  const client = createClient();
  const page : TextPageDocument = await client.getByUID("text_page", "privacy-policy");
  const data = page.data;

  return (
    <>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h1 mb-4" data-aos="fade-up">{data.title}</h1>
              {/* <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">We have custom plans to power your business. Tell us your needs, and we'll contact you shortly.</p> */}
            </div>

            <PrismicRichText
              field={data.body}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
                heading2: ({ children }) => <h2 className="h2 my-4" >{children}</h2>,
                heading3: ({ children }) => <h3 className="h3 my-4" >{children}</h3>,
              }}
            />

          </div>
        </div>
      </section>

    </>
  )
}