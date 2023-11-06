import dynamic from 'next/dynamic'

const Calendly = dynamic(() => import('./calendly'), {
  ssr: false,
})

interface CalendarProps {
  url: string
  popup: boolean
  ctaid: string;
}

export default function CalendlyWrapper({ url, popup, ctaid }: CalendarProps) {
  return <Calendly url={url} popup={popup} ctaid={ctaid}/>
}
