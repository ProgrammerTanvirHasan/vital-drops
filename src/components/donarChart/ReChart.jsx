"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const ReChart = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonor = async () => {
      setLoading(true);
      setError("");
      try {
        const resp = await fetch("/api/donarChart");
        if (!resp.ok) throw new Error("Failed to fetch donor data");

        const data = await resp.json();
        setDonors(data);
      } catch (err) {
        setError(err.message);
        setDonors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, []);

  const bloodGroupCounts = donors.reduce((acc, donor) => {
    const group = donor.blood;
    if (group) {
      acc[group] = (acc[group] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(bloodGroupCounts).map(([group, count]) => ({
    bloodGroup: group,
    count,
  }));

  return (
    <div className="p-6 bg-white shadow-md rounded-xl  mx-auto mt-8">
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="bloodGroup"
              label={{ value: "Blood Group", position: "insideBottom", dy: 10 }}
            />
            <YAxis
              label={{
                value: "Total Donors",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#ef4444" radius={[5, 5, 0, 0]}>
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {!loading && !error && chartData.length === 0 && (
        <p className="text-center text-gray-500">No donor data available.</p>
      )}
    </div>
  );
};

export default ReChart;
