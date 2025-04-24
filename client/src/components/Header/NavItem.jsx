import { Link } from "react-router";

const NavItem = ({ pathTo, pageName }) => {
  return (
    <Link
      key={pageName.toLowerCase()}
      to={pathTo}
      className="text-xl font-semibold text-gray-800 capitalize"
    >
      {pageName}
    </Link>
  );
};

export default NavItem;
