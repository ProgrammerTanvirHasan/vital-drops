import DonateForm from "@/app/donateBlood/donateForm/DonateForm";

export const metadata = {
  title: {
    absolute: "Donate blood",
  },
  description:
    "Join Vital Drops to donate blood and save lives. Find nearby donation centers and help those in need today.",
};
const page = () => {
  return (
    <div>
      <h1 className="text-3xl text-red-600 text-center underline">
        Register As A Donor
      </h1>
      <p className="text-lg text-center text-gray-600 mt-4">
        Join Vital Drops today to donate blood and save lives. Your donation can
        make a significant impact on the lives of those in need. Let's make a
        difference together!
      </p>
      <DonateForm></DonateForm>
    </div>
  );
};
export default page;
