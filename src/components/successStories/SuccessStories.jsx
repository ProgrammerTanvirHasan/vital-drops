import { FaQuoteLeft } from "react-icons/fa";

const SuccessStories = () => {
    const testimonials = [
        {
          id: 1,
          name: "HasanMd",
          story: "Donating blood was the best decision I made. Knowing that my contribution saved lives gives me immense satisfaction.",
          location: "Jhawgora,Jamalpur",
        },
        {
          id: 2,
          name: "Rahad FT",
          story: "After receiving a blood transfusion during surgery, I realized how important it is to donate. Now, I donate regularly!",
          location: "NoyaPada,5 rasta,Mymshing",
        },
        {
          id: 3,
          name: "Shopon UC",
          story: "My father needed blood during an emergency. Thanks to donors, he survived. Now, I am giving back as a donor myself!",
          location: "Vabki,Bogura",
        },
      ];
  return (
    <div className="container mx-auto">
       <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Testimonials & Success Stories</h1>
        <p className="mt-4 text-lg">Real stories from real heroes. See how blood donation changes lives.</p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <section key={testimonial.id} className="shadow-xl p-6 bg-white">
            <section className="flex flex-col items-center text-center">
              <FaQuoteLeft className="text-red-600 text-3xl mb-2" />
              <p className="text-gray-600 italic">"{testimonial.story}"</p>
              <h3 className="text-xl font-bold mt-4">- {testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.location}</p>
            </section>
          </section>
        ))}
      </div>
    </div>
  );
};
export default SuccessStories;
