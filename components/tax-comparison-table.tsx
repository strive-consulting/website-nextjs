import { convertCurrency, getCurrencyRates } from '@/lib/helpers'

const TaxComparisonTable = async ({ yearlyTurnOver, yearlyExpenses }: { yearlyTurnOver: number; yearlyExpenses: number }) => {
  const gbpYearlyTurnover = yearlyTurnOver || 0
  const gbpYearlyExpenses = yearlyExpenses || 0
  const gbpProfitBeforeTax = gbpYearlyTurnover - gbpYearlyExpenses
  const gbpCorporateTaxStandard19PercentUpto50k = gbpProfitBeforeTax <= 50000 ? gbpProfitBeforeTax * 0.19 : 0
  const gbpCorporateTaxStandard25PercentOver50k = gbpProfitBeforeTax > 50000 ? gbpProfitBeforeTax * 0.25 : 0
  const gbpMarginalRelief = gbpProfitBeforeTax > 50000 && gbpProfitBeforeTax <= 250000 ? (250000 - gbpProfitBeforeTax) * (3 / 200) : 0
  const gbpFinalCorporateTax = gbpCorporateTaxStandard19PercentUpto50k + gbpCorporateTaxStandard25PercentOver50k - gbpMarginalRelief
  const gbpEffectiveTaxRate = gbpProfitBeforeTax > 0 ? (gbpFinalCorporateTax / gbpProfitBeforeTax) * 100 : 0
  const gbpProfitAfterTax = gbpProfitBeforeTax - gbpFinalCorporateTax

  const currencyRates = await getCurrencyRates()
  const aedYearlyTurnover = Number(await convertCurrency(currencyRates, gbpYearlyTurnover, 'GBP', 'AED'))
  const aedYearlyExpenses = Number(await convertCurrency(currencyRates, gbpYearlyExpenses, 'GBP', 'AED'))
  const aedProfitBeforeTax = aedYearlyTurnover - aedYearlyExpenses
  const aedCorporateTax9PercentAbove375k = aedYearlyTurnover >= 3000000 && aedYearlyTurnover > 375000 ? aedProfitBeforeTax * 0.09 : 0
  const aedFinalCorporateTax = aedCorporateTax9PercentAbove375k
  const aedEffectiveTaxRate = aedProfitBeforeTax > 0 ? (aedFinalCorporateTax / aedProfitBeforeTax) * 100 : 0
  const aedProfitAfterTax = aedProfitBeforeTax - aedFinalCorporateTax

  const payingTaxInUae = aedCorporateTax9PercentAbove375k > 0 ? Number(await convertCurrency(currencyRates, aedCorporateTax9PercentAbove375k, 'AED', 'GBP')) : 0

  function formatWithCommas(number: number) {
    return number.toLocaleString()
  }

  return (
    <div className='w-full max-w-6xl mx-auto p-4 font-sans'>
      {/* Header Row */}
      <div className='grid grid-cols-2 gap-6 mb-2'>
        <h2 className='text-3xl font-bold text-center'>In the UK</h2>
        <h2 className='text-3xl font-bold text-center'>In the UAE</h2>
      </div>
      {/* Tax Tables */}
      <div className='grid grid-cols-2 gap-6 mb-4'>
        {/* UK Table */}
        <div className='border-2 border-black'>
          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Profit</p>
                <p className='ml-4'>Before Tax (£)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold'>{formatWithCommas(gbpProfitBeforeTax)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Final</p>
                <p className='ml-4'>Corporate Tax (£)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold'>{formatWithCommas(gbpFinalCorporateTax)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Effective Tax</p>
                <p className='ml-4'>Rate (%)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold'>{formatWithCommas(gbpEffectiveTaxRate)}</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2'>
            <div className='p-2 border-r border-black'>
              <p className='font-bold'>Profit After</p>
              <p className='ml-4'>Tax</p>
            </div>
            <div className='p-2 flex items-center justify-end'>
              <p className='font-bold'>{formatWithCommas(gbpProfitAfterTax)}</p>
            </div>
          </div>
        </div>

        {/* UAE Table */}
        <div className='border-2 border-black'>
          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Profit</p>
                <p className='ml-4'>Before Tax (AED)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold'>{formatWithCommas(aedProfitBeforeTax)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Final</p>
                <p className='ml-4'>Corporate Tax (AED)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold'>{formatWithCommas(aedFinalCorporateTax)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Effective Tax</p>
                <p className='ml-4'>Rate (%)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold'>{formatWithCommas(aedEffectiveTaxRate)}</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2'>
            <div className='p-2 border-r border-black'>
              <p className='font-bold'>Profit After</p>
              <p className='ml-4'>Tax</p>
            </div>
            <div className='p-2 flex items-center justify-end'>
              <p className='font-bold'>{formatWithCommas(aedProfitAfterTax)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Summary Section */}
      <div className='grid grid-cols-2 border-2 border-black'>
        <div className='p-4 text-center border-r border-black'>
          <p className='font-medium'>You'll</p>
          <p className='font-medium'>be paying {formatWithCommas(gbpFinalCorporateTax)}£ in corporation tax in the UK</p>
        </div>
        <div className='p-4 text-center'>
          <p className='font-medium'>You'll</p>
          <p className='font-medium'>be paying {formatWithCommas(payingTaxInUae)}£ in corporation tax in the UAE</p>
        </div>
      </div>
      <div className='border-2 border-t-0 border-black p-4 text-center'>
        <p className='font-medium'>
          in the UAE you'll be
          <br />
          saving {formatWithCommas(gbpFinalCorporateTax - payingTaxInUae)} in corporation tax
        </p>
      </div>
    </div>
  )
}

export default TaxComparisonTable
