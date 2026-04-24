import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            {/* 2️⃣ Komponen PageHeader */}
            <PageHeader />

            {/* 3️⃣ Layout Grid Utama */}
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* 4️⃣ Card: Total Orders */}
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="orders-icon" className="bg-green-500 rounded-full p-4">
                        <FaShoppingCart className="text-3xl text-white" />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold">75</span>
                        <span id="orders-text" className="text-gray-400">Total Orders</span>
                    </div>
                </div>

                {/* Card: Total Delivered */}
                <div id="dashboard-delivered" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="delivered-icon" className="bg-blue-500 rounded-full p-4">
                        <FaTruck className="text-3xl text-white" />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold">175</span>
                        <span id="delivered-text" className="text-gray-400">Total Delivered</span>
                    </div>
                </div>

                {/* Card: Total Canceled */}
                <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="canceled-icon" className="bg-red-500 rounded-full p-4">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold">40</span>
                        <span id="canceled-text" className="text-gray-400">Total Canceled</span>
                    </div>
                </div>

                {/* Card: Total Revenue */}
                <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="revenue-icon" className="bg-yellow-500 rounded-full p-4">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400">Total Revenue</span>
                    </div>
                </div>
            </div>
                <div className="grid grid-cols-12 gap-6 mt-6">
                    <div className="col-span-4 bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Top Selling Menu</h2>

                        {/* Burger */}
                        <div className="mb-5">
                            <div className="flex justify-between mb-1">
                            <span className="font-semibold">Burger</span>
                            <span>30 orders</span>
                            </div>
                            <div className="w-full bg-gray-200 h-3 rounded-full">
                            <div className="bg-orange-500 h-3 rounded-full" style={{width:"90%"}}></div>
                            </div>
                        </div>

                        {/* Pizza */}
                        <div className="mb-5">
                            <div className="flex justify-between mb-1">
                            <span className="font-semibold">Pizza</span>
                            <span>24 orders</span>
                            </div>
                            <div className="w-full bg-gray-200 h-3 rounded-full">
                            <div className="bg-red-500 h-3 rounded-full" style={{width:"75%"}}></div>
                            </div>
                        </div>

                        {/* Fried Chicken */}
                        <div className="mb-5">
                            <div className="flex justify-between mb-1">
                            <span className="font-semibold">Fried Chicken</span>
                            <span>13 orders</span>
                            </div>
                            <div className="w-full bg-gray-200 h-3 rounded-full">
                            <div className="bg-yellow-400 h-3 rounded-full" style={{width:"65%"}}></div>
                            </div>
                        </div>

                        {/* Drinks */}
                        <div>
                            <div className="flex justify-between mb-1">
                            <span className="font-semibold">Drinks</span>
                            <span>8 orders</span>
                            </div>
                            <div className="w-full bg-gray-200 h-3 rounded-full">
                            <div className="bg-green-500 h-3 rounded-full" style={{width:"50%"}}></div>
                            </div>
                        </div>
                    </div>
                    {/* 🟦 RECENT ORDERS (KANAN PANJANG) */}
                    <div className="col-span-8 bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

                        <table className="w-full">
                            <thead className="text-gray-400 border-b">
                                <tr className="text-left">
                                <th className="pb-3">Customer</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b">
                                <td className="py-3">Nofita</td>
                                <td className="text-hijau font-semibold">Delivered</td>
                                <td>Rp 120.000</td>
                                <td>20 Apr 2025</td>
                                </tr>

                                <tr className="border-b">
                                <td className="py-3">Budi</td>
                                <td className="text-kuning font-semibold">Pending</td>
                                <td>Rp 80.000</td>
                                <td>19 Apr 2025</td>
                                </tr>

                                <tr className="border-b">
                                <td className="py-3">Sari</td>
                                <td className="text-merah font-semibold">Cancelled</td>
                                <td>Rp 50.000</td>
                                <td>18 Apr 2025</td>
                                </tr>

                                <tr>
                                <td className="py-3">Andi</td>
                                <td className="text-hijau font-semibold">Delivered</td>
                                <td>Rp 210.000</td>
                                <td>17 Apr 2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}