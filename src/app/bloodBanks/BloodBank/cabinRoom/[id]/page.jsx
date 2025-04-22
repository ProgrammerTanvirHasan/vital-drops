import Link from "next/link";

const page = async ({ params }) => {
  const { id } = await params;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${id}`
  );
  const data = await resp.json();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-6">Cabin Details</h1>

      <div className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden w-full max-w-lg  ">
        {data.ourCabin ? (
          <img
            src={data.ourCabin}
            alt="Cabin Room"
            className="w-full  object-cover "
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-700">
            <p className="text-gray-400">No Image Available</p>
          </div>
        )}

        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2 ">Cabin Price</h2>
          <p className="text-xl font-bold text-green-400">${data.cabinRent}</p>
        </div>
        <div className="p-6 flex justify-center">
          <Link href={`/bloodBanks/BloodBank/checkOut/${data._id}`}>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition duration-300 shadow-md">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default page;
