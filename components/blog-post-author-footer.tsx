import { AuthorDocument, BlogPostDocument } from '@/prismicio-types'
import { isFilled } from '@prismicio/client'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import PostDate from './post-date'
import { PrismicNextLink } from '@prismicio/next'

interface Props {
  post: BlogPostDocument,
  type?: string
}
const BlogPostAuthorFooter: React.FC<Props> = ({ post, type }: Props) => {
  if (isFilled.contentRelationship<'author', string, Pick<AuthorDocument['data'], 'name' | 'job_title' | 'linkedin_url' | 'avatar' | 'author_description'>>(post.data.author)) {
    //console.log("NAME", post.data.author.data?.job_title) // It's working well!
if(type === "end") {
    return (
      






<div className='max-w-6xl mx-auto px-4 sm:px-6'>
    <div className='py-12 md:py-10 border-t border-gray-800'>
      <div className='bg-gray-800 shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-8'>
        {/* Image */}
        <div className='flex-shrink-0'>
          <Link href={`/blog/author/${post.data.author.uid}`}>
          <PrismicImage className='rounded-full shrink-0 mr-4' field={post.data.author.data?.avatar} width={150} height={150} />
          </Link>
        </div>

        {/* Content */}
        <div className='flex-1'>
          <h3 className='text-2xl font-bold text-white mb-4'>About the author: {post.data.author.data?.name}</h3>
          <PrismicRichText
          field={post.data.author.data?.author_description}
          components={{
            paragraph: ({ children }) => <p className='mb-5 text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>{children}</p>,
            heading3: ({ children }) => <h3 className='h4 my-6'>{children}</h3>,
            heading4: ({ children }) => <h4 className='h5 my-6'>{children}</h4>,
            // hyperlink: ({ children }) => <a className='text-xl text-gray-100 hover:underline hover:bg-purple-700'>{children}</a>,
          }}
        />
          <Link
            href={`/blog/author/${post.data.author.uid}`}
            className='inline-block bg-purple-600 text-white px-6 py-3 shadow hover:bg-purple-500 transition duration-300'
          >
            See more articles by {post.data.author.data?.name}
          </Link>
        </div>
      </div>
    </div>
  </div>






    )
  }else{
     return (
      <footer className='flex items-center mt-4'>
        <Link href={`/blog/author/${post.data.author.uid}`}>
          <PrismicImage className='rounded-full shrink-0 mr-4' field={post.data.author.data?.avatar} width={40} height={40} />
        </Link>
        <div className='font-medium'>
          <Link href={`/blog/author/${post.data.author.uid}`} className='text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out'>
            {post.data.author.data?.name}
          </Link>
          <span className='text-gray-700'> - </span>
          <span className='text-gray-500'>
            <PostDate dateString={post.data.published_date?.toString() || ''} />
          </span>
        </div>
      </footer>
    )
  }
}
  return <></>
}

export default BlogPostAuthorFooter
