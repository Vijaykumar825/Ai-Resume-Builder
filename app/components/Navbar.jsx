import { useNavigate, Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
        {auth.isAuthenticated && (
          <button onClick={handleLogout} className="text-red-500 font-semibold hover:text-red-600 transition-colors cursor-pointer">
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
