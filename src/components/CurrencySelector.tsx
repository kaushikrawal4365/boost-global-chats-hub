
import React from "react";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign } from "lucide-react";

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies: { code: Currency; name: string; symbol: string }[] = [
    { code: "USD", name: "USD", symbol: "$" },
    { code: "EUR", name: "EUR", symbol: "€" },
    { code: "GBP", name: "GBP", symbol: "£" },
  ];

  const currentCurrency = currencies.find((c) => c.code === currency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <DollarSign className="h-4 w-4 mr-2" />
          {currentCurrency?.symbol} {currentCurrency?.code}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white z-50">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className={`cursor-pointer ${
              currency === curr.code ? "font-medium bg-muted" : ""
            }`}
          >
            <span className="mr-2">{curr.symbol}</span>
            {curr.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
