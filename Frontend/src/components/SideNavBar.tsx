import { Link } from "react-router-dom";

const SideNavBar = () => {
  return (
    <div className="sidenav">
      <img src="/cplogo.svg" alt="logo" style={{ width: "50%", padding: 15 }} />
      <nav>
        <ul>
          <li>
            <Link to="/">
              <div>
                <img src="/home.png" alt="" />
                <p>Deshboard</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/invoice-quote">
              <div>
                <img src="/file-edit.png" alt="" />
                <p>Invoice / Quote</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/email">
              <div>
                <img src="/clip-mail.png" alt="" />
                <p>Email</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <div>
                <img src="/settings.png" alt="" />
                <p>Settings</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default SideNavBar;
