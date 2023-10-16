import { icons } from '@/lib/icons'
import { Icons } from '@/types'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ProcessSteps`.
 */
export type ProcessStepsProps = SliceComponentProps<Content.ProcessStepsSlice>

/**
 * Component for "ProcessSteps" Slices.
 */
const ProcessSteps = ({ slice }: ProcessStepsProps): JSX.Element => {

  const step1Icon = icons.find((icon) => icon.name === Icons.List.toLowerCase())
  const step2Icon = icons.find((icon) => icon.name === Icons.Bookmark.toLowerCase()) //bookmark
  const step3Icon = icons.find((icon) => icon.name === Icons.Tick.toLowerCase()) //tick
  
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='pt-10 pb-12 md:pt-16 md:pb-20'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h2 className='h2 mb-4' data-aos='fade-up'>
              {slice.primary.title}
            </h2>
            <PrismicRichText
              field={slice.primary.sub_text}
              components={{
                paragraph: ({ children }) => (
                  <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>{children}</p>
                ),
              }}
            />
          </div>

          {/* Items */}
          <div className='max-w-sm mx-auto grid gap-8 md:grid-cols-3 lg:gap-16 items-start md:max-w-none'>
            {/* 1st item */}
            <div className='relative flex flex-col items-center' data-aos='fade-up'>
              <div
                aria-hidden='true'
                className='absolute h-1 border-t border-dashed border-gray-700 hidden md:block processStep'
                data-aos='fade-in'
                data-aos-delay='200'
              ></div>
              {step1Icon ? step1Icon?.icon : <></>}
              {/* <svg
                className='w-16 h-16 mb-4'
                viewBox='0 0 64 64'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect className='fill-current text-purple-600' width='64' height='64' rx='32' />
                <path
                  className='stroke-current text-purple-300'
                  strokeWidth='2'
                  strokeLinecap='square'
                  d='M21 23h22v18H21z'
                  fill='none'
                  fillRule='evenodd'
                />
                <path
                  className='stroke-current text-purple-100'
                  d='M26 28h12M26 32h12M26 36h5'
                  strokeWidth='2'
                  strokeLinecap='square'
                />
              </svg> */}
              <h4 className='h4 mb-2'>
                <span className='text-gray-400'>1</span>. {slice.primary.step_1_title}
              </h4>
              <p className='text-lg text-gray-400 text-center'>
                {slice.primary.step_1_text}
              </p>
            </div>

            {/* 2nd item */}
            <div
              className='relative flex flex-col items-center'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div
                aria-hidden='true'
                className='absolute h-1 border-t border-dashed border-gray-700 hidden md:block processStep'
                data-aos='fade-in'
                data-aos-delay='400'
              ></div>
              {step2Icon ? step2Icon?.icon : <></>}
              <h4 className='h4 mb-2'>
                <span className='text-gray-400'>2</span>. {slice.primary.step_2_title}
              </h4>
              <p className='text-lg text-gray-400 text-center'>
              {slice.primary.step_2_text}
              </p>
            </div>

            {/* 3rd item */}
            <div
              className='relative flex flex-col items-center'
              data-aos='fade-up'
              data-aos-delay='400'
            >
              {step3Icon ? step3Icon?.icon : <></>}
              <h4 className='h4 mb-2'>
                <span className='text-gray-400'>3</span>. {slice.primary.step_3_title}
              </h4>
              <p className='text-lg text-gray-400 text-center'>
              {slice.primary.step_3_text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSteps
