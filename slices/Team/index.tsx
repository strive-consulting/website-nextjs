import { Content } from '@prismicio/client'
import { PrismicImage, PrismicLink, PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Team`.
 */
export type TeamProps = SliceComponentProps<Content.TeamSlice>

/**
 * Component for "Team" Slices.
 */
const Team = ({ slice }: TeamProps): JSX.Element => {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='py-12 md:py-20 border-t border-gray-800'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h2 className='h2 mb-4'>{slice.primary.title}</h2>
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className='text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>
                    {children}
                  </p>
                ),
              }}
            />
          </div>

          {/* Team members */}
          <div
            className='sm:flex sm:flex-wrap sm:justify-center -my-4 sm:-my-8 sm:-mx-3'
            data-aos-id-team
          >
            {slice.items.map((item) => {
              return (
                <div
                  key={item.team_member_name}
                  className='sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3'
                  data-aos='fade-up'
                  data-aos-anchor='[data-aos-id-team]'
                >
                  <div className='flex flex-col items-center'>
                    <PrismicImage
                      className='rounded-full mb-4'
                      field={item.team_member_avatar}
                      width={120}
                      height={120}
                    />
                    <h4 className='text-xl font-medium mb-1'>{item.team_member_name}</h4>
                    <div className='text-gray-500 mb-1'>{item.team_member_title}</div>
                    {/* <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">LinkedIn</a> */}
                    {slice.primary.show_linkedin_links && (
                      <PrismicLink
                        field={item.team_member_linkedin}
                        className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                        aria-label='Linkedin'
                      >
                        <svg
                          className='w-8 h-8 fill-current'
                          viewBox='0 0 32 32'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z' />
                        </svg>
                      </PrismicLink>
                    )}
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

export default Team
