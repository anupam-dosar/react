import { useState, useEffect } from "react";

const APIBASE = "https://api.frankfurter.app/latest?";

export default function CurrencyConvertor() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [loading, setLoading] = useState(false);
  let [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const performConversion = async () => {
      if (amount === "" || isNaN(amount)) {
        setResult(null);
        return;
      }
      if (from === to) {
        setResult(null);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${APIBASE}amount=${amount}&from=${from}&to=${to}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        console.log(data, data.message);
        if (data.message !== undefined) throw new Error("Invalid amount!");
        setResult(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    performConversion();

    return () => controller.abort();
  }, [amount, from, to]);

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
      </select>
      <p>
        {loading
          ? "working..."
          : result && (
              <>
                <strong>{result?.amount} </strong>
                {result.base} = <strong>{result?.rates[to]} </strong>
                {to} on {result.date}
              </>
            )}
      </p>
    </div>
  );
}
