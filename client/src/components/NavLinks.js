import links from "../utils/links";
import { NavLink } from "react-router-dom";
const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map(({ id, text, path, icon }) => (
        <NavLink
          to={path}
          key={id}
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="icon">{icon} </span> {text}{" "}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
