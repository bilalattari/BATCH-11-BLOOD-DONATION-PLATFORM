import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { APP_ROUTES, getHeaders } from '../constant';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { setUser } = useContext(AuthContext);
    const [donors, setDonors] = useState([]);
    const [filters, setFilters] = useState({
        age: 'all',
        bloodGroup: 'all',
        takingAntibiotic: 'all',
    });
    useEffect(() => {
        getBloodDonors();
    }, [filters]);

    const getBloodDonors = async () => {
        try {
            const headers = getHeaders();
            const res = await axios.get(`${APP_ROUTES.getDonors}?age=${filters.age}&bloodGroup=${filters.bloodGroup}&takingAntibiotic=${filters.takingAntibiotic}`, headers);
            console.log("res.data.data=>", res.data.data)
            setDonors(res.data.data)
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
            <h1 className="text-3xl font-bold text-center mb-8">Blood Donors</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <label className="font-medium">Age:</label>
                    <select
                        name="age"
                        value={filters.age}
                        onChange={handleFilterChange}
                        className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Ages</option>
                        <option value="30">Above 30</option>
                        <option value="40">Above 40</option>
                        <option value="50">Above 50</option>
                        <option value="60">Above 50</option>
                        <option value="70">Above 50</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="font-medium">Blood Group:</label>
                    <select
                        name="bloodGroup"
                        value={filters.bloodGroup}
                        onChange={handleFilterChange}
                        className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Groups</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="font-medium">Taking Antibiotics:</label>
                    <select
                        name="takingAntibiotic"
                        value={filters.takingAntibiotic}
                        onChange={handleFilterChange}
                        className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            {donors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donors.map((donor) => (
                        <div
                            key={donor._id.$oid}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {donor.firstName} {donor.lastName}
                            </h2>
                            <p className="text-gray-600">
                                <strong>Blood Group:</strong> {donor.bloodGroup}
                            </p>
                            <p className="text-gray-600">
                                <strong>Age:</strong> {donor.age}
                            </p>
                            <p className="text-gray-600">
                                <strong>Weight:</strong> {donor.weight} kg
                            </p>
                            <p className="text-gray-600">
                                <strong>Diseases:</strong> {donor.diseases.length > 0 ? donor.diseases.join(', ') : 'None'}
                            </p>
                            <p className="text-gray-600">
                                <strong>Last Donated:</strong> {donor.lastDonated ? new Date(donor.lastDonated).toLocaleDateString() : 'Never'}
                            </p>
                            <p className="text-gray-600">
                                <strong>Medicines:</strong> {donor.medicines.length > 0 ? donor.medicines.join(', ') : 'None'}
                            </p>
                            <p className="text-gray-600">
                                <strong>Taking Antibiotics:</strong> {donor.takingAntibiotic ? 'Yes' : 'No'}
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

export default Home;
