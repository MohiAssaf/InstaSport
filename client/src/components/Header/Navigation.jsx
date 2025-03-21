import { Link } from 'react-router';
import { useAuth } from '../../hooks/useAuthorization';


export default function Navigation(){
    const { isAuthenticated } = useAuth()
    
    return(
        <>
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
          {isAuthenticated &&
          <Link key="catalog-create" to="/catalog/create" className="text-sm/6 font-semibold text-gray-900">Create Post</Link>
          }
          <Link key="about" to="/about" className="text-sm/6 font-semibold text-gray-900">About</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">

          {isAuthenticated ?
          <Link to="/profile" className="p-3 border-4 rounded-full border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out">
            <i className="fa-solid fa-user"></i> 
          </Link>
          :
          <Link to="/login" className="text-sm/6 font-semibold text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
          </Link>  
        }
        </div>
      </nav>

        </>
    )
}