import { useState, useEffect } from "react";

export default function App() {
  const [firstCurrType, setFirstCurrencyType] = useState("USD");
  const [secondCurrType, setSecondCurrencyType] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const controller = new AbortController();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    async function currencyConverter() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrType}&to=${secondCurrType}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        const convertedCurr = data.rates[secondCurrType];
        setError(null);
        setOutput(convertedCurr);
        setIsLoading(false);
      } catch (err) {
        setError("Please enter valid amount");
      }
    }

    if (amount === 0 || secondCurrType === firstCurrType) {
      return;
    }
    currencyConverter();
  }, [amount, firstCurrType, secondCurrType]);
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={loading}
      />
      <select
        value={firstCurrType}
        onChange={(e) => setFirstCurrencyType(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={secondCurrType}
        onChange={(e) => setSecondCurrencyType(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{error ? error : output}</p>
    </div>
  );
}
