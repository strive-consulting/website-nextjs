// import TaxComparisonTable from '@/components/tax-comparison-table'
import TaxComparisonTableV3 from '@/components/tax-comparison-table/tax-comparison-table-v3'
import ContactForm from './contact-form'
//import TaxComparisonTableV2 from '@/components/tax-comparison-table/tax-comparison-table-v2'

export default async function Page({
  searchParams,
}: {
  params: { slug: string }
  searchParams: {
    yearlyTurnOver: number
    yearlyExpenses: number
    utmCampaign?: string
    utmMedium?: string
    utmSource?: string
    utmTerm?: string
    label: string
  }
}) {
  return (
    <>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-8 md:pt-40 md:pb-6'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center mb-5'>
              <h1 className='h1 mb-4'>Corporate Tax Calculator UK vs UAE</h1>
            </div>
            <div className='w-full md:w-1/2 lg:w-3/4 mx-auto'>
              <TaxComparisonTableV3 yearlyTurnOver={searchParams?.yearlyTurnOver || 0} yearlyExpenses={searchParams?.yearlyExpenses || 0} />
            </div>
          </div>
        </div>
      </section>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-12 md:pt-8 md:pb-20'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center mb-5'>
              <h1 className='h1 mb-4'>Talk to an expert</h1>
              <p className='text-xl text-gray-400'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
              </p>
            </div>
            <div className='w-full md:w-1/2 lg:w-3/4 mx-auto'>
              <ContactForm data={searchParams} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
