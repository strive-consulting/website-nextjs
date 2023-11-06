import { Divider } from '@/components/divider'
import SchemaTag from '@/components/schema'
import { getTestimonials } from '@/lib/cms'
import { Content, isFilled } from '@prismicio/client'
import { PrismicLink, PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'
import { parseISO, format } from 'date-fns'
import Trustpilot from '@/components/trustpilot'
import {
  TestimonialDocument,
  TestimonialsSlice,
  TestimonialsSliceDefault,
  TestimonialsSliceSingle,
} from '@/prismicio-types'
/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>

function loadSingleTestimonial(slice: TestimonialsSliceSingle) {
  console.log(slice.primary.testimonial)
  if (
    isFilled.contentRelationship<
      'testimonial',
      string,
      Pick<TestimonialDocument['data'], 'name' | 'job_title' | 'avatar' | 'description'>
    >(slice.primary.testimonial)
  ) {
    console.log('NAME', slice.primary.testimonial.data?.job_title)

    return (
      <>
        <div className='flex flex-col h-full p-6 bg-gray-800' data-aos='fade-up'>
          <div>
            <div className='relative inline-flex flex-col mb-4'>
              {slice.primary.testimonial.data?.avatar.url && (
                <Image
                  className='rounded-full'
                  src={slice.primary.testimonial.data?.avatar.url ?? ''}
                  width={120}
                  height={120}
                  alt={`Testimonial from ${slice.primary.testimonial.data?.name ?? ''}`}
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
              field={slice.primary.testimonial.data?.description ?? ''}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
              }}
            />
          </blockquote>
          <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
            <cite className='text-gray-200 not-italic'>
              {slice.primary.testimonial.data?.name ?? ''}
            </cite>{' '}
            -{' '}
            <div className='text-purple-600'>{slice.primary.testimonial.data?.job_title ?? ''}</div>
          </div>
        </div>
      </>
    )
  }

  return <></>
}

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = async ({ slice }: TestimonialsProps): Promise<JSX.Element> => {
  if (slice.variation === 'single') {
    return (
      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <Divider />
          <div>
            {/* Section header */}
            <div className='max-w-6xl mx-auto text-center pb-12 md:pb-20'>
              <h3 className='h2 mb-4'>{slice.primary.title}</h3>

              <PrismicRichText
                field={slice.primary.sub_text}
                components={{
                  paragraph: ({ children }) => <p className='text-xl text-gray-400'>{children}</p>,
                }}
              />
            </div>

            <div className='max-w-2xl mx-auto mb-20'>{loadSingleTestimonial(slice)}</div>
          </div>
        </div>
      </section>
    )
  } else {
    const count = slice.primary.number_to_show ? parseInt(slice.primary.number_to_show) : undefined
    const testimonials = await getTestimonials(count)

    const testimonialsSchema = testimonials?.map((item, index) => {
      return {
        '@type': 'ListItem',
        position: index,
        item: {
          '@type': 'Review',
          itemReviewed: {
            '@type': 'Organization',
            name: item.data.job_title,
          },
          author: {
            '@type': 'Person',
            name: item.data.name,
          },
          reviewBody: item.data.description,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
          },
          datePublished: format(
            item.data.date_received ? parseISO(item.data.date_received.toString()) : Date.now(),
            'yyyy-MM-dd',
          ),
        },
      }
    })

    let schemaTestimonials = {
      '@context': 'http://schema.org',
      '@type': 'ItemList',
      name: 'Client Testimonials',
      itemListElement: testimonialsSchema,
    }

    return (
      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          {/* <div>{loadSingleTestimonial(slice)}</div> */}
          <Divider />
          <div>
            {/* Section header */}
            <div className='max-w-6xl mx-auto text-center pb-12 md:pb-20'>
              <h3 className='h2 mb-4'>{slice.primary.title}</h3>

              <PrismicRichText
                field={slice.primary.sub_text}
                components={{
                  paragraph: ({ children }) => <p className='text-xl text-gray-400'>{children}</p>,
                }}
              />
              <Trustpilot />
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
                      <PrismicLink
                        field={testimonial.data.profile_link}
                        className='text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out'
                      >
                        <div>{testimonial.data.job_title}</div>
                      </PrismicLink>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <SchemaTag schemaJson={schemaTestimonials} />
      </section>
    )
  }
}

export default Testimonials
