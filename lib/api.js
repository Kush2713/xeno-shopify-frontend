const BASE_URL = "http://localhost:5000/shopify";

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
  let url = "/api/revenue-trend";
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const res = await fetch(url);
  return res.json();
}
