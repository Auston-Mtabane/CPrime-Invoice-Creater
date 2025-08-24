import { Link } from "react-router-dom";

const SideNavBar =() =>{
  return (
    <div className="sidenav">
      <img src="../public/cplogo.svg" alt="logo" />
      <nav>
        <ul>
          <li><Link to="/">D</Link></li>
          <li><Link to="/invoice-quote">I/Q</Link></li>
          <li><Link to="/email">E</Link></li>
          <li><Link to="/settings">S</Link></li>
        </ul>
      </nav>
    </div>
  );
}   
export default SideNavBar;