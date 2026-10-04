import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        Portfolio CMS
      </h2>

      <nav className="space-y-3">
        <Link
          to="/dashboard"
          className="block p-3 rounded hover:bg-gray-800"
        >
          Dashboard
        </Link>

        <Link
          to="/about"
          className="block p-3 rounded hover:bg-gray-800"
        >
          About
        </Link>

        <Link
          to="/skills"
          className="block p-3 rounded hover:bg-gray-800"
        >
          Skills
        </Link>

        <Link
          to="/projects"
          className="block p-3 rounded hover:bg-gray-800"
        >
          Projects
        </Link>

        <Link
          to="/blogs"
          className="block p-3 rounded hover:bg-gray-800"
        >
          Blogs
        </Link>

        <Link
          to="/experience"
          className="block p-3 rounded hover:bg-gray-800"
        >
          Experience
        </Link>

        <Link
          to="/testimonials"
          className="block p-3 rounded hover:bg-gray-800"
        >
          Testimonials
        </Link>

        <Link
          to="/services"
          className="block p-3 rounded hover:bg-gray-800"
        >
          Services
        </Link>

        <button
          onClick={logout}
          className="w-full text-left p-3 rounded bg-red-600 hover:bg-red-700 mt-8"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;