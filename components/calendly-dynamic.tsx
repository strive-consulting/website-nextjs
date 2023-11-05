import dynamic from 'next/dynamic'

const Calendly = dynamic(() => import('./calendly'), {
  ssr: false,
})

interface CalendarProps {
  url: string
  popup: boolean
}

export default function CalendlyWrapper({ url, popup }: CalendarProps) {
  return <Calendly url={url} popup={popup} />
}
