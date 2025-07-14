import { Link } from 'react-router-dom';

function Navbar({ username, logout }) {
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
              <Link to="/found">Found</Link>
            </li>
          </ul>
        </nav>
      </div>

      <nav>
        <ul className="flex gap-2">
          {username ? (
            <>
              <li>{username}</li>
              <li onClick={logout} className="cursor-pointer">
                logout
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
