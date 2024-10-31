import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Script from 'next/script'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>

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
 * Component for "Video" Slices.
 */
const Video = ({ slice }: VideoProps): JSX.Element => {
  const hasCtaLink = slice.primary.cta_link && 'url' in slice.primary.cta_link;
  if (slice.variation === 'default') {
    return (
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-5 pb-5 px-12' data-aos='fade-up'>
            <h2 className='h3 mb-4'>{slice.primary.video_title}</h2>
            {slice.primary.youtube_video.embed_url != null && (
              <div className='relative videoWrapper'>{loadVideoIframe(slice.primary.youtube_video.embed_url, slice.primary.youtube_video.title?.toString())}</div>
            )}
            <PrismicRichText
              field={slice.primary.video_description}
              components={{
                paragraph: ({ children }) => <p className='mb-5 text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>{children}</p>,
                heading3: ({ children }) => <h3 className='h4 my-6'>{children}</h3>,
                heading4: ({ children }) => <h4 className='h5 my-6'>{children}</h4>,
                // hyperlink: ({ children }) => <a className='text-xl text-gray-100 hover:underline hover:bg-purple-700'>{children}</a>,
              }}
            />
            {hasCtaLink && (
               <PrismicNextLink className='btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto' field={slice.primary.cta_link}>
                {slice.primary.cta_text}
              </PrismicNextLink>
            )}
          </div>
        </div>
        <Script src='https://fast.wistia.com/embed/medias/9mpb1bvrd4.jsonp' async defer></Script>
        <Script src='https://fast.wistia.com/assets/external/E-v1.js' async defer></Script>
      </section>
    )
  } else {
    return (
      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='py-12 md:py-10 border-t border-gray-800'>
            {/* Items */}
            <div className='grid gap-20 bg-gray-800 p-10' data-aos-id-target>
              {/* Item */}
              <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
                {/* Image */}
                <div
                  className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl`}
                  data-aos='fade-right'
                  data-aos-delay='200'
                  data-aos-anchor='[data-aos-id-target]'
                >
                  {slice.primary.youtube_video.embed_url != null && (
                    <div className='relative videoWrapper'>{loadVideoIframe(slice.primary.youtube_video.embed_url, slice.primary.youtube_video.title?.toString())}</div>
                  )}
                  <Script src='https://fast.wistia.com/embed/medias/9mpb1bvrd4.jsonp' async defer></Script>
                  <Script src='https://fast.wistia.com/assets/external/E-v1.js' async defer></Script>
                </div>

                {/* Content */}
                <div className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6`}>
                  <h2 className='h3 mb-4'>{slice.primary.video_title}</h2>
                  <PrismicRichText
                    field={slice.primary.video_description}
                    components={{
                      paragraph: ({ children }) => <p className='mb-5 text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>{children}</p>,
                      heading3: ({ children }) => <h3 className='h4 my-6'>{children}</h3>,
                      heading4: ({ children }) => <h4 className='h5 my-6'>{children}</h4>,
                      // hyperlink: ({ children }) => <a className='text-xl text-gray-100 hover:underline hover:bg-purple-700'>{children}</a>,
                    }}
                  />
                  {hasCtaLink && (
                    <PrismicNextLink className='btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto' field={slice.primary.cta_link}>
                      {slice.primary.cta_text}
                    </PrismicNextLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Video
