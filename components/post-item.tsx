import Link from 'next/link'
import Image from 'next/image'
import PostTags from './post-tags'
import { BlogPostDocument } from '@/prismicio-types'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import BlogPostAuthorFooter from './blog-post-author-footer'

interface Props {
  post: BlogPostDocument
  mini?: boolean
}
export default function PostItem({ post, mini }: Props) {
  return (
    <article className='flex flex-col h-full' data-aos='fade-up'>
      <header>
        <Link href={`/blog/${post.uid}`} className='block mb-6'>
          <figure className='relative h-0 pb-9/16 overflow-hidden rounded-sm'>
            {post.data.image && (
              <PrismicImage className='absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out' field={post.data.image} width={352} height={198} />
            )}
            {post.data.youtube_video.embed_url != null && (
              <Image
                alt={post.data.youtube_video.title ?? ''}
                src={post.data.youtube_video.thumbnail_url ?? ''}
                className='absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out'
                width={352}
                height={198}
              />
            )}
          </figure>
        </Link>
        {!mini && post.tags && (
          <div className='mb-3'>
            <PostTags tags={post.tags} />
          </div>
        )}
        <h3 className='h4 mb-2'>
          <Link href={`/blog/${post.uid}`} className='hover:text-gray-100 transition duration-150 ease-in-out'>
            {post.data.title}
          </Link>
        </h3>
      </header>
      {!mini && (
        <>
          <PrismicRichText
            field={post.data.introduction}
            components={{
              paragraph: ({ children }) => <p className='text-lg text-gray-400 grow'>{children}</p>,
            }}
          />
          <BlogPostAuthorFooter post={post} />
        </>
      )}
    </article>
  )
}
