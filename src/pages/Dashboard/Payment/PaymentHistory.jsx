import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [search, setSearch] = useState("");

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  //  Filter payments by Transaction ID or Status
  const filteredPayments = payments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      payment.status.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading payments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500">Failed to load payments.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
         <SectionTitle title=" ---payment History--"subtitle={user.displayName} ></SectionTitle>
          <div className="w-full sm:max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-xl border border-gray-200">
       
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">💳 Payment History</h2>
        <input
          type="text"
          placeholder="Search by Txn ID or Status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1A054]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Price</th>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors odd:bg-gray-50/40"
                >
                  <td className="p-3 font-medium">{index + 1}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    ${payment.price}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {payment.transactionId}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {payment.date}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === "succeeded"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
   
  );
};

export default PaymentHistory;
