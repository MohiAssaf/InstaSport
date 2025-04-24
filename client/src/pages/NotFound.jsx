import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 py-20 px-10 ml-[17%] flex-1">
      <div className="flex flex-col items-center justify-center space-y-6 px-4">
        <h1 className="text-[250px] font-bold text-black">
          404
          <span className="text-4xl font-sans text-gray-800">
            Page not found
          </span>
        </h1>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
