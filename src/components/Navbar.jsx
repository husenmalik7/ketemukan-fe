import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="flex justify-between items-center px-4 bg-red-100 h-12">
      <div className="flex gap-4">
        <h1>Logo Ketemukan</h1>

        <nav>
          <ul className="flex gap-4">
            <li>lost</li>
            <li>found</li>
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
