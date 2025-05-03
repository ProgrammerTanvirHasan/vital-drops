"use client";

import axios from "axios";
import Swal from "sweetalert2";

const BloodRequestForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      patientName: form.patientName.value,
      patientAge: form.age.value,
      bloodGroup: form.bloodGroup.value,
      urgent: form.urgent.value,
      quantity: form.quantity.value,
      hospitalName: form.hospitalName.value,
      hospitalAddress: form.hospitalAddress.value,
      contactNumber: form.contactNumber.value,
      attendantName: form.attendantName.value,
      attendentContact: form.attendentContact.value,
      additionalInfo: form.additionalInfo.value,
      currentDate: new Date().toLocaleDateString(),
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/bloodRequestForm/api`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Request Submitted",
          text: resp?.data?.message,
          icon: "success",
        });
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <section className=" min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl ">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          🩸 Blood Request Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 shadow-2xl bg-gray-100 p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Patient Name</label>
              <input
                type="text"
                name="patientName"
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                required
                className="input w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Blood Group</label>
              <select name="bloodGroup" required className="select w-full">
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Units Needed</label>
              <input
                type="number"
                name="quantity"
                required
                className="input w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-medium">Urgent?</span>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="urgent"
                value="yes"
                required
                className="radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="urgent" value="no" className="radio" />
              <span className="ml-2">No</span>
            </label>
          </div>

          <hr className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Hospital Address
              </label>
              <input
                type="text"
                name="hospitalAddress"
                required
                className="input w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Attendant Name
              </label>
              <input
                type="text"
                name="attendantName"
                required
                className="input w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Attendant Contact
            </label>
            <input
              type="tel"
              name="attendentContact"
              required
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              placeholder="e.g. Dengue, Accident, Surgery..."
              required
              className="textarea w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600  font-semibold  rounded-full shadow-md hover:shadow-lg transition"
          >
            📝 Submit Blood Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default BloodRequestForm;
