import { TrendingUp, CreditCard, Building } from 'lucide-react';

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
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <Building className="mr-2 text-blue-400" size={24} />
                        <h3 className="text-xl font-bold">UK Corporation</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Before Tax:</span>
                            <span className="font-bold">£{formatWithCommas(gbpProfitBeforeTax)}</span>
                        </div>
                        <div className="flex justify-between text-red-400">
                            <span>Corporate Tax:</span>
                            <span className="font-bold">£{formatWithCommas(gbpFinalCorporateTax)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-700">
                            <span>After Tax:</span>
                            <span className="font-bold text-xl">£{formatWithCommas(gbpProfitAfterTax)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400 text-sm">
                            <span>Effective Tax Rate:</span>
                            <span>{formatWithCommas(gbpEffectiveTaxRate)}%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <Building className="mr-2 text-green-400" size={24} />
                        <h3 className="text-xl font-bold">UAE Corporation</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Before Tax:</span>
                            <span className="font-bold">£{formatWithCommas(aedProfitBeforeTax)}</span>
                        </div>
                        <div className="flex justify-between text-green-400">
                            <span>Corporate Tax:</span>
                            <span className="font-bold">£{formatWithCommas(aedFinalCorporateTax)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-700">
                            <span>After Tax:</span>
                            <span className="font-bold text-xl">£{formatWithCommas(aedProfitAfterTax)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400 text-sm">
                            <span>Effective Tax Rate:</span>
                            <span>{formatWithCommas(aedEffectiveTaxRate)}%</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-green-900 p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center mb-3 sm:mb-0">
                        <TrendingUp className="mr-2 text-green-400" size={28} />
                        <div>
                            <h3 className="text-lg font-bold text-green-400">Tax Savings in UAE</h3>
                            <p className="text-sm">Setting up in UAE could save you:</p>
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-green-400 ml-8 sm:ml-0">£{formatWithCommas(gbpFinalCorporateTax - payingTaxInUae)}</div>
                </div>
            </div>
        </div>
    )
}

export default TaxComparisonTableV2
