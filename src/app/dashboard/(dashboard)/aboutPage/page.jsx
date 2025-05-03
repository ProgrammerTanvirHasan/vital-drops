const BloodDonateProcess = () => {
  const steps = [
    {
      title: "1. Registration",
      description:
        "Fill in your personal and health information at the blood donation center.",
    },
    {
      title: "2. Health Check",
      description:
        "Your blood pressure, hemoglobin, and pulse are checked to ensure you're fit to donate.",
    },
    {
      title: "3. Donation",
      description:
        "Relax in a comfortable chair as blood is drawn. The process takes around 10–15 minutes.",
    },
    {
      title: "4. Refreshment",
      description:
        "After donating, enjoy light snacks and drinks to help replenish your energy.",
    },
    {
      title: "5. Recovery & Reuse",
      description:
        "Your body replaces the donated blood within weeks. You’re eligible to donate again soon!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-rose-700 mb-2">
            Blood Donation Process
          </h1>
          <p className="text-gray-600 text-lg">
            Here’s how a simple act can help save lives – step by step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-rose-700 font-bold text-xl mb-2">
                {step.title}
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodDonateProcess;
