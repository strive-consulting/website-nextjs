import Link from 'next/link'

export default function PostTags({ tags, disableLinks }: { tags: string[], disableLinks?: boolean }) {
  let tagColor = (tag: string) => {
    switch (tag) {
      case 'Tax':
        return 'text-gray-100 bg-blue-500 hover:bg-blue-600'
      case 'Education':
        return 'text-gray-100 bg-pink-500 hover:bg-pink-600'
      case 'Lifestyle':
        return 'text-gray-100 bg-teal-500 hover:bg-teal-600'
      case 'Visas':
        return 'text-gray-100 bg-green-500 hover:bg-green-600'
      case 'HR':
        return 'text-gray-100 bg-yellow-500 hover:bg-yellow-600'
      case 'Accounting':
        return 'text-gray-100 bg-red-500 hover:bg-red-600'
      case 'Saudi':
        return 'text-gray-100 bg-orange-500 hover:bg-orange-600'
      default:
        return 'text-gray-100 bg-purple-600 hover:bg-purple-700'
    }
  }

  return (
    <ul className='flex flex-wrap text-xs font-medium -m-1'>
      {tags.map((tag, tagIndex) => (
        <li key={tagIndex} className='m-1'>
          {disableLinks ? (
            <span className={`inline-flex text-center py-1 px-3 rounded-full transition duration-150 ease-in-out text-gray-100 bg-purple-600 hover:bg-purple-700`}>
              {tag}
            </span>
          ) : null}
          {!disableLinks && (
            <Link href={`/blog/tag/${tag.toLowerCase()}`} className={`inline-flex text-center py-1 px-3 rounded-full transition duration-150 ease-in-out ${tagColor(tag)}`}>
              {tag}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
