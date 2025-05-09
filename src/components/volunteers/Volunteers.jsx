"use client";
import Image from "next/image";

const Volunteers = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 text-center mb-10">
        Our Helping Volunteers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {volunteers.map((volunteer) => (
          <div
            key={volunteer.volunteer_id}
            className="bg-white shadow-xl rounded-lg overflow-hidden transition hover:shadow-2xl"
          >
            <div className="w-full h-64 relative">
              <Image
                src={volunteer.img}
                alt={volunteer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-2">
              <h2 className="text-xl font-semibold text-cyan-900">
                {volunteer.name}
              </h2>
              <p className="text-gray-700 font-medium">
                Role: {volunteer.role}
              </p>
              <p className="text-gray-600 text-sm">
                Joined: {volunteer.join_date}
              </p>
              <p className="text-gray-600 text-sm">
                Monthly Commitment: {volunteer.hours_committed_per_month} hours
              </p>
              <p className="text-gray-600 text-sm">
                Blood Drives Supported: {volunteer.blood_drives_supported}
              </p>
              <p className="text-gray-600 text-sm">
                Blood Units Collected: {volunteer.blood_units_collected}
              </p>
              <p className="italic text-gray-500 mt-2">
                "{volunteer.testimony}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const volunteers = [
  {
    volunteer_id: 1,
    name: "Shopon Ahmad",
    img: "https://i.ibb.co/WQrjqZ2/patient-getting-chemotherapy-treatment-23-2149261071.jpg",
    role: "Community Engagement Leader",
    join_date: "2023-01-15",
    hours_committed_per_month: 12,
    blood_drives_supported: 10,
    blood_units_collected: 1200,
    testimony:
      "আমি স্বেচ্ছাসেবক হিসেবে কাজ করি কারণ আমি চাই মানুষের জীবনে একটা বড় প্রভাব ফেলতে। দান করার মাধ্যমে জীবন বাঁচানো সত্যিই সন্তোষজনক।",
  },
  {
    volunteer_id: 2,
    name: "Anar_kali",
    img: "https://i.ibb.co/mCtKXk24/medium-shot-volunteers-with-equipment-23-2149181979.jpg",
    role: "Event Coordinator",
    join_date: "2022-06-10",
    hours_committed_per_month: 8,
    blood_drives_supported: 15,
    blood_units_collected: 1800,
    testimony:
      "প্রতিটি ব্লাড ড্রাইভ এমন এক সুযোগ যেখানে আমি আমার সম্প্রদায়ের জন্য কাজ করতে পারি এবং মানুষকে সাহায্য করতে পারি।",
  },
  {
    volunteer_id: 3,
    name: "Shimul Dham",
    img: "https://i.ibb.co/Jwdc0xZK/medium-shot-smiley-man-prp-vial-23-2149341443.jpg",
    role: "Social Media Ambassador",
    join_date: "2024-03-22",
    hours_committed_per_month: 5,
    blood_drives_supported: 5,
    blood_units_collected: 600,
    testimony:
      "অনলাইনে সচেতনতা বৃদ্ধির মাধ্যমে আমি অনেক মানুষের কাছে পৌঁছাতে পারি যাঁরা হয়তো দান করার কথা ভাবেননি।",
  },
  {
    volunteer_id: 4,
    name: "Saima Jahan",
    img: "https://i.ibb.co/PZk82R8K/beautiful-doctor-looking-blood-sample-23-2148396727.jpg",
    role: "Logistics and Setup Coordinator",
    join_date: "2023-11-01",
    hours_committed_per_month: 10,
    blood_drives_supported: 8,
    blood_units_collected: 1000,
    testimony:
      "ইভেন্ট আয়োজন করতে আমি অনেক ভালোবাসি, এবং আমার কাজের মাধ্যমে জানি যে আমি মানুষের জন্য কিছু সাহায্য করছি।",
  },
  {
    volunteer_id: 5,
    name: "Shahriar Khan",
    img: "https://i.ibb.co.com/rKBthvSq/concept-blood-donation-young-man-invites-donate-blood-338367-560.jpg",
    role: "First Aid Trainer",
    join_date: "2022-08-18",
    hours_committed_per_month: 15,
    blood_drives_supported: 20,
    blood_units_collected: 2500,
    testimony:
      "নতুন স্বেচ্ছাসেবকদের প্রশিক্ষণ দেওয়া আমার কাছে অনেক গুরুত্বপূর্ণ, কারণ তা তাদের ব্লাড ড্রাইভে গুরুত্বপূর্ণ ভূমিকা পালন করতে সহায়তা করে।",
  },
];

export default Volunteers;
