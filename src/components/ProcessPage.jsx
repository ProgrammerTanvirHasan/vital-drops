"use client";

import { useState } from "react";

const steps = [
  {
    title: "Step 1: Registration",
    description: "Donor form fill-up with basic details and blood group info.",
  },
  {
    title: "Step 2: Health Checkup",
    description:
      "Blood pressure, pulse, and weight are checked by medical staff.",
  },
  {
    title: "Step 3: Donation",
    description:
      "Using sterile equipment, around 350-450ml blood is taken. It takes ~10 minutes.",
  },
  {
    title: "Step 4: Refreshment",
    description: "Donor rests for 10-15 minutes and receives refreshments.",
  },
  {
    title: "Step 5: Blood Collection & Storage",
    description:
      "Collected blood is labeled, tested, and sent to verified hospitals or patients.",
  },
];

const ProcessPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-red-100 hover:bg-red-200 transition-all px-6 py-4 rounded-lg shadow cursor-pointer flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-red-700">
          How Blood Donation Works
        </h1>
        <span className="text-2xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="mt-6 space-y-5 transition-all duration-300">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-red-600">
                {step.title}
              </h3>
              <p className="text-gray-700 mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProcessPage;
