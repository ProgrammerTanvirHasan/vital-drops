"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentCancel = () => {
  const searchParams = useSearchParams();
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tranId = searchParams.get("tran_id");
    if (tranId) {
      setTransactionId(tranId);
    } else {
      console.error("Transaction ID missing from URL!");
    }
    setTimeout(() => setLoading(false), 1000);
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {loading ? (
        <h1 className="text-xl font-bold text-blue-600">
          Processing Payment Cancellation...
        </h1>
      ) : (
        <>
          <h1 className="text-xl font-bold text-red-600">
            Payment Cancelled ❌
          </h1>
          {transactionId ? (
            <p className="text-gray-600">Transaction ID: {transactionId}</p>
          ) : (
            <p className="text-gray-600">No Transaction ID found!</p>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentCancel;
