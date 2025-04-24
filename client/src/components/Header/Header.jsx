import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuthorization";
import NavItem from "./NavItem";

export default function Header() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="fixed top-0 left-0 z-50 w-2/12 h-screen bg-white shadow-md">
      <nav
        aria-label="Global"
        className="flex flex-col  justify-between p-6 lg:px-8"
      >
        <div className="flex items-center gap-2 lg:flex-1 pb-10">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              alt="logo-img"
              src="/images/logo-sport.png"
              className="h-15 w-auto"
            />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">
            Insta
            <span className="text-xl font-semibold text-blue-400  transition-colors duration-300">
              Sport
            </span>
          </h1>
        </div>

        <div className="hidden lg:flex lg:gap-x-12 flex-col justify-between items-center">
          <div className="w-full flex items-center space-x-2 h-10 text-xl cursor-pointer hover:opacity-80">
            <i className="text-blue-400  fa-solid fa-house"></i>
            <NavItem pathTo="/" pageName="Home" />
          </div>
          <div className="w-full flex items-center space-x-2 h-10 text-xl  cursor-pointer hover:opacity-80">
            <i className="text-blue-400  fa-regular fa-image"></i>
            <NavItem pathTo="/posts" pageName="Posts" />
          </div>

          {isAuthenticated ? (
            <>
              <div className="w-full flex items-center space-x-2 h-10 text-xl  cursor-pointer hover:opacity-80">
                <i className="text-blue-400  fa-solid fa-plus"></i>
                <NavItem pathTo="/posts/create" pageName="Create" />
              </div>
              <div className="w-full flex items-center space-x-2 h-10 text-xl  cursor-pointer hover:opacity-80">
                <i className=" text-blue-400  fa-solid fa-user"></i>
                <NavItem pathTo="/profile" pageName="Profile" />
              </div>

              {isAdmin && (
                <div className="w-full flex items-center space-x-2 h-10 text-xl  cursor-pointer hover:opacity-80">
                  <i className=" text-blue-400  fa-solid fa-inbox"></i>
                  <NavItem pathTo="/inbox" pageName="Inbox" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full flex items-center space-x-2 h-10 text-xl  cursor-pointer hover:opacity-80 ">
              <i className="text-blue-400 fa-solid fa-right-to-bracket"></i>
              <NavItem pathTo="/login" pageName="Login" />
            </div>
          )}
          <div className="w-full flex items-center space-x-2 h-10 text-xl  cursor-pointer hover:opacity-80">
            <i className="text-blue-400  fa-solid fa-address-book"></i>
            <NavItem pathTo="contact" pageName="Contact" />
          </div>
        </div>
      </nav>
    </header>
  );
}
