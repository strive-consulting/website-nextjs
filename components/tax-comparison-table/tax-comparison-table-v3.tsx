import { TrendingUp, Building } from 'lucide-react'

// Constants for tax calculations
const GBP_TO_AED_CONVERSION_RATE = 4.75
const UK_TAX_RATE_LOWER = 0.19
const UK_TAX_RATE_HIGHER = 0.25
const UK_TAX_THRESHOLD_LOWER = 50000
const UK_TAX_THRESHOLD_UPPER = 250000
const UK_MARGINAL_RELIEF_FACTOR = 3 / 200
const UAE_TAX_RATE = 0.09
const UAE_TAX_THRESHOLD = 375000
const UAE_SMALL_BUSINESS_THRESHOLD = 3000000

interface TaxComparisonProps {
  yearlyTurnOver: number
  yearlyExpenses: number
}

const formatCurrency = (value: number): string => {
  return Math.round(value).toLocaleString()
}

const formatPercentage = (value: number): number => {
  return Math.round(value)
}

const TaxComparisonTableV3 = ({ yearlyTurnOver, yearlyExpenses }: TaxComparisonProps) => {
  const turnover = yearlyTurnOver || 0
  const expenses = yearlyExpenses || 0

  // UK tax calculations
  const gbpProfitBeforeTax = turnover - expenses

  const gbpCorporateTaxLowerRate = gbpProfitBeforeTax <= UK_TAX_THRESHOLD_LOWER ? gbpProfitBeforeTax * UK_TAX_RATE_LOWER : 0

  const gbpCorporateTaxHigherRate = gbpProfitBeforeTax > UK_TAX_THRESHOLD_LOWER ? gbpProfitBeforeTax * UK_TAX_RATE_HIGHER : 0

  const gbpMarginalRelief = gbpProfitBeforeTax > UK_TAX_THRESHOLD_LOWER && gbpProfitBeforeTax <= UK_TAX_THRESHOLD_UPPER ? (UK_TAX_THRESHOLD_UPPER - gbpProfitBeforeTax) * UK_MARGINAL_RELIEF_FACTOR : 0

  const gbpFinalCorporateTax = gbpCorporateTaxLowerRate + gbpCorporateTaxHigherRate - gbpMarginalRelief
  const gbpEffectiveTaxRate = gbpProfitBeforeTax > 0 ? (gbpFinalCorporateTax / gbpProfitBeforeTax) * 100 : 0
  const gbpProfitAfterTax = gbpProfitBeforeTax - gbpFinalCorporateTax
  const gbpActualTaxRate = gbpProfitBeforeTax <= UK_TAX_THRESHOLD_LOWER ? '19' : '25'

  // UAE tax calculations
  const aedProfitBeforeTax = turnover - expenses
  const aedTurnoverInAED = turnover * GBP_TO_AED_CONVERSION_RATE
  const aedProfitBeforeTaxInAED = aedProfitBeforeTax * GBP_TO_AED_CONVERSION_RATE

  const aedCorporateTax = aedTurnoverInAED >= UAE_SMALL_BUSINESS_THRESHOLD && aedProfitBeforeTaxInAED > UAE_TAX_THRESHOLD ? (aedProfitBeforeTaxInAED - UAE_TAX_THRESHOLD) * UAE_TAX_RATE : 0

  const aedEffectiveTaxRate = aedProfitBeforeTax > 0 ? (aedCorporateTax / aedProfitBeforeTaxInAED) * 100 : 0

  const aedProfitAfterTax = aedProfitBeforeTax - aedCorporateTax / GBP_TO_AED_CONVERSION_RATE
  const aedActualTaxRate = aedEffectiveTaxRate <= 0 ? '0' : '9'

  // Additional calculated values
  const isSmallBusinessRelief = aedTurnoverInAED < UAE_SMALL_BUSINESS_THRESHOLD
  const taxSavings = gbpFinalCorporateTax - aedCorporateTax / GBP_TO_AED_CONVERSION_RATE

  return (
    <div className='p-6 bg-gray-900 text-white'>
      <div className='bg-green-900 p-4 rounded-lg mb-5'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center mb-3 sm:mb-0'>
            <TrendingUp className='mr-2 text-green-400' size={28} />
            <div>
              <h3 className='text-xl font-bold text-green-400'>Tax Savings in UAE</h3>
              <p className='text-md'>Setting up in the UAE could {isSmallBusinessRelief ? 'qualify you for small business relief and' : ''} save you up to</p>
            </div>
          </div>
          <div className='text-3xl sm:text-4xl font-bold text-green-400 ml-8 sm:ml-0'>£{formatCurrency(taxSavings)}</div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='bg-gray-800 p-4 rounded-lg'>
          <div className='flex items-center mb-3'>
            <Building className='mr-2 text-blue-400' size={24} />
            <h3 className='text-xl font-bold'>UK Corporation</h3>
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Gross profit</span>
              <span className='font-bold'>£{formatCurrency(gbpProfitBeforeTax)}</span>
            </div>
            <div className='flex justify-between text-red-400'>
              <span>Corporate Tax</span>
              <span className='font-bold'>£{formatCurrency(gbpFinalCorporateTax)}</span>
            </div>
            <div className='flex justify-between text-red-400'>
              <span>Effective Tax Rate</span>
              <span>{formatPercentage(gbpEffectiveTaxRate)}%</span>
            </div>
            <div className='flex justify-between text-red-400'>
              <span>Actual Tax Rate</span>
              <span>{gbpActualTaxRate}%</span>
            </div>
            <div className='flex justify-between pt-2 border-t border-gray-700'>
              <span>NET profit</span>
              <span className='font-bold text-xl'>£{formatCurrency(gbpProfitAfterTax)}</span>
            </div>
          </div>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg'>
          <div className='flex items-center mb-3'>
            <Building className='mr-2 text-green-400' size={24} />
            <h3 className='text-xl font-bold'>UAE Corporation</h3>
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Gross profit</span>
              <span className='font-bold'>£{formatCurrency(aedProfitBeforeTax)}</span>
            </div>
            <div className='flex justify-between text-green-400'>
              <span>Corporate Tax</span>
              <span className='font-bold'>£{formatCurrency(aedCorporateTax / GBP_TO_AED_CONVERSION_RATE)}</span>
            </div>
            <div className='flex justify-between text-green-400'>
              <span>Effective Tax Rate</span>
              <span>{formatPercentage(aedEffectiveTaxRate)}%</span>
            </div>
            <div className='flex justify-between text-green-400'>
              <span>Actual Tax Rate</span>
              <span>{aedActualTaxRate}%</span>
            </div>
            <div className='flex justify-between pt-2 border-t border-gray-700'>
              <span>NET profit</span>
              <span className='font-bold text-xl'>£{formatCurrency(aedProfitAfterTax)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxComparisonTableV3
