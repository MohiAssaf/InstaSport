import { useEffect, useState } from 'react';
import catalogServices from '../services/catalogServices';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

export default function Catalog() {
  const [posts, setPosts] = useState([]);
  const [createFormActive, setCreateFormActive] = useState(false);

  useEffect(() => {
    catalogServices.getAll()
      .then(response => setPosts(Object.values(response)));
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 pt-20">
      <div className="flex justify-start pt-10 m-10">
        <button 
        onClick={() => setCreateFormActive(state => !state)}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Create Post
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {createFormActive && <CreatePost/>}
    </div>
  );
}
