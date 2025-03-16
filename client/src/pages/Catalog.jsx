import { useEffect, useState } from 'react';
import catalogServices from '../services/catalogServices';
import PostCard from '../components/PostCard/PostCard';

export default function Catalog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    catalogServices.getAll()
      .then(response => setPosts(Object.values(response)));
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 py-50">

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
}
