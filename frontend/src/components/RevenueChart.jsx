import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

const mockData = {
  Electronics: {
    daily: [120, 200, 150, 300, 250, 400, 500],
    weekly: [1000, 2000, 3000, 2500, 4000, 3500, 4200],
    monthly: [12000, 15000, 14000, 16000],
    annually: [150000, 160000, 170000, 180000],
  },
  Clothing: {
    daily: [80, 100, 90, 150, 180, 200, 220],
    weekly: [800, 1500, 1700, 1400, 1800, 2000, 2100],
    monthly: [10000, 12000, 11000, 13000],
    annually: [110000, 120000, 130000, 140000],
  },
};

export default function RevenueChart() {
  const [category, setCategory] = useState("Electronics");
  const [timeframe, setTimeframe] = useState("weekly");
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const categoriesMap = {
      daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekly: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
      monthly: ["Week 1", "Week 2", "Week 3", "Week 4"],
      annually: ["Q1", "Q2", "Q3", "Q4"],
    };

    setSeries([
      {
        name: `${category} Revenue`,
        data: mockData[category][timeframe],
      },
    ]);

    setOptions({
      chart: { id: "revenue-chart", toolbar: { show: false } },
      xaxis: {
        categories: categoriesMap[timeframe],
        labels: { style: { fontSize: "12px" } },
      },
      stroke: { curve: "smooth" },
      dataLabels: { enabled: false },
      title: {
        text: `Revenue (${category}) - ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}`,
        align: "left",
        style: { fontSize: "18px", fontWeight: "bold" },
      },
      colors: ["#4F46E5"],
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 280 },
            title: { style: { fontSize: "16px" } },
          },
        },
      ],
    });
  }, [category, timeframe]);

  const totalRevenue = mockData[category][timeframe].reduce((a, b) => a + b, 0);
  const totalOrders = mockData[category][timeframe].length * 10;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-40 p-2 border rounded-md text-sm"
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Select Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full sm:w-40 p-2 border rounded-md text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="text-center sm:text-right">
          <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-700">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Orders: {totalOrders}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <ReactApexChart type="line" height={350} options={options} series={series} />
      </div>
    </div>
  );
}
