import Image from 'next/image'

export default function Trustpilot() {
  return (
    <>
      <p className='text-md text-gray-400 my-3'>
        We&apos;re proud to be rated 4.8 stars on Trustpilot
      </p>
      <div className='flex justify-center items-center'>
        <Image
          src='/images/trustpilot.png'
          alt='Strive on Trustpilot'
          width={300}
          height={43}
          priority={true}
        />
      </div>
    </>
  )
}
