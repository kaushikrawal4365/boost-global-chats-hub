
import React, { createContext, useState, useContext, useEffect } from "react";

// Define the available currencies
export type Currency = "USD" | "EUR" | "GBP";

// Define the exchange rates (relative to USD)
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
};

// Define the currency symbols
const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

// Context type
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceUSD: number) => string;
  currencySymbol: string;
}

// Create the context
const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  convertPrice: () => "",
  currencySymbol: "$",
});

// Context provider component
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency>(
    () => (localStorage.getItem("currency") as Currency) || "USD"
  );

  // Update localStorage when currency changes
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // Convert price from USD to selected currency
  const convertPrice = (priceUSD: number): string => {
    const rate = exchangeRates[currency];
    const convertedPrice = priceUSD * rate;
    return convertedPrice.toFixed(convertedPrice === Math.round(convertedPrice) ? 0 : 2);
  };

  // Get currency symbol
  const currencySymbol = currencySymbols[currency];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        currencySymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook for using the currency context
export const useCurrency = () => {
  return useContext(CurrencyContext);
};
