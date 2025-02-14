import { FaHandHoldingHeart, FaHeart, FaTint } from "react-icons/fa";

const WhyDonotsBlood = () => {
  const reasons = [
    {
      id: 1,
      title: "Save Lives",
      description: "One donation can save up to three lives.",
      icon: <FaHeart />,
    },
    {
      id: 2,
      title: "Health Benefits",
      description:
        "Regular blood donation helps improve heart health and reduces iron overload.",
      icon: <FaTint />,
    },
    {
      id: 3,
      title: "Community Support",
      description:
        "Your donation helps maintain a stable blood supply in emergencies.",
      icon: <FaHandHoldingHeart />,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Why Donate Blood?</h1>
        <p className="mt-4 text-lg">
          Blood donation is a simple act with a huge impact. Here’s why it
          matters:
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6  text-center">
        {reasons.map((reason) => (
          <div key={reason.id} className="shadow-xl p-6 bg-slate-100 ">
            <div className="flex flex-col items-center">
              <div className="text-red-600 text-4xl mb-2">{reason.icon}</div>
              <h2 className="text-2xl font-bold">{reason.title}</h2>
              <p className="text-gray-600 mt-2">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <a
          href="/donateBlood"
          className="bg-green-900 text-white hover:bg-red-500 px-6 py-2 text-lg"
        >
          Become a Donor
        </a>
      </div>
    </div>
  );
};
export default WhyDonotsBlood;
