import FindDonor from "./FindDonor";

export const metadata = {
  title: "Find A Donor",
  description:
    "Join Vital Drops to donate blood and save lives. Find nearby donation centers and help those in need today.",
};

const Page = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-rose-800 mb-3 text-center pt-4">
        Find Your Blood Donor
      </h1>
      <FindDonor></FindDonor>
    </div>
  );
};

export default Page;
