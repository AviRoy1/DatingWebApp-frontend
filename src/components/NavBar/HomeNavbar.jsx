import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const HomeNavbar = (props) => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="Navbar-header" style={{ color: props.Textcolor }}>
      <h3>Logo</h3>
      <nav
        ref={navRef}
        className="Navbar-nav"
        style={{ color: props.Navcolor }}
      >
        <a href="/#" style={{ color: props.Textcolor }}>
          Home
        </a>
        <a href="/#" style={{ color: props.Textcolor }}>
          About us
        </a>
        <a href="/#" style={{ color: props.Textcolor }}>
          Pricing
        </a>
        <a href="/#" style={{ color: props.Textcolor }}>
          Contact us
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default HomeNavbar;
