import React from "react";
import Spinner from "./Spinner";

function Result({ result, rate, amount, from, into }) {
  return (
    <div >
      <span className="result">
        <h5>
          {amount} {from} &nbsp;~=&nbsp;&nbsp;
        </h5>
        <h1>{result}</h1>&nbsp;
        <h5>{into}</h5>
      </span>
      <h5 className="rate ">Current Rate = {rate}</h5>
    </div>
  );
}

function ConvertResult({ Loading, result, rate, amount, from, into }) {
  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        result &&
        rate && (
          <Result
            result={result}
            rate={rate}
            amount={amount}
            from={from}
            into={into}
          />
        )
      )}
    </>
  );
}

export default ConvertResult;
