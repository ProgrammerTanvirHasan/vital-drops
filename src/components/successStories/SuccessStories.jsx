"use client";
import Marquee from "react-fast-marquee";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "HasanMd",
    story:
      "Donating blood was the best decision I made. Knowing that my contribution saved lives gives me immense satisfaction.",
    location: "Jhawgora, Jamalpur",
  },
  {
    id: 2,
    name: "Rahad FT",
    story:
      "After receiving a blood transfusion during surgery, I realized how important it is to donate. Now, I donate regularly!",
    location: "NoyaPada, 5 Rasta, Mymensingh",
  },
  {
    id: 3,
    name: "Shopon UC",
    story:
      "My father needed blood during an emergency. Thanks to donors, he survived. Now, I am giving back as a donor myself!",
    location: "Vabki, Bogura",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    story:
      "I started donating blood in university. It’s amazing to know I’m part of something so impactful.",
    location: "Kazipara, Dhaka",
  },
  {
    id: 5,
    name: "Tanvir Alam",
    story:
      "During Eid holidays, I helped arrange emergency donors. The gratitude from families made me a lifetime donor.",
    location: "Shibganj, Chapainawabganj",
  },
  {
    id: 6,
    name: "Farzana Mim",
    story:
      "My brother survived a terrible accident thanks to blood donors. Since then, blood donation is a part of my life.",
    location: "Mirpur-1, Dhaka",
  },
];

const SuccessStories = () => {
  return (
    <div className="bg-gray-50 py-10 overflow-hidden">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-red-600">
          Testimonials & Success Stories
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Real stories from real heroes. See how blood donation changes lives.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex ">
          <Marquee speed={30} gradient={false} pauseOnHover>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className=" w-80 min-w-[20rem] flex-shrink-0 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <FaQuoteLeft className="text-red-600 text-3xl mb-2" />
                  <p className="text-gray-600 italic">"{testimonial.story}"</p>
                  <h3 className="text-xl font-bold mt-4 text-black">
                    - {testimonial.name}
                  </h3>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
