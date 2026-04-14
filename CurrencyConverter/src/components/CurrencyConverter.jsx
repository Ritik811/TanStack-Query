import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { currencyConverter } from "../api/postApi";

export const CurrencyConveter = () => {
  const [amount, setAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState("INR");
  const [fromCurrency, setFromCurrency] = useState("USD");

  const {
    data: convertedAmount,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currency"],
    queryFn: () => currencyConverter(fromCurrency, toCurrency, amount),
    enabled: false,
  });

  const handleCurrencyConverter = () => {
    refetch();
  };

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>

        <div className="currency-selector">
          <div>
            <label>
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
        </div>

        <button
          disabled={isLoading || amount <= 0}
          onClick={handleCurrencyConverter}
        >
          {isLoading ? "Converting..." : "Convert"}
        </button>

        <hr />
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}
              {toCurrency}
            </h2>
          </div>
        )}

        {error && <p>{error.message}</p>}
      </div>
    </section>
  );
};
