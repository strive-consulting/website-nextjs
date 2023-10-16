import { Divider } from '@/components/divider'
import { getTestimonials } from '@/lib/cms'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'
/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = async ({ slice }: TestimonialsProps): Promise<JSX.Element> => {
  const count = slice.primary.number_to_show ? parseInt(slice.primary.number_to_show) : undefined
  const testimonials = await getTestimonials(count)

  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <Divider />
        <div>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h2 className='h2 mb-4'>{slice.primary.title}</h2>

            <PrismicRichText
              field={slice.primary.sub_text}
              components={{
                paragraph: ({ children }) => <p className='text-xl text-gray-400'>{children}</p>,
              }}
            />
            <p className='text-xl text-gray-400 my-3'>
              We&apos;re proud to be rated 4.5 stars on Trustpilot
            </p>
            <div className='flex justify-center items-center'>
              <Image
                src='/images/trustpilot.png'
                alt='Strive on Trustpilot'
                width={300}
                height={43}
              />
            </div>
          </div>

          <div className='max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none'>
            {testimonials.map((testimonial) => {
              return (
                <div
                  key={testimonial.id}
                  className='flex flex-col h-full p-6 bg-gray-800'
                  data-aos='fade-up'
                >
                  <div>
                    <div className='relative inline-flex flex-col mb-4'>
                      {testimonial.data.avatar.url && (
                        <Image
                          className='rounded-full'
                          src={testimonial.data.avatar.url}
                          width={60}
                          height={60}
                          alt={`Testimonial from ${testimonial.data.name}`}
                        />
                      )}

                      <svg
                        className='absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600'
                        viewBox='0 0 24 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z' />
                      </svg>
                    </div>
                  </div>
                  <blockquote className='text-lg text-gray-400 grow'>
                    <PrismicRichText
                      field={testimonial.data.description}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                      }}
                    />
                  </blockquote>
                  <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
                    <cite className='text-gray-200 not-italic'>{testimonial.data.name}</cite> -{' '}
                    <a
                      className='text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out'
                      href='#0'
                    >
                      <div>{testimonial.data.job_title}</div>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
