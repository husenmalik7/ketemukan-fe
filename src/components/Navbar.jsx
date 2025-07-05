import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="flex justify-between items-center px-4 bg-red-100 h-12">
      <div className="flex gap-4">
        <h1>
          <Link to="/">Logo Ketemukan</Link>
        </h1>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/lost">Lost</Link>
            </li>
            <li>
              <Link to="/found">found</Link>
            </li>
          </ul>
        </nav>
      </div>

      <nav>
        <ul>
          <li>profile</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
