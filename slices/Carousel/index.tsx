'use client';

import { useEffect } from 'react';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Content } from '@prismicio/client';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

function loadVideoIframe(url: string, title?: string): JSX.Element {
  if (url.includes('wistia')) {
    const parts = url.split('/');
    const videoId = parts[parts.length - 1];

    return (
      <iframe
        src={`https://fast.wistia.net/embed/iframe/${videoId}?seo=true&videoFoam=false`}
        title={title || 'Video'}
        allow="autoplay; fullscreen"
        className="wistia_embed absolute top-0 left-0 w-full h-full"
        name="wistia_embed"
        allowFullScreen
      ></iframe>
    );
  } else {
    // YouTube
    return (
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`${url.replace('watch?v=', 'embed/')}?modestbranding=1&showinfo=0`}
        title={title || 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }
}

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  useEffect(() => {
    const items = slice.items.length;

    const splideElement = document.querySelector('.splide');
    if (splideElement && !splideElement.classList.contains('splide--initialized')) {
      new Splide('.splide', {
        type: 'slide',
        perPage: 3,
        gap: '1rem',
        focus: 'center',
        pagination: false,
        arrows: false,
        pauseOnHover: true,
        breakpoints: {
          768: {
            perPage: 1,
          },
        },
        padding: { left: '1rem', right: '1rem' },
      }).mount();
    }
  }, [slice.items]);

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
        <div className="splide">
          <div className="splide__track">
            <ul className="splide__list flex gap-2">
              {slice.items.map((item, index) => (
                <li
                  key={index}
                  className="splide__slide flex-shrink-0 w-80 bg-gray-800 p-6"
                  data-aos="fade-up"
                >
                  {item.youtube_video_link != null && (
                    <div className="relative videoWrapper">
                      {loadVideoIframe(item.youtube_video_link.embed_url, item.title?.toString())}
                    </div>
                  )}
                  <div className="mt-6">
                    {item.title && (
                      <h4 className="text-lg font-medium text-white text-center">{item.title}</h4>
                    )}
                    {item.description && (
                      <PrismicRichText
                        field={item.description}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="text-gray-400 mt-2 text-center">{children}</p>
                          ),
                        }}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
