import Image from 'next/image'
import Link from 'next/link'
interface TrustpilotProps {
  centerAlignment?: boolean
  centerTextAlignment?: boolean
}

export default function Trustpilot({ centerAlignment, centerTextAlignment }: TrustpilotProps) {
  const flexDirection = centerAlignment ? 'justify-center sm:justify-start pb-10' : 'justify-center'
  const textDirection = centerTextAlignment ? 'text-center' : ''
  const paddingBottom = centerTextAlignment ? 'pb-10' : ''
  return (
    <>
      <p className={`text-md text-gray-400 my-3 ${textDirection}`}>We&apos;re proud to be rated 4.8 stars on Trustpilot</p>
      <div className={`flex ${flexDirection} items-center ${paddingBottom}`}>
        <Link href='https://uk.trustpilot.com/review/strive.ae'>
          <Image src='/images/trustpilot.png' alt='Strive on Trustpilot' width={300} height={43} priority={true} />
        </Link>
      </div>
    </>
  )
}
