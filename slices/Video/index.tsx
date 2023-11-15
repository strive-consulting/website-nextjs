import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Script from 'next/script'

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>

function loadVideoIframe(url: string, title?: string): JSX.Element {
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
  return (
    <section className='relative'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
        <div className='pt-5 pb-5'>
          {slice.primary.youtube_video.embed_url != null && (
            <div className='relative videoWrapper'>
              {loadVideoIframe(
                slice.primary.youtube_video.embed_url,
                slice.primary.youtube_video.title?.toString(),
              )}
            </div>
          )}
        </div>
      </div>
      <Script src='https://fast.wistia.com/embed/medias/9mpb1bvrd4.jsonp' async defer></Script>
      <Script src='https://fast.wistia.com/assets/external/E-v1.js' async defer></Script>
    </section>
  )
}

export default Video
