import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import { FiFileText, FiUsers } from "react-icons/fi";
import { Toaster } from "react-hot-toast";

function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClasses = (path: string, baseColor: string = "blue") => {
    const base = "flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200";
    if (isActive(path)) {
      return `${base} bg-${baseColor}-600 text-white shadow-md`;
    }
    return `${base} text-gray-700 hover:text-${baseColor}-600 hover:bg-${baseColor}-50`;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg">
              K&P
            </div>
            <span className="text-xl font-bold text-gray-900 hidden md:block">Kullanıcı & Post yönetim sistemi</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={getLinkClasses("/", "blue")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Ana Sayfa</span>
            </Link>
            
            <Link to="/users" className={getLinkClasses("/users", "blue")}>
<FiUsers className="w-6 h-6 text-blue-600" />
              <span>Kullanıcılar</span>
            </Link>
            
            <Link to="/posts" className={getLinkClasses("/posts", "green")}>
             <FiFileText className="w-6 h-6 text-green-600" />
              <span>Postlar</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none p-2"
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="md:hidden hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className={`${getLinkClasses("/", "indigo")} justify-start`}
              onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Ana Sayfa</span>
            </Link>
            
            <Link 
              to="/users" 
              className={`${getLinkClasses("/users", "blue")} justify-start`}
              onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>Kullanıcılar</span>
            </Link>
            
            <Link 
              to="/posts" 
              className={`${getLinkClasses("/posts", "green")} justify-start`}
              onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>Postlar</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
              K&P
            </div>
            <span className="text-lg font-semibold">Kullanıcı & Post yönetim sistemi</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/" className="hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Ana Sayfa</span>
            </Link>
            <Link to="/users" className="hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>Kullanıcılar</span>
            </Link>
            <Link to="/posts" className="hover:text-green-400 transition-colors duration-200 flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>Postlar</span>
            </Link>
          </div>
        </div>
        <Toaster position="top-right" />

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Kullanıcı & Post Yönetim Sistemi</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;