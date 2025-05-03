import Link from "next/link";

const page = async ({ params }) => {
  const { id } = await params;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${id}`
  );
  const data = await resp.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white">
        <div className="bg-rose-600 text-white py-6 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{data.name}</h1>
          <p className="mt-2 text-lg font-light">Trusted Blood Bank Partner</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-10">
          <div className="space-y-4">
            <p className="text-gray-700 text-lg flex">
              <span className="font-semibold w-40">📞 Contact:</span>
              {data.contact}
            </p>
            <p className="text-gray-700 text-lg flex">
              <span className="font-semibold w-40">📧 Email:</span>
              {data.email}
            </p>
            <p className="text-gray-700 text-lg flex">
              <span className="font-semibold w-40">📍 Address:</span>
              {data.district}
            </p>
            <p className="text-gray-700 text-lg flex">
              <span className="font-semibold w-40">📌 Full Address:</span>
              {data.FullAddress}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 text-lg flex">
              <span className="font-semibold w-40">🩸 Reserve Blood:</span>
              {data.blood_types}
            </p>
            <p className="text-gray-700 text-lg flex">
              <span className="font-semibold w-40">⏰ Hours:</span>
              {data.hours}
            </p>
            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-rose-500">
              <p className="text-gray-700 italic">{data.additional_info}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 bg-gray-100 border-t">
          <Link href={`/bloodBanks/BloodBank/cabinRoom/${data._id}`}>
            <button className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2 w-full">
              Show More Features
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
