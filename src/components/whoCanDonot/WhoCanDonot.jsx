const WhoCanDonot = () => {
  return (
    <div>
      <div className="p-8 mx-auto bg-white">
        <h1 className="text-3xl font-bold text-center text-blue-400">
          Who Can Donate Blood?
        </h1>

        <p className="text-lg text-center text-gray-600 mt-4">
          Blood donation is a simple process, but it’s important to know if you
          meet the requirements.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Eligibility Requirements
          </h2>
          <p className="text-gray-700 mt-2">
            Most healthy individuals can donate blood. Below are the general
            eligibility guidelines:
          </p>

          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>
              You must be at least 17 years old (16 with parental consent in
              some areas).
            </li>
            <li>You must weigh at least 110 lbs (50 kg).</li>
            <li>
              You must be in general good health and feel well on the day of
              donation.
            </li>
            <li>
              You must have a hemoglobin level that meets the required standard.
            </li>
            <li>
              You must not have donated blood in the past 56 days (for whole
              blood donation).
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Who Should NOT Donate Blood?
          </h3>
          <p className="text-gray-700 mt-2">
            Some individuals may not be eligible to donate due to medical
            conditions or risk factors. These include:
          </p>

          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>
              People with certain chronic conditions (e.g., cancer, heart
              disease, etc.).
            </li>
            <li>
              Those who have traveled to high-risk areas for certain infections.
            </li>
            <li>
              Those with certain behavioral risk factors or recent drug use.
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Important Notes:
          </h3>
          <p className="text-gray-700 mt-2">
            If you are unsure whether you meet the eligibility requirements,
            it’s always best to contact your local blood donation center for
            guidance.
          </p>
        </div>
        <div className="text-center mt-12">
          <a
            href="/dashboard/donateBlood"
            className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2 "
          >
            Become a Donor
          </a>
        </div>
      </div>
    </div>
  );
};
export default WhoCanDonot;
