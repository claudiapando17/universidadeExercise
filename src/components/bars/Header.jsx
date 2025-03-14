import {NavLink} from "react-router-dom";

function Header() {

    return (
        <>
      <div className="">
  
  <NavLink to="/">
              <a className="nav-link-custom nav-link py-3">
                <i class="bi bi-house-door"></i>
                Home</a>
            </NavLink>

            <NavLink to="/about-page">
              <a className="nav-link-custom nav-link py-3">
                <i class="bi bi-file-earmark-person"></i>
                About Us</a>
            </NavLink>

            <NavLink to="/skills/add">
              <a className="nav-link-custom nav-link py-3">
                <i class="bi bi-file-earmark-plus"></i>
                Add Skill</a>
            </NavLink>

          </div>
          <div className="sidebar-categories d-flex flex-column">
            <NavLink to="/">
              <a className="nav-link-custom nav-link py-3">
                Categories</a>
            </NavLink>

            <NavLink to="/visual-arts-page">
              <a className="nav-link-custom nav-link py-3">
                <i class="bi bi-brush"></i>
                Visual Arts</a>
            </NavLink>

            <NavLink to="/sports-page">
              <a className="nav-link-custom nav-link py-3">
                <i class="bi bi-bicycle"></i>
                Sports</a>
            </NavLink>

            <NavLink to="/music-page">
              <a className="nav-link-custom nav-link py-3">
                <i class="bi bi-music-note-beamed"></i>
                Music</a>
            </NavLink>
  
      </div>
      </>
    );
  };
  
  export default Header;