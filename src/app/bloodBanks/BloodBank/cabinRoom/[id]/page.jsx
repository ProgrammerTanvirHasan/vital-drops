import Link from "next/link";

const page = async ({ params }) => {
  const { id } = await params;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${id}`
  );
  const data = await resp.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 mt-4 to-white text-gray-800">
      <div className="container mx-auto shadow-xl rounded-b-2xl overflow-hidden bg-white">
        {data.ourCabin ? (
          <img
            src={data.ourCabin}
            alt="Cabin Room"
            className="w-full h-[75vh] object-cover"
          />
        ) : (
          <div className="w-full h-72 flex items-center justify-center bg-gray-300">
            <p className="text-gray-600">No Image Available</p>
          </div>
        )}

        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-rose-700 mb-3">
            Cabin Details
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Experience comfort in our well-maintained private cabin.
          </p>

          <div className="text-xl font-semibold text-green-600 mb-4">
            Cabin Rent: ${data.cabinRent}
          </div>

          <div className="flex justify-end">
            <Link href={`/bloodBanks/BloodBank/checkOut/${data._id}`}>
              <button className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-4">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
