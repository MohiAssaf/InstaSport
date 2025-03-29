import { Link, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuthorization";

export default function Header(){
    const { isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();
    const isLogin = location.pathname === '/login'? 'register': 'login'

    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2 lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <img
                alt="logo-img"
                src="/images/logo-sport.png"
                className="h-15 w-auto"
              />
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">
              Insta 
            <span className="text-xl font-semibold text-blue-400 hover:text-blue-600 transition-colors duration-300">
              Sport
            </span>       
            </h1>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">

            <Link key="home" to="/" className="text-sm/6 font-semibold text-gray-900">Home</Link>
            <Link key="catalog" to="/catalog" className="text-sm/6 font-semibold text-gray-900">Catalog</Link>
            <Link key="contact" to="/contact" className="text-sm/6 font-semibold text-gray-900">Contact</Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">

            {isAuthenticated ?
            <div className="flex items-center space-x-5">
              {location.pathname === '/catalog' && (
                <Link key="catalog-create" to="/catalog/create" className="font-semibold text-white capitalize bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                  Create Post
                </Link>  
              )}
              { isAdmin && (
              <Link to="/inbox" className="p-3 border-4 rounded-full border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out">
                <i className="fa-solid fa-inbox"></i>
              </Link>
              )
              }
              <Link to="/profile" className="p-3 border-4 rounded-full border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out">
                <i className="fa-solid fa-user"></i> 
              </Link>
            </div>
            :
            <Link to={`/${isLogin}`} className="font-semibold text-white capitalize bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
              {isLogin}
            </Link>  
          }
          </div>
        </nav>
      </header>
    )
}