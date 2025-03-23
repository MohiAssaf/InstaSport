import { Link, useNavigate } from "react-router";
import { useLogout } from "../api/authApi";
import { useUser } from "../api/userApi";
import { useMyPosts } from "../api/catalogApi";
import PostCard from "../components/Posts/PostCard/PostCard";

const Profile = () => {
    const {logout} = useLogout();
    const {user} = useUser();
    const {myPosts} = useMyPosts(user._id);
    const navigation = useNavigate();

    const handleLogout = () => {
      logout() 
      navigation("/")
    }

    return (
      <div className="min-h-screen bg-gray-50 p-40">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start space-x-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img               
                    src={user?.profileImg ? user.profileImg: "https://brsc.sa.edu.au/wp-content/uploads/2018/09/placeholder-profile-sq.jpg"} 
                    alt="Profile Picture"  
                    className="w-full h-full object-cover" />
                </div>
    
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
                        <div className="flex space-x-4">
                            <Link 
                            to={`/profile/edit/`}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >Edit
                            </Link>

                            <button 
                              type="submit" 
                              onClick={handleLogout} 
                              className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                              >Delete
                            </button>

                            <button 
                              type="submit" 
                              onClick={handleLogout} 
                              className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                              >Logout
                            </button>
                        </div>
                    </div>
    
                    <div className="flex space-x-6 mt-4">
                        <h2 className="text-gray-700"><span className="font-bold">{myPosts.length}</span> posts</h2>
                        <h2 className="text-gray-700"><span className="font-bold">10</span> comments</h2>
                    </div>
    
                    <div className="mt-4 text-gray-700">
                        <p className="font-semibold">{user.name}</p>
                        <p className="font-semibold">{user.email}</p>
                        <p className="font-semibold">{user.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    
        <div className="mt-12 max-w-5xl mx-auto bg-white p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Posts</h2>
            <div className="grid grid-cols-3 gap-4">
                {myPosts.length > 0 ? (
                  myPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                ): 
                <div className="col-span-3 flex flex-col justify-center items-center space-y-4">
                  <h1 className="text-center text-3xl text-gray-500 ">You don't have any posts &#128533;</h1>
                  <Link 
                  to='/catalog/create'
                  className="bg-blue-500 text-white text-x px-5 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300"
                  > Create one?
                  </Link>
                </div>
                
                }
            </div>
        </div>
  </div>
    );
};

export default Profile;
