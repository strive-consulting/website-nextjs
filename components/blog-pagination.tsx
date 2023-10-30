import Link from 'next/link'

interface Props {
  totalpages: number
  activepage: number
}

const BlogPagination: React.FC<Props> = ({ totalpages, activepage }) => {
  let items = []
  for (let number = 1; number <= totalpages; number++) {
    const onClass = activepage === number ? 'bg-purple-600' : ''

    items.push(
      <li key={number} className='m-1'>
        <Link
          href={`/blog/page/${number}`}
          className={`inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 ${onClass} hover:bg-purple-600 transition-colors duration-150 ease-in-out`}
        >
          {number}
        </Link>
      </li>,
    )
  }

  return (
    <nav className='flex justify-center pt-16' role='navigation' aria-label='Pagination Navigation'>
      <ul className='inline-flex flex-wrap font-medium text-sm -m-1'>{items}</ul>
    </nav>
  )
}

export default BlogPagination
