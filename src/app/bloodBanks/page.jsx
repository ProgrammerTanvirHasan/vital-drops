import BloodBank from "./BloodBank/BloodBank";

export const metadata = {
  title: "Blood Banks",
  description:
    "Join Vital Drops to donate blood and save lives. Find nearby donation centers and help those in need today.",
};

const page = () => {
  return (
    <div>
      <div className=" flex  justify-center bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-xl text-center">
          <h1 className="text-5xl font-bold text-red-600">Blood Banks</h1>
          <p className="text-gray-700 mt-2 underline">
            Find nearby blood banks to donate or receive blood.
          </p>
        </div>
      </div>
      <BloodBank></BloodBank>
    </div>
  );
};

export default page;
