import { useState, useEffect } from 'react';
import axios from 'axios';
import { APP_ROUTES, getHeaders } from '../constant';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        heading: '',
        type: '',
        image: null,
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const headers = getHeaders();
            console.log("headers=>", headers)
            const res = await axios.get(APP_ROUTES.getPost, headers);
            setPosts(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewPost({ ...newPost, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('heading', newPost.heading);
        formData.append('type', newPost.type);
        if (newPost.image) {
            formData.append('image', newPost.image);
        }

        try {
            const headers = { ...getHeaders().headers, 'Content-Type': 'multipart/form-data' };
            await axios.post(APP_ROUTES.addPost, formData, { headers });
            setNewPost({ heading: '', type: '', image: null });
            fetchPosts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center text-red-500 mb-8">Create a Post</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10 border border-red-200">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Heading</label>
                    <input
                        type="text"
                        name="heading"
                        value={newPost.heading}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Type</label>
                    <select
                        name="type"
                        value={newPost.type}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="donor">Donor</option>
                        <option value="receiver">Receiver</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Submit
                </button>
            </form>

            <h2 className="text-2xl font-bold text-red-500 mb-6">Posts</h2>
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white shadow-lg rounded-lg p-6 border border-red-200">
                            <div className='flex flex-col'>
                                <h3 className="text-lg font-semibold text-gray-800">{post.createdBy.fullname}</h3>
                                <h3 className="text-lg font-semibold text-gray-800">{post.createdBy.email}</h3>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{post.heading}</h3>
                            <p className="text-gray-600">
                                <strong>Type:</strong> {post.type}
                            </p>
                            {post.images && post.images.length > 0 && (
                                <img
                                    src={post.images[0]}
                                    alt={post.heading}
                                    className="w-full h-40 object-cover rounded-lg mt-4"
                                />
                            )}
                            <p className="text-gray-500 text-sm mt-2">
                                <strong>Posted On:</strong> {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No posts available at the moment.</p>
            )}
        </div>
    );
}

export default Posts;
