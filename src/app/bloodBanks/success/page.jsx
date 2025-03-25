"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("tran_id");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (transactionId) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      router.push("/");
    }
  }, [transactionId, router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {loading ? (
        <h1 className="text-xl font-bold text-blue-600">
          Verifying Payment...
        </h1>
      ) : (
        <>
          <h1 className="text-xl font-bold text-green-600">
            Payment Successful ✅
          </h1>
          <p className="text-gray-600">Transaction ID: {transactionId}</p>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
