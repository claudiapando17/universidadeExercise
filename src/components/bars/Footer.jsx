import { NavLink } from "react-router-dom";
import logouniversity from "/images/logouniversity.png";

function Footer() {

    return (
      <>
      <div className="flex items-center justify-end p-1 bg-gray-200">
        <NavLink to="/" className="flex items-center justify-center space-x-2">
          <img
            src={logouniversity}
            className="h-10 w-auto"
            alt="Logo" />
        </NavLink>
      </div>
      </>
    );
  };
  
  export default Footer;