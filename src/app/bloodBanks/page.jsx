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
          <h1 className="text-4xl font-bold text-rose-800 mb-3">
            Find Your Nearest Blood Bank
          </h1>
        </div>
      </div>
      <BloodBank></BloodBank>
    </div>
  );
};

export default page;
