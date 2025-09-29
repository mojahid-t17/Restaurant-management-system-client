


import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#A020F0", "#FF7F50"];

const AdminHome = () => {
  const axiosSecure = UseAxiosSecure();
  const [stats, setStats] = useState({});
  const [menuStats, setMenuStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch admin stats (revenue, users, products, orders)
        const statsRes = await axiosSecure.get("/admin-stats");
        setStats(statsRes.data);

        // Fetch product category distribution
        const menuRes = await axiosSecure.get("/menu-stats");
        console.log("Menu Stats from API:", menuRes.data);
        setMenuStats(menuRes.data);
      } catch (error) {
        console.error("Error loading admin data:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Hi, Welcome Back!</h2>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-r from-purple-500 to-pink-300 shadow-md text-white p-6 flex items-center gap-4">
          <FaDollarSign className="text-3xl" />
          <div>
            <p className="text-lg">Revenue</p>
            <h2 className="text-2xl font-bold">
              ${stats.revenue ? stats.revenue.toFixed(2) : 0}
            </h2>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-green-500 to-green-300 shadow-md text-white p-6 flex items-center gap-4">
          <FaUsers className="text-3xl" />
          <div>
            <p className="text-lg">Customers</p>
            <h2 className="text-2xl font-bold">{stats.users || 0}</h2>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-yellow-500 to-orange-300 shadow-md text-white p-6 flex items-center gap-4">
          <FaBoxOpen className="text-3xl" />
          <div>
            <p className="text-lg">Products</p>
            <h2 className="text-2xl font-bold">{stats.products || 0}</h2>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-pink-500 to-red-300 shadow-md text-white p-6 flex items-center gap-4">
          <FaShoppingCart className="text-3xl" />
          <div>
            <p className="text-lg">Orders</p>
            <h2 className="text-2xl font-bold">{stats.orders || 0}</h2>
          </div>
        </div>
      </div>

      {/* Product Category Pie Chart */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Product Categories</h2>
        <div className="card shadow-md p-6">
          {menuStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={menuStats}
                  dataKey="totalProducts"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {menuStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
