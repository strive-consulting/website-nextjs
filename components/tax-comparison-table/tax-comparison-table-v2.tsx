const TaxComparisonTableV2 = async ({ yearlyTurnOver, yearlyExpenses }: { yearlyTurnOver: number; yearlyExpenses: number }) => {
  const gbpYearlyTurnover = yearlyTurnOver || 0
  const gbpYearlyExpenses = yearlyExpenses || 0
  const gbpProfitBeforeTax = gbpYearlyTurnover - gbpYearlyExpenses
  const gbpCorporateTaxStandard19PercentUpto50k = gbpProfitBeforeTax <= 50000 ? gbpProfitBeforeTax * 0.19 : 0
  const gbpCorporateTaxStandard25PercentOver50k = gbpProfitBeforeTax > 50000 ? gbpProfitBeforeTax * 0.25 : 0
  const gbpMarginalRelief = gbpProfitBeforeTax > 50000 && gbpProfitBeforeTax <= 250000 ? (250000 - gbpProfitBeforeTax) * (3 / 200) : 0
  const gbpFinalCorporateTax = gbpCorporateTaxStandard19PercentUpto50k + gbpCorporateTaxStandard25PercentOver50k - gbpMarginalRelief
  const gbpEffectiveTaxRate = gbpProfitBeforeTax > 0 ? (gbpFinalCorporateTax / gbpProfitBeforeTax) * 100 : 0
  const gbpProfitAfterTax = gbpProfitBeforeTax - gbpFinalCorporateTax

  const aedYearlyTurnover = yearlyTurnOver || 0
  const aedYearlyExpenses = yearlyExpenses || 0
  const aedProfitBeforeTax = aedYearlyTurnover - aedYearlyExpenses
  const aedCorporateTax9PercentAbove375k = aedYearlyTurnover >= 3000000 && aedYearlyTurnover > 375000 ? aedProfitBeforeTax * 0.09 : 0
  const aedFinalCorporateTax = aedCorporateTax9PercentAbove375k
  const aedEffectiveTaxRate = aedProfitBeforeTax > 0 ? (aedFinalCorporateTax / aedProfitBeforeTax) * 100 : 0
  const aedProfitAfterTax = aedProfitBeforeTax - aedFinalCorporateTax

  const payingTaxInUae = aedCorporateTax9PercentAbove375k > 0 ? aedCorporateTax9PercentAbove375k : 0

  function formatWithCommas(number: number) {
    return number.toLocaleString()
  }

  return (
    <div className='w-full max-w-6xl mx-auto p-4 font-sans'>
      {/* Tax Tables */}
      <div className='mb-4'>
        <div className='border-2 border-black'>
          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Profit</p>
                <p className='ml-4'>Before Tax</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold'>£ {formatWithCommas(gbpProfitBeforeTax)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Final</p>
                <p className='ml-4'>Corporate Tax UK</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold text-purple-600'>£ {formatWithCommas(gbpFinalCorporateTax)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Final</p>
                <p className='ml-4'>Corporate Tax UAE</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold text-green-600'>£ {formatWithCommas(aedFinalCorporateTax)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Effective Tax UK</p>
                <p className='ml-4'>Rate (%)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold text-purple-600'>£ {formatWithCommas(gbpEffectiveTaxRate)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Effective Tax UAE</p>
                <p className='ml-4'>Rate (%)</p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold text-green-600'>£ {formatWithCommas(aedEffectiveTaxRate)}</p>
              </div>
            </div>
          </div>

          <div className='border-b border-black'>
            <div className='grid grid-cols-2'>
              <div className='p-2 border-r border-black'>
                <p className='font-bold'>Profit After Tax UK</p>
                <p className='ml-4'></p>
              </div>
              <div className='p-2 flex items-center justify-end'>
                <p className='font-bold text-purple-600'>£ {formatWithCommas(gbpProfitAfterTax)}</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 '>
            <div className='p-2 border-r border-black'>
              <p className='font-bold'>Profit After Tax UAE</p>
            </div>
            <div className='p-2 flex items-center justify-end'>
              <p className='font-bold text-green-600 hover:text-white'>£ {formatWithCommas(aedProfitAfterTax)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Summary Section */}
      <p className='text-xl text-gray-400'>
        Setting up your corporation in the UAE could save you {formatWithCommas(gbpFinalCorporateTax - payingTaxInUae)} in corporation tax compared to the UK. While you would pay{' '}
        {formatWithCommas(gbpFinalCorporateTax)} in corporation tax in the UK, the UAE has {formatWithCommas(payingTaxInUae)} corporation tax, resulting in complete tax savings of{' '}
        {formatWithCommas(gbpFinalCorporateTax - payingTaxInUae)}
      </p>
    </div>
  )
}

export default TaxComparisonTableV2
