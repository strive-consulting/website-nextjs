import { Divider } from '@/components/divider'
import PostItem from '@/components/post-item'
import { getBlogPostsPaged } from '@/lib/cms'
import { Content } from '@prismicio/client'
import { PrismicLink, PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'

/**
 * Props for `BlogFeed`.
 */
export type BlogFeedProps = SliceComponentProps<Content.BlogFeedSlice>

/**
 * Component for "BlogFeed" Slices.
 */
const BlogFeed = async ({ slice }: BlogFeedProps): Promise<JSX.Element> => {
  const postCount = slice.primary.number_to_show ? parseInt(slice.primary.number_to_show) : 3
  const blogPosts = await getBlogPostsPaged(1, postCount)

  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <Divider />

        <div className='max-w-sm mx-auto md:max-w-none text-center pb-5'>
          {/*  Section title */}
          <h3 className='h2 mb-4'>{slice.primary.title}</h3>

          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => <p className='text-xl text-gray-400 py-5 my-5'>{children}</p>,
            }}
          />

          {/*  Articles container */}
          <div className='grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start'>
            {blogPosts.generalPosts.map((post, postIndex) => (
              <PostItem key={postIndex} post={post} mini={true} />
            ))}
          </div>
        </div>

        <div className='flex justify-center mb-8' data-aos='fade-up' data-aos-delay='400' data-aos-anchor='[data-aos-id-cta]'>
          <Link className='btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6' href='/blog' target='_blank'>
            View more blogs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogFeed
