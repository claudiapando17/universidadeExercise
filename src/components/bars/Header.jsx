import { NavLink } from "react-router-dom";
import logouniversity from "/images/logouniversity.png";

function Header() {

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-gray-200">
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            src={logouniversity}
            className="h-10 w-auto"
            alt="Logo" />
        </NavLink>
      </div>

    </>
  );
};

export default Header;