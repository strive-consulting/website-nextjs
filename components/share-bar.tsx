'use client'

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  XIcon,
  FacebookIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share'

interface ShareBarProps {
  url: string
  title?: string
}

export default function ShareBar({ url, title }: ShareBarProps) {
  const striveRed = '#ff4040'
  const bgStyle = { fill: 'transparent' }
  return (
    <ul className='inline-flex mt-4 md:ml-4 md:mb-0'>
      <li>
        <WhatsappShareButton url={url} title={title} className='twitter'>
          <WhatsappIcon size={32} iconFillColor={striveRed} round bgStyle={bgStyle} />
        </WhatsappShareButton>
      </li>
      <li className='ml-4'>
        <TwitterShareButton url={url} title={title} className='twitter'>
          <XIcon size={32} iconFillColor={striveRed} round bgStyle={bgStyle} />
        </TwitterShareButton>
      </li>
      <li className='ml-4'>
        <FacebookShareButton url={url} title={title} className='twitter'>
          <FacebookIcon size={32} iconFillColor={striveRed} round bgStyle={bgStyle} />
        </FacebookShareButton>
      </li>
      <li className='ml-4'>
        <LinkedinShareButton url={url} title={title} className='twitter'>
          <LinkedinIcon size={32} iconFillColor={striveRed} round bgStyle={bgStyle} />
        </LinkedinShareButton>
      </li>
      <li className='ml-4'>
        <TelegramShareButton url={url} title={title} className='twitter'>
          <TelegramIcon size={32} iconFillColor={striveRed} round bgStyle={bgStyle} />
        </TelegramShareButton>
      </li>
      <li className='ml-4'>
        <EmailShareButton url={url} title={title} className='twitter'>
          <EmailIcon size={32} iconFillColor={striveRed} round bgStyle={bgStyle} />
        </EmailShareButton>
      </li>
    </ul>
  )
}
