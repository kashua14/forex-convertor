import React, { useEffect, useState } from "react";
import { API_DOMAIN } from "../config/api";
import DropDowns from "../components/DropDowns";
import ConvertResult from "../components/ConvertResult";

export default function CurrencyConverter(props) {
  const [from, setFrom] = useState("KES");
  const [into, setInto] = useState("UGX");
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [conversionRate, setConversionRate] = useState("");
  const [conversionResult, setConversionResult] = useState("");

  useEffect(() => {
    convertCurrency(from, into);
  }, [from, into, amount]);

  async function convertCurrency(fromValue, toValue) {
    setLoading(true);
    let url = `${API_DOMAIN}${fromValue}/${toValue}`;
    await fetch(url)
      .then((res) => res.json())
      .then((response) => {
        let cRate = parseFloat(response.conversion_rate);
        let cResult = cRate * parseFloat(amount.toString().replaceAll(",", ""));

        setConversionResult(numberWithCommas(cResult.toFixed(2)));
        setConversionRate(numberWithCommas(cRate.toFixed(2)));
        setLoading(false);
      })
      .catch((error) => {
        console.log("convertCurrency err => ", error.message);
      });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function verifyNumber(value) {
    if (typeof value != "string") return false;
    return !isNaN(value) && !isNaN(parseFloat(value));
  }

  function handleInput(event) {
    let input = event.target.value;
    input = input.toString().replaceAll(",", "");

    if (verifyNumber(input)) {
      setAmount(numberWithCommas(input));
    }
  }

  function handleFrom(event) {
    setFrom(event.currentTarget.value);
  }

  function handleInto(event) {
    setInto(event.currentTarget.value);
  }

  function handleReset() {
    setFrom("KES");
    setInto("UGX");
    setConversionRate("");
    setConversionRate("");
  }

  async function handleSwitch(from, into) {
    setFrom(into);
    setInto(from);
  }

  return (
    <div className="container-fluid shadow">
      <input
        className="form-control-lg mt-5 shadow amount bg-dark"
        placeholder="Enter Amount"
        value={amount}
        type="text"
        onChange={handleInput}
      />
      <div className="filter-section">
        <div className="from-drop">
          <DropDowns
            labelName="From"
            handleChange={handleFrom}
            value={from}
          ></DropDowns>
        </div>
        <div className="text-center swap">
          <button
            className="btn shadow text-center"
            onClick={() => handleSwitch(from, into)}
          >
            <i class="fa fa-exchange" aria-hidden="true"></i>
          </button>
        </div>
        <div className="into-drop">
          <DropDowns
            labelName="Into"
            handleChange={handleInto}
            value={into}
          ></DropDowns>
        </div>
      </div>
      {conversionResult.length > 0 && (
        <div className="mt-5 mb-1 text-center">
          <ConvertResult
            from={from}
            into={into}
            amount={amount}
            Loading={loading}
            rate={conversionRate}
            result={conversionResult}
          />
        </div>
      )}

      <div className="mt-4 mb-5 text-center">
        <button className="btn btn-scolor btn-lg shadow" onClick={handleReset}>
          Reset &nbsp; <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
