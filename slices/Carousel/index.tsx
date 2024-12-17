import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';
import { Content } from '@prismicio/client';

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

function loadVideoIframe(url: string, title?: string, description?: string): JSX.Element {
  if (url.includes('wistia')) {
    const parts = url.split('/')
    const videoId = parts[parts.length - 1]

    return (
      <iframe
        src={`https://fast.wistia.net/embed/iframe/${videoId}?seo=true&videoFoam=false`}
        title={title?.toString()}
        allow='autoplay; fullscreen'
        className='wistia_embed absolute top-0 left-0 w-full h-full'
        name='wistia_embed'
        allowFullScreen={true}
      ></iframe>
    )
  } else {
    //YouTube
    return (
      <iframe
        className='absolute top-0 left-0 w-full h-full'
        src={`${url.replace('watch?v=', 'embed/')}?modestbranding=1&showinfo=0`}
        title={title?.toString()}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen={true}
      ></iframe>
    )
  }
}
/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  return (
    <section className="carousel-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center pb-12 md:pb-20">
          <h3 className="h2 mb-4">{slice.primary.title}</h3>
          {slice.primary.description && (
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p className="text-xl text-gray-400">{children}</p>,
              }}
            />
          )}
        </div>

        {/* Carousel Items */}
        <div className="carousel-container flex overflow-x-scroll gap-6">
          {slice.items.map((item, index) => (
            <div key={index} className="carousel-item flex-shrink-0 w-80 bg-gray-800 p-6" data-aos="fade-up">
              {item.youtube_video_link != null && (
              <div className='relative videoWrapper'>{loadVideoIframe(item.youtube_video_link.embed_url, item.title?.toString())}</div>
            )}
      
              <div className="mt-6">
                {item.title && <h4 className="text-lg font-medium text-white text-center">{item.title}</h4>}
                {item.description && (
                  <PrismicRichText
                    field={item.description}
                    components={{
                      paragraph: ({ children }) => <p className="text-gray-400 mt-2 text-center">{children}</p>,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
