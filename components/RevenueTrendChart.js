import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RevenueTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/revenue-trend`)
      .then((res) => res.json())
      .then((apiData) => {
        // Aggregate revenue by date
        const revenueMap = {};

        apiData.forEach((item) => {
          if (!revenueMap[item.date]) {
            revenueMap[item.date] = 0;
          }
          revenueMap[item.date] += item.revenue;
        });

        // Convert back to array for chart
        const formatted = Object.keys(revenueMap).map((date) => ({
          date,
          revenue: revenueMap[date],
        }));

        setData(formatted);
      })
      .catch((err) => console.error("Error fetching revenue trend:", err));
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
