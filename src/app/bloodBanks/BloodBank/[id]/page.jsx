import Link from "next/link";

const page = async ({ params }) => {
  const { id } = await params;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${id}`
  );
  const data = await resp.json();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="bg-red-600 text-white p-4 rounded-t-2xl text-center">
        <h1 className="text-4xl font-extrabold">{data.name}</h1>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-gray-700 text-lg flex items-center">
          <span className="font-semibold w-40">📞 Contact:</span> {data.contact}
        </p>
        <p className="text-gray-700 text-lg flex items-center">
          <span className="font-semibold w-40">📧 Email:</span> {data.email}
        </p>
        <p className="text-gray-700 text-lg flex items-center">
          <span className="font-semibold w-40">📍 Address:</span>{" "}
          {data.district}
        </p>
        <p className="text-gray-700 text-lg flex items-center">
          <span className="font-semibold w-40">📌 Full Address:</span>{" "}
          {data.FullAddress}
        </p>
        <p className="text-gray-700 text-lg flex items-center">
          <span className="font-semibold w-40">🩸ReserveBlood:</span>{" "}
          {data.blood_types}
        </p>
        <p className="text-gray-700 text-lg flex items-center">
          <span className="font-semibold w-40">⏰ Hours:</span> {data.hours}
        </p>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg border-l-4 border-red-600">
          <p className="text-gray-700 text-lg italic">{data.additional_info}</p>
        </div>
      </div>
      <div>
        <Link href={`/bloodBanks/BloodBank/cabinRoom/${data._id}`}>
          <button className=" bg-red-600 rounded-b-2xl p-2 ml-2 text-white hover:bg-black">
            Show our more feature
          </button>
        </Link>
      </div>
    </div>
  );
};
export default page;
