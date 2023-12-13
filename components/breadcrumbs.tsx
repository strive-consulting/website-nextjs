import { Constants } from '@/app/constants'
import SchemaTag from './schema'

interface BreadCrumbProps {
  homeUrl: string
  homeTitle: string
  currentPageName?: string
  currentPageUrl: string
}

export default function BreadCrumbs({ homeUrl, homeTitle, currentPageName, currentPageUrl }: BreadCrumbProps) {
  let schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: '1',
        name: homeTitle,
        item: Constants.SiteDomain + homeUrl,
      },
      {
        '@type': 'ListItem',
        position: '2',
        name: currentPageName,
        item: currentPageUrl,
      },
    ],
  }

  return (
    <>
      <nav className='w-full rounded-md'>
        <ol className='list-reset flex'>
          <li>
            <a href={homeUrl} className='text-primary'>
              {homeTitle}
            </a>
          </li>
          <li>
            <span className='mx-2 text-neutral-500 dark:text-neutral-400'>/</span>
          </li>
          <li className='text-neutral-500'>{currentPageName}</li>
        </ol>
      </nav>

      <SchemaTag schemaJson={schema} />
    </>
  )
}
