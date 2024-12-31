import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { APP_ROUTES, getHeaders } from '../constant';
import { AuthContext } from '../context/AuthContext';

function Orders() {
    const { setUser } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({});
    const [filters, setFilters] = useState({
        age: 'all',
        bloodGroup: 'all',
        takingAntibiotic: 'all',
        year: 'all',
        search: "",
        type: 'all'
    });
    useEffect(() => {
        getOrders();
    }, [filters]);

    const getOrders = async () => {
        try {
            const headers = getHeaders();
            const res = await axios.get(`${APP_ROUTES.getOrders}?type=${filters.type}&year=${filters.year}&search=${filters.search}`, headers);
            console.log(res.data)
            setOrders(res.data.data?.orders)
            setStats(res.data.data?.stats)
        } catch (err) {
            console.error(err);
        }
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-8">Orders</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <input className='border p-2 rounded' placeholder='Search'
                        name="search" onChange={handleFilterChange}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-medium">Age:</label>
                    <select
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Year</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="font-medium">Pizza Types:</label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Type</option>
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                    </select>
                </div>
            </div>
            <div className='flex my-4 w-full gap-5'>
                <div
                    className="bg-white flex-grow shadow-lg rounded-lg p-6 border border-gray-200"
                >
                    <div className="text-xl font-semibold text-gray-800">
                        <h2>Price : </h2>
                        <h2>$ {stats?.totalPrice}</h2>
                    </div>
                </div>
                <div
                    className="bg-white flex-grow shadow-lg rounded-lg p-6 border border-gray-200"
                >
                    <div className="text-xl font-semibold text-gray-800">
                        <h2>Quantity : </h2>
                        <h2>{stats?.totalQuantity}</h2>
                    </div>
                </div>
                <div
                    className="bg-white flex-grow shadow-lg rounded-lg p-6 border border-gray-200"
                >
                    <div className="text-xl font-semibold text-gray-800">
                        <h2>Total Order Value : </h2>
                        <h2>$ {stats?.totalOrderValue}</h2>
                    </div>
                </div>
            </div>

            {orders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {order.name}
                            </h2>
                            <p className="text-gray-600">
                                <strong>Date:</strong> {order.date}
                            </p>
                            <p className="text-gray-600">
                                <strong>Quantity:</strong> {order.quantity}
                            </p>
                            <p className="text-gray-600">
                                <strong>Size:</strong> {order.size}
                            </p>
                            <p className="text-gray-600">
                                <strong>Price:</strong> ${order.price}
                            </p>
                            <p className="text-gray-600">
                                <strong>totalOrderValua:</strong> ${order.totalOrderValua}
                            </p>

                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No donors available at the moment.</p>
            )}
        </div>
    );
}

export default Orders;
