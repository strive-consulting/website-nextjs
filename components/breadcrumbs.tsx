interface BreadCrumbProps {
  homeUrl: string
  homeTitle: string
  currentPageName?: string
}

export default function BreadCrumbs({ homeUrl, homeTitle, currentPageName }: BreadCrumbProps) {
  return (
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
  )
}
