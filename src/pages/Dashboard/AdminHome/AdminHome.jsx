import { FaBox, FaMoneyBillWave, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const AdminHome = () => {
  // Example data
  const revenue = 12000;
  const customers = 350;
  const products = 85;
  const orders = 230;

  const pieData = [
    { name: "Dessert", value: 30 },
    { name: "Pizza", value: 45 },
    { name: "Salad", value: 25 },
  ];

  const COLORS = ["#facc15", "#f87171", "#34d399"]; 

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Hi, Welcome Back!</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat bg-yellow-100 rounded-xl shadow-md">
          <div className="stat-figure text-yellow-600 text-3xl">
            <FaMoneyBillWave />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${revenue}</div>
        </div>

        <div className="stat bg-green-100 rounded-xl shadow-md">
          <div className="stat-figure text-green-600 text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Customers</div>
          <div className="stat-value">{customers}</div>
        </div>

        <div className="stat bg-blue-100 rounded-xl shadow-md">
          <div className="stat-figure text-blue-600 text-3xl">
            <FaBox />
          </div>
          <div className="stat-title">Products</div>
          <div className="stat-value">{products}</div>
        </div>

        <div className="stat bg-pink-100 rounded-xl shadow-md">
          <div className="stat-figure text-pink-600 text-3xl">
            <FaShoppingCart />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{orders}</div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Products Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminHome;
