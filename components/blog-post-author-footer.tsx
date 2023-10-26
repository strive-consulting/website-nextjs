import { AuthorDocument, BlogPostDocument } from '@/prismicio-types'
import { isFilled } from '@prismicio/client'
import { PrismicImage } from '@prismicio/react'
import Link from 'next/link'
import PostDate from './post-date'

interface Props {
  post: BlogPostDocument
}
const BlogPostAuthorFooter: React.FC<Props> = ({ post }: Props) => {
  if(isFilled.contentRelationship<'author', string, Pick<AuthorDocument['data'], 'name' | 'job_title' | 'linkedin_url' | 'avatar'>>(post.data.author) ) {
    //console.log("NAME", post.data.author.data?.job_title) // It's working well!

    return (
      <footer className='flex items-center mt-4'>
        <Link href='#'>
          <PrismicImage
            className='rounded-full shrink-0 mr-4'
            field={post.data.author.data?.avatar}
            width={40}
            height={40}
          />
        </Link>
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
    )
  }

  return <></>
}

export default BlogPostAuthorFooter
