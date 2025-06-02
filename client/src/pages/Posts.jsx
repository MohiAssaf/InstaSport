import { usePosts } from "../api/postsApi";
import PostCard from "../components/Posts/PostCard";

export default function Posts() {
  const { posts } = usePosts();

  return (
    <div className="relative min-h-screen bg-gray-100 py-20 px-10 ml-[17%]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
