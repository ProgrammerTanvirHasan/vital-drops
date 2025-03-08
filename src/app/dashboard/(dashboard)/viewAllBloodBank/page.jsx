const viewAllBloodBank = async () => {
  const resp = await fetch(
    "http://localhost:3000/bloodBanks/BloodBank/api/getall"
  );
  const data = await resp.json();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
        Blood Donation Camps
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((bank) => (
          <div
            key={bank._id}
            className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-red-500">{bank.name}</h2>
            <p className="text-gray-700 mt-2">
              <strong>📞 Contact:</strong> {bank.contact}
            </p>
            <p className="text-gray-700">
              <strong>📧 Email:</strong> {bank.email}
            </p>
            <p className="text-gray-700">
              <strong>📍 Address:</strong> {bank.address}
            </p>
            <p className="text-gray-700">
              <strong>📌 Full Address:</strong> {bank.FullAddress}
            </p>
            <p className="text-gray-700">
              <strong>🩸 Blood Types:</strong> {bank.blood_types}
            </p>
            <p className="text-gray-700">
              <strong>⏰ Hours:</strong> {bank.hours}
            </p>
            <div className="mt-4 p-3 bg-gray-100 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-700 italic">{bank.additional_info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default viewAllBloodBank;
