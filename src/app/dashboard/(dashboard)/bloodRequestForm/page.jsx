"use client";

import axios from "axios";
import Swal from "sweetalert2";

const bloodRequestForm = () => {
  const handleMenageBlood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const patientName = form.patientName.value;
    const patientAge = form.age.value;
    const bloodGroup = form.bloodGroup.value;
    const urgent = form.urgent.value;
    const quantity = form.quantity.value;
    const hospitalName = form.hospitalName.value;
    const hospitalAddress = form.hospitalAddress.value;
    const contactNumber = form.contactNumber.value;
    const attendantName = form.attendantName.value;
    const attendentContact = form.attendentContact.value;
    const additionalInfo = form.additionalInfo.value;
    const currentDate = new Date().toLocaleDateString();

    const patientDetails = {
      patientName,
      patientAge,
      bloodGroup,
      urgent,
      quantity,
      hospitalName,
      hospitalAddress,
      contactNumber,
      attendantName,
      attendentContact,
      additionalInfo,
      currentDate,
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/bloodRequestForm/api`,
        patientDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status == 200) {
        Swal.fire({
          title: "added request",
          text: resp?.data?.message,
          icon: "success",
          draggable: true,
        });
        form.reset("");
      }
    } catch (error) {
      Swal.fire({
        title: "Error signing up",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };
  return (
    <div className="py-8">
      <div className="p-4 max-w-lg mx-auto bg-slate-400  shadow-md rounded-lg ">
        <h2 className="text-xl font-bold mb-4">Blood Request Form</h2>
        <form onSubmit={handleMenageBlood} className="space-y-4">
          <input
            name="patientName"
            type="text"
            placeholder="Patient Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="bloodGroup"
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <div className="flex items-center space-x-4">
            <label>Urgent?</label>
            <input type="radio" name="urgent" value="yes" /> Yes
            <input type="radio" name="urgent" value="no" /> No
          </div>
          <input
            name="quantity"
            type="number"
            placeholder="Number of Units Needed"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="hospitalName"
            type="text"
            placeholder="Hospital Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="hospitalAddress"
            type="text"
            placeholder="Hospital Address"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="contactNumber"
            type="tel"
            placeholder="Contact Number"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="attendantName"
            type="text"
            placeholder="Attendant Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="attendentContact"
            type="tel"
            placeholder="Attendant Contact Number"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="additionalInfo"
            placeholder="Patient Condition (e.g., Thalassemia, Dengue, etc.)"
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};
export default bloodRequestForm;
