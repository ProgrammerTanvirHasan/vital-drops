import FindDonor from "./FindDonor";

export const metadata = {
  title: "Find A Donor",
  description:
    "Join Vital Drops to donate blood and save lives. Find nearby donation centers and help those in need today.",
};

const Page = () => {
  return (
    <div>
      <h1 className="text-4xl text-center text-red-500">
        Find a donor in your area
      </h1>
      <FindDonor></FindDonor>
    </div>
  );
};

export default Page;
