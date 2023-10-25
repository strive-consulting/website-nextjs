import Link from 'next/link'
import Image from 'next/image'
import PostDate from '@/components/post-date'
import PostTags from './post-tags'
import { AuthorDocument, BlogPostDocument } from '@/prismicio-types'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import { isFilled } from '@prismicio/client'

interface Props {
  post: BlogPostDocument
}
export default function PostItem({ post }: Props) {
  // function loadAuthor(post : BlogPostDocument) {
  //   if(isFilled.contentRelationship<'author', string, Pick<AuthorDocument['data'], 'name' | 'job_title' | 'linkedin_url' | 'avatar'>>(post.data.author) ) {
  //     console.log("NAME", post.data.author.data?.job_title) // It's working well!

  //     return;
  //   //   return <Link href='#'>
  //   //   <PrismicImage
  //   //     className='rounded-full shrink-0 mr-4'
  //   //     field={post.data.author.data?.avatar}
  //   //     width={40}
  //   //     height={40}
  //   //   />
  //   // </Link>
  //   }

  // }

  // console.log(post.data.image)

  return (
    <article className='flex flex-col h-full' data-aos='fade-up'>
      <header>
        <Link href={`/blog/${post.uid}`} className='block mb-6'>
          <figure className='relative h-0 pb-9/16 overflow-hidden rounded-sm'>
            {post.data.image && (
              <PrismicImage
                className='absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out'
                field={post.data.image}
                width={352}
                height={198}
              />
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
        {post.tags && (
          <div className='mb-3'>
            <PostTags tags={post.tags} />
          </div>
        )}
        <h3 className='h4 mb-2'>
          <Link
            href={`/blog/${post.uid}`}
            className='hover:text-gray-100 transition duration-150 ease-in-out'
          >
            {post.data.title}
          </Link>
        </h3>
      </header>
      <PrismicRichText
        field={post.data.introduction}
        components={{
          paragraph: ({ children }) => <p className='text-lg text-gray-400 grow'>{children}</p>,
        }}
      />
      <footer className='flex items-center mt-4'>
        <Link href='#'>
          <PrismicImage
            className='rounded-full shrink-0 mr-4'
            field={post.data.author.data?.avatar}
            width={40}
            height={40}
          />
        </Link>
        {/* {loadAuthor(post)} */}
        <div className='font-medium'>
          <Link
            href='#'
            className='text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out'
          >
            {post.data.author.data?.name}
          </Link>
          <span className='text-gray-700'> - </span>
          <span className='text-gray-500'>
            <PostDate dateString={post.data.published_date?.toString() || ''} />
          </span>
        </div>
      </footer>
    </article>
  )
}
