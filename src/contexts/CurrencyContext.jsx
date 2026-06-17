import { createContext, useContext, useState, useCallback } from 'react'

// Map currency label → { symbol, locale, code }
export const CURRENCY_META = {
  'USD - US Dollar':        { symbol: '$',  locale: 'en-US', code: 'USD' },
  'EUR - Euro':             { symbol: '€',  locale: 'de-DE', code: 'EUR' },
  'GBP - British Pound':    { symbol: '£',  locale: 'en-GB', code: 'GBP' },
  'JPY - Japanese Yen':     { symbol: '¥',  locale: 'ja-JP', code: 'JPY' },
  'CAD - Canadian Dollar':  { symbol: 'CA$',locale: 'en-CA', code: 'CAD' },
  'AUD - Australian Dollar':{ symbol: 'A$', locale: 'en-AU', code: 'AUD' },
  'INR - Indian Rupee':     { symbol: '₹',  locale: 'en-IN', code: 'INR' },
}

const DEFAULT_CURRENCY = 'USD - US Dollar'

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem('xpense_currency') || DEFAULT_CURRENCY
  })

  const setCurrency = useCallback((label) => {
    setCurrencyState(label)
    localStorage.setItem('xpense_currency', label)
  }, [])

  /** Format a number as currency string, e.g. ₹1,23,456.00 */
  const formatCurrency = useCallback((amount) => {
    const meta = CURRENCY_META[currency] || CURRENCY_META[DEFAULT_CURRENCY]
    const abs  = Math.abs(Number(amount))

    // JPY has no decimal places by convention
    const fractionDigits = meta.code === 'JPY' ? 0 : 2

    const formatted = abs.toLocaleString(meta.locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })
    return `${meta.symbol}${formatted}`
  }, [currency])

  /** Just the symbol for inline use */
  const currencySymbol = (CURRENCY_META[currency] || CURRENCY_META[DEFAULT_CURRENCY]).symbol

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within <CurrencyProvider>')
  return ctx
}

export default CurrencyContext
