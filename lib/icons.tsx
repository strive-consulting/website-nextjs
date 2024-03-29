import { Icon, Icons } from '@/types'

export const icons: Icon[] = [
  {
    name: Icons.Star,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
        <path
          className='stroke-current text-purple-100'
          d='M30 39.313l-4.18 2.197L27 34.628l-5-4.874 6.91-1.004L32 22.49l3.09 6.26L42 29.754l-3 2.924'
          strokeLinecap='square'
          strokeWidth='2'
          fill='none'
          fillRule='evenodd'
        />
        <path className='stroke-current text-purple-300' d='M43 42h-9M43 37h-9' strokeLinecap='square' strokeWidth='2' />
      </svg>
    ),
  },
  {
    name: Icons.List,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <circle className='fill-current text-purple-600' cx='32' cy='32' r='32' />
        <path className='stroke-current text-purple-100' strokeWidth='2' strokeLinecap='square' d='M21 23h22v18H21z' fill='none' fillRule='evenodd' />
        <path className='stroke-current text-purple-300' d='M26 28h12M26 32h12M26 36h5' strokeWidth='2' strokeLinecap='square' />
      </svg>
    ),
  },
  {
    name: Icons.Globe,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
        <g transform='translate(21 21)' strokeLinecap='square' strokeWidth='2' fill='none' fillRule='evenodd'>
          <ellipse className='stroke-current text-purple-300' cx='11' cy='11' rx='5.5' ry='11' />
          <path className='stroke-current text-purple-100' d='M11 0v22M0 11h22' />
          <circle className='stroke-current text-purple-100' cx='11' cy='11' r='11' />
        </g>
      </svg>
    ),
  },
  {
    name: Icons.Person,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
        <g transform='translate(22 21)' strokeLinecap='square' strokeWidth='2' fill='none' fillRule='evenodd'>
          <path className='stroke-current text-purple-100' d='M17 22v-6.3a8.97 8.97 0 003-6.569A9.1 9.1 0 0011.262 0 9 9 0 002 9v1l-2 5 2 1v4a2 2 0 002 2h4a5 5 0 005-5v-5' />
          <circle className='stroke-current text-purple-300' cx='13' cy='9' r='3' />
        </g>
      </svg>
    ),
  },
  {
    name: Icons.Like,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
        <g strokeLinecap='square' strokeWidth='2' fill='none' fillRule='evenodd'>
          <path className='stroke-current text-purple-100' d='M29 42h10.229a2 2 0 001.912-1.412l2.769-9A2 2 0 0042 29h-7v-4c0-2.373-1.251-3.494-2.764-3.86a1.006 1.006 0 00-1.236.979V26l-5 6' />
          <path className='stroke-current text-purple-300' d='M22 30h4v12h-4z' />
        </g>
      </svg>
    ),
  },
  {
    name: Icons.Thought,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
        <g transform='translate(21 22)' strokeLinecap='square' strokeWidth='2' fill='none' fillRule='evenodd'>
          <path className='stroke-current text-purple-300' d='M17 2V0M19.121 2.879l1.415-1.415M20 5h2M19.121 7.121l1.415 1.415M17 8v2M14.879 7.121l-1.415 1.415M14 5h-2M14.879 2.879l-1.415-1.415' />
          <circle className='stroke-current text-purple-300' cx='17' cy='5' r='3' />
          <path className='stroke-current text-purple-100' d='M8.86 1.18C3.8 1.988 0 5.6 0 10c0 5 4.9 9 11 9a10.55 10.55 0 003.1-.4L20 21l-.6-5.2a9.125 9.125 0 001.991-2.948' />
        </g>
      </svg>
    ),
  },
  {
    name: Icons.Bookmark,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
        <g fill='none' fillRule='evenodd'>
          <path className='stroke-current text-purple-300' d='M40 22a2 2 0 012 2v16a2 2 0 01-2 2H24a2 2 0 01-2-2V24a2 2 0 012-2' strokeWidth='2' strokeLinecap='square' />
          <path className='stroke-current text-purple-100' strokeWidth='2' strokeLinecap='square' d='M36 32l-4-3-4 3V22h8z' />
        </g>
      </svg>
    ),
  },
  {
    name: Icons.Tick,
    icon: (
      <svg className='w-16 h-16 mb-4' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
        <path className='stroke-current text-purple-300' strokeWidth='2' strokeLinecap='square' d='M21 35l4 4 12-15' fill='none' fillRule='evenodd' />
        <path className='stroke-current text-purple-100' d='M42 29h-3M42 34h-7M42 39H31' strokeWidth='2' strokeLinecap='square' />
      </svg>
    ),
  },
]
