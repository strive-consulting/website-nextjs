import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>

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
            <iframe
              className='absolute top-0 left-0 w-full h-full'
              src={`${slice.primary.youtube_video.embed_url.replace('watch?v=', 'embed/')}?modestbranding=1&showinfo=0`}
              title={slice.primary.youtube_video.title?.toString()}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen={true}
            ></iframe>
          </div>
        )}
        </div>
      </div>
    </section>
  )
}

export default Video
