import { Content } from '@prismicio/client'
import { PrismicImage, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `TeamImages`.
 */
export type TeamImagesProps = SliceComponentProps<Content.TeamImagesSlice>

/**
 * Component for "TeamImages" Slices.
 */
const TeamImages = ({ slice }: TeamImagesProps): JSX.Element => {
  return (
    <section className='relative mb-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='max-w-3xl mx-auto'>
          <div className='relative w-full h-0 pb-3/4'>
            <figure
              className='absolute h-auto'
              style={{ top: '45%', width: '41.67%', maxWidth: '320px' }}
              data-aos='fade-right'
            >
              <PrismicImage field={slice.primary.image_1} width='320' height='240' />
            </figure>
            <figure
              className='relative mx-auto h-auto'
              style={{ width: '78.13%', maxWidth: '500px' }}
              data-aos='fade-down'
              data-aos-delay='100'
            >
              <PrismicImage field={slice.primary.image_2} width='600' height='338' />
            </figure>
            <figure
              className='absolute h-auto'
              style={{ top: '8.5%', right: '0', width: '32.55%', maxWidth: '250px' }}
              data-aos='fade-left'
              data-aos-delay='200'
            >
              <PrismicImage field={slice.primary.image_3} width='250' height='188' />
            </figure>
            <figure
              className='absolute h-auto'
              style={{ bottom: '0', right: '20%', width: '25.52%', maxWidth: '196px' }}
              data-aos='fade-up'
              data-aos-delay='300'
            >
              <PrismicImage field={slice.primary.image_4} width='196' height='196' />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamImages
