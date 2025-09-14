import React, { useEffect, useState } from "react";
import TopCustomersChart from "./TopCustomersChart";
import RevenueTrendChart from "./RevenueTrendChart";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import {
  fetchInsights,
  fetchTopCustomers,
  fetchTopProducts,
  fetchRevenueTrend, // <-- make sure this exists in lib/api.js
} from "../lib/api";

export default function Dashboard() {
  const [insights, setInsights] = useState(null);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const [insightsData, customersData, productsData] = await Promise.all([
        fetchInsights(),
        fetchTopCustomers(),
        fetchTopProducts(),
      ]);
      setInsights(insightsData);
      setTopCustomers(customersData);
      setTopProducts(productsData);

      // Load revenue trend initially without filter
      const revenueTrend = await fetchRevenueTrend();
      setRevenueData(revenueTrend);
    };
    loadData();
  }, []);

  // Handle date filter submit
  const handleFilter = async () => {
    const revenueTrend = await fetchRevenueTrend(startDate, endDate);
    setRevenueData(revenueTrend);
  };

  if (!insights) {
    return <div className="p-4 text-center">Loading Dashboard...</div>;
  }

  const barChartData = {
    labels: topProducts.map((product) => product.title),
    datasets: [
      {
        label: "Revenue (₹)",
        data: topProducts.map((product) => product.revenue),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Top Products by Revenue" },
    },
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">
        Shopify Insights Dashboard
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500">Products</h2>
          <p className="text-2xl font-bold">{insights.totalProducts}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500">Customers</h2>
          <p className="text-2xl font-bold">{insights.totalCustomers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">{insights.totalOrders}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500">Quantity Sold</h2>
          <p className="text-2xl font-bold">{insights.totalQuantitySold}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">
            ₹{insights.totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Revenue Trend with Date Filter */}
      <div className="bg-white p-4 shadow rounded space-y-4">
        <h2 className="text-xl font-semibold">Revenue Trend</h2>

        {/* Date Range Picker */}
        <div className="flex gap-4 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>

        <RevenueTrendChart data={revenueData} />
      </div>

      {/* Top Customers */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
        <div className="w-150 h-150 mx-auto">
          <TopCustomersChart customers={topCustomers} />
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-4 shadow rounded space-y-6">
        <h2 className="text-xl font-semibold">Top Products</h2>

        {/* Bar Chart */}
        <div className="w-full">
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        {/* Product List */}
        <ul className="divide-y pt-4">
          {topProducts.map((product, index) => (
            <li key={index} className="py-2 flex justify-between items-center">
              <span className="flex items-center gap-2">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                )}
                {product.title}
              </span>
              <span className="font-medium">
                ₹{product.revenue.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
