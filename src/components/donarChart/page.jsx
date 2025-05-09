"use client";

import ReChart from "./ReChart";

const Page = () => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4 text-center">
        Available blood group to this time
      </h2>
      <ReChart></ReChart>
    </div>
  );
};

export default Page;
