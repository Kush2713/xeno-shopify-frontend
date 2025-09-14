// lib/api.js

// Use environment variable for backend API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/shopify";

export const fetchInsights = async () => {
  const res = await fetch(`${BASE_URL}/insights`);
  return res.json();
};

export const fetchTopCustomers = async () => {
  const res = await fetch(`${BASE_URL}/top-customers`);
  return res.json();
};

export const fetchTopProducts = async () => {
  const res = await fetch(`${BASE_URL}/top-products`);
  return res.json();
};

export async function fetchRevenueTrend(startDate, endDate) {
  let url = `${BASE_URL}/revenue-trend`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }

  const res = await fetch(url);
  const json = await res.json();

  // ✅ Aggregate revenue by date (so chart displays correctly)
  const aggregated = json.reduce((acc, item) => {
    const existing = acc.find((d) => d.date === item.date);
    if (existing) {
      existing.revenue += item.revenue;
    } else {
      acc.push({ date: item.date, revenue: item.revenue });
    }
    return acc;
  }, []);

  return aggregated;
}
